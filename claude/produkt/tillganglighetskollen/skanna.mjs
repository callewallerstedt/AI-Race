#!/usr/bin/env node
/**
 * Tillgänglighetskollen – automatiserad WCAG 2.1 AA-granskning på svenska.
 *
 * Kör:  node skanna.mjs --organisation "Företaget AB" https://exempel.se
 *
 * Se LASMIG.md för fullständig dokumentation.
 */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sammanstall, byggRapport } from './src/rapport.js';
import { ALLVAR, slaUppRegel } from './src/regler-sv.js';

const HAR = path.dirname(fileURLToPath(import.meta.url));
const VERSION = '1.0.0';

// ---------------------------------------------------------------- argument

function tolkaArgument(argv) {
  const o = {
    urler: [],
    organisation: '',
    ut: 'rapport',
    krypa: 0,
    bredd: 1280,
    hojd: 900,
    klick: [],
    vanta: 1500,
    timeout: 45000,
    jamfor: null,
    fran: null,
    hjalp: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const n = () => argv[++i];
    switch (a) {
      case '--organisation': case '-o': o.organisation = n(); break;
      case '--ut': o.ut = n(); break;
      case '--krypa': o.krypa = parseInt(n(), 10) || 0; break;
      case '--bredd': o.bredd = parseInt(n(), 10) || 1280; break;
      case '--hojd': o.hojd = parseInt(n(), 10) || 900; break;
      case '--klick': o.klick.push(n()); break;
      case '--vanta': o.vanta = parseInt(n(), 10) || 0; break;
      case '--timeout': o.timeout = parseInt(n(), 10) || 45000; break;
      case '--jamfor': o.jamfor = n(); break;
      case '--fran': o.fran = n(); break;
      case '--hjalp': case '-h': case '--help': o.hjalp = true; break;
      default:
        if (a.startsWith('-')) {
          console.error(`Okänd flagga: ${a}. Kör med --hjalp för hjälp.`);
          process.exit(2);
        }
        o.urler.push(a);
    }
  }
  return o;
}

const HJALP = `
Tillgänglighetskollen ${VERSION} – automatiserad WCAG 2.1 AA-granskning

ANVÄNDNING
  node skanna.mjs [flaggor] <url> [url ...]

FLAGGOR
  -o, --organisation <namn>  Namn som visas i rapporten
      --fran <fil>           Läs adresser från textfil, en per rad (# = kommentar)
      --krypa <antal>        Följ interna länkar och granska upp till <antal> sidor totalt
      --ut <prefix>          Filnamnsprefix för utdata (standard: rapport)
      --klick <selektor>     Klicka bort t.ex. en cookiebanner före granskning (kan upprepas)
      --vanta <ms>           Extra väntetid efter sidladdning (standard 1500)
      --bredd / --hojd <px>  Fönsterstorlek (standard 1280x900)
      --timeout <ms>         Max laddningstid per sida (standard 45000)
      --jamfor <fil.json>    Jämför med en tidigare mätning och visa förändringen
  -h, --hjalp                Visa den här hjälpen

EXEMPEL
  node skanna.mjs -o "Butiken AB" https://butiken.se
  node skanna.mjs -o "Butiken AB" --krypa 15 --klick "#godkann-cookies" https://butiken.se
  node skanna.mjs -o "Butiken AB" --fran sidor.txt --jamfor rapport-2026-07-01.json

UTDATA
  <prefix>.html   Rapport att läsa, mejla eller skriva ut till PDF
  <prefix>.json   Rådata för jämförelse över tid
  <prefix>.csv    Åtgärdslista att importera i Jira, Trello eller Excel
`;

// ---------------------------------------------------------------- hjalpare

function laddaAxe() {
  const kandidater = [
    path.join(HAR, 'node_modules', 'axe-core', 'axe.min.js'),
    path.join(HAR, '..', 'node_modules', 'axe-core', 'axe.min.js'),
  ];
  for (const k of kandidater) if (fs.existsSync(k)) return { kalla: fs.readFileSync(k, 'utf8'), sokvag: k };
  console.error('Hittar inte axe-core. Kör "npm install" i verktygsmappen först.');
  process.exit(1);
}

function axeVersion(sokvag) {
  try {
    const pkg = path.join(path.dirname(sokvag), 'package.json');
    return JSON.parse(fs.readFileSync(pkg, 'utf8')).version;
  } catch { return 'okänd'; }
}

function normalisera(u) {
  try {
    const url = new URL(u);
    url.hash = '';
    return url.toString();
  } catch {
    // Tillåter även lokala filer, så att ett bygge kan granskas innan publicering.
    const abs = path.resolve(u);
    if (fs.existsSync(abs)) return 'file://' + abs;
    return null;
  }
}

const SVENSKT_DATUM = () =>
  new Date().toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });

// ---------------------------------------------------------------- granskning

async function granskaSida(page, url, opt) {
  await page.goto(url, { waitUntil: 'load', timeout: opt.timeout });

  for (const sel of opt.klick) {
    try {
      const el = await page.waitForSelector(sel, { timeout: 4000, state: 'visible' });
      if (el) { await el.click(); await page.waitForTimeout(500); }
    } catch { /* bannern fanns inte på denna sida – helt normalt */ }
  }

  if (opt.vanta) await page.waitForTimeout(opt.vanta);
  await page.addScriptTag({ content: opt.axeKalla });

  const resultat = await page.evaluate(async () =>
    await window.axe.run(document, {
      resultTypes: ['violations'],
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    })
  );

  return (resultat.violations || []).map((v) => ({
    id: v.id,
    impact: v.impact || 'minor',
    help: v.help,
    description: v.description,
    helpUrl: v.helpUrl,
    tags: v.tags,
    nodes: v.nodes.map((n) => ({ target: n.target, html: n.html })),
  }));
}

async function hamtaInternaLankar(page, ursprung) {
  try {
    return await page.evaluate((o) =>
      [...document.querySelectorAll('a[href]')]
        .map((a) => a.href)
        .filter((h) => { try { return new URL(h).origin === o; } catch { return false; } }),
      ursprung
    );
  } catch { return []; }
}

// ---------------------------------------------------------------- jamforelse

function byggJamforelse(tidigareFil, nyaRegler, nyttTotal) {
  if (!tidigareFil) return null;
  if (!fs.existsSync(tidigareFil)) {
    console.warn(`Varning: jämförelsefilen ${tidigareFil} finns inte. Hoppar över jämförelsen.`);
    return null;
  }
  try {
    const gammal = JSON.parse(fs.readFileSync(tidigareFil, 'utf8'));
    const gamlaIder = new Set((gammal.regler || []).map((r) => r.id));
    const nyaIder = new Set(nyaRegler.map((r) => r.id));
    return {
      tidigareDatum: gammal.datum || 'okänt datum',
      tidigare: gammal.totaltAntalFel ?? 0,
      forandring: nyttTotal - (gammal.totaltAntalFel ?? 0),
      losta: [...gamlaIder].filter((id) => !nyaIder.has(id)),
      nya: [...nyaIder].filter((id) => !gamlaIder.has(id)),
    };
  } catch (e) {
    console.warn(`Varning: kunde inte läsa ${tidigareFil} (${e.message}). Hoppar över jämförelsen.`);
    return null;
  }
}

// ---------------------------------------------------------------- csv

function byggCsv(regler) {
  const rader = [['prioritet', 'regel_id', 'problem', 'allvarlighet', 'antal_element', 'antal_sidor', 'wcag', 'atgard']];
  regler.forEach((r, i) => {
    const sv = slaUppRegel({ id: r.id, helpUrl: r.helpUrl, tags: r.tags });
    rader.push([
      i + 1, r.id, sv.namn, ALLVAR[r.impact]?.etikett ?? r.impact,
      r.antalElement, r.sidor.size, (sv.wcag || []).join('; '), sv.atgard,
    ]);
  });
  return '﻿' + rader
    .map((rad) => rad.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(';'))
    .join('\r\n');
}

// ---------------------------------------------------------------- huvudflode

async function main() {
  const opt = tolkaArgument(process.argv);
  if (opt.hjalp) { console.log(HJALP); return; }

  if (opt.fran) {
    if (!fs.existsSync(opt.fran)) { console.error(`Filen ${opt.fran} finns inte.`); process.exit(1); }
    const rader = fs.readFileSync(opt.fran, 'utf8').split(/\r?\n/)
      .map((r) => r.trim()).filter((r) => r && !r.startsWith('#'));
    opt.urler.push(...rader);
  }

  opt.urler = [...new Set(opt.urler.map(normalisera).filter(Boolean))];
  if (opt.urler.length === 0) { console.log(HJALP); process.exit(1); }
  if (!opt.organisation) opt.organisation = new URL(opt.urler[0]).hostname || 'Granskad webbplats';

  const axe = laddaAxe();
  opt.axeKalla = axe.kalla;
  const verktygsversion = `${VERSION} (axe-core ${axeVersion(axe.sokvag)})`;

  const startArg = { headless: true };
  if (process.env.PLAYWRIGHT_CHROMIUM_PATH) startArg.executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH;

  let browser;
  try {
    browser = await chromium.launch(startArg);
  } catch (e) {
    console.error('Kunde inte starta webbläsaren. Kör "npx playwright install chromium" och försök igen.');
    console.error(e.message);
    process.exit(1);
  }

  const context = await browser.newContext({
    viewport: { width: opt.bredd, height: opt.hojd },
    locale: 'sv-SE',
  });
  const page = await context.newPage();

  const ko = [...opt.urler];
  const besokta = new Set();
  const sidor = [];
  const maxSidor = opt.krypa > 0 ? Math.max(opt.krypa, opt.urler.length) : opt.urler.length;
  const ursprung = new URL(opt.urler[0]).origin; // "null" för file:// – krypning stängs då av nedan
  const kanKrypa = opt.krypa > 0 && ursprung !== 'null';

  while (ko.length > 0 && sidor.length < maxSidor) {
    const url = ko.shift();
    if (besokta.has(url)) continue;
    besokta.add(url);

    process.stdout.write(`[${sidor.length + 1}/${maxSidor}] ${url} … `);
    try {
      const violations = await granskaSida(page, url, opt);
      const antal = violations.reduce((n, v) => n + v.nodes.length, 0);
      sidor.push({ url, violations });
      console.log(`${antal} fel`);

      if (kanKrypa && sidor.length < maxSidor) {
        for (const l of await hamtaInternaLankar(page, ursprung)) {
          const nl = normalisera(l);
          if (nl && !besokta.has(nl) && !ko.includes(nl)) ko.push(nl);
        }
      }
    } catch (e) {
      sidor.push({ url, violations: [], fel: e.message.split('\n')[0] });
      console.log(`MISSLYCKADES (${e.message.split('\n')[0]})`);
    }
  }

  await browser.close();

  const s = sammanstall(sidor);
  const jamforelse = byggJamforelse(opt.jamfor, s.regler, s.totaltElement);
  const datum = SVENSKT_DATUM();

  const html = byggRapport({
    sidor, sammanfattning: s, organisation: opt.organisation, datum, verktygsversion, jamforelse,
  });

  const json = {
    verktyg: 'Tillganglighetskollen', version: VERSION, datum,
    organisation: opt.organisation,
    antalSidor: s.antalSidor,
    totaltAntalFel: s.totaltElement,
    fordelning: s.summering,
    regler: s.regler.map((r) => ({
      id: r.id, allvarlighet: r.impact, antalElement: r.antalElement, sidor: [...r.sidor.keys()],
    })),
    sidor: sidor.map((p) => ({
      url: p.url,
      fel: p.fel || null,
      antalFel: p.violations.reduce((n, v) => n + v.nodes.length, 0),
    })),
  };

  fs.writeFileSync(`${opt.ut}.html`, html, 'utf8');
  fs.writeFileSync(`${opt.ut}.json`, JSON.stringify(json, null, 2), 'utf8');
  fs.writeFileSync(`${opt.ut}.csv`, byggCsv(s.regler), 'utf8');

  console.log(`
──────────────────────────────────────────────
  ${s.totaltElement} fel fördelat på ${s.antalRegler} regler, ${s.antalSidor} ${s.antalSidor === 1 ? 'sida granskad' : 'sidor granskade'}
  Kritiska ${s.summering.critical} · Allvarliga ${s.summering.serious} · Måttliga ${s.summering.moderate} · Mindre ${s.summering.minor}
──────────────────────────────────────────────
  ${opt.ut}.html   rapport (öppna i webbläsare, skriv ut till PDF)
  ${opt.ut}.json   rådata för jämförelse
  ${opt.ut}.csv    åtgärdslista
`);

  // Avslutskod 1 om kritiska eller allvarliga fel finns, så att verktyget
  // kan användas som grind i CI.
  process.exitCode = (s.summering.critical + s.summering.serious) > 0 ? 1 : 0;
}

main().catch((e) => { console.error(e); process.exit(1); });
