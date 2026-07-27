#!/usr/bin/env node
/**
 * Fakturagenerator.
 *
 * Syftet är att en försäljning ska kosta så få minuter som möjligt: ett kommando
 * in, en färdig faktura ut som skrivs ut till PDF och mejlas.
 *
 * Säljaruppgifterna läses från saljare.json, som medvetet är gitignorerad —
 * organisationsnummer, momsregistreringsnummer, adress och bankgiro ska aldrig
 * hamna i det här repot.
 *
 * Kom igång:
 *   cp saljare.exempel.json saljare.json     och fyll i era uppgifter
 *
 * Exempel:
 *   node skapa-faktura.mjs \
 *     --kund "Webbyrån AB" --orgnr "556123-4567" \
 *     --adress "Storgatan 1, 111 22 Stockholm" \
 *     --epost "ekonomi@webbyran.se" \
 *     --artikel byralicens
 *
 * Flaggor:
 *   --artikel   paket | byralicens | uppstart   (kan upprepas)
 *   --nummer    fakturanummer (annars nästa lediga enligt raknare.json)
 *   --dagar     betalningsvillkor i dagar (standard 10)
 *   --forskott  märk fakturan som förskottsbetalning; leverans sker efter betalning
 *   --eu        omvänd betalningsskyldighet för momsregistrerad köpare i annat EU-land
 *   --ut        filnamn (standard faktura-<nummer>.html)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HAR = path.dirname(fileURLToPath(import.meta.url));

const ARTIKLAR = {
  paket: {
    benamning: 'Tillgänglighetspaketet – licens för ett företag',
    beskrivning: 'Granskningsverktyg för WCAG 2.1 AA, juridisk översikt, manuell checklista, mall för tillgänglighetsredogörelse, utvecklarguide och efterlevnadsplan.',
    pris: 1495,
  },
  byralicens: {
    benamning: 'Tillgänglighetspaketet – byrålicens',
    beskrivning: 'Som ovan, med rätt att använda materialet i obegränsat antal kunduppdrag och att leverera genererade rapporter vidare till kund.',
    pris: 4950,
  },
  uppstart: {
    benamning: 'Uppstartshjälp',
    beskrivning: 'Genomgång av kundens egen mätning, prioriterad åtgärdsplan anpassad till teknikstacken, utkast till tillgänglighetsredogörelse samt ifylld efterlevnadsplan. Leverans inom tre arbetsdagar.',
    pris: 2900,
  },
};

const MOMSSATS = 0.25;

// ------------------------------------------------------------------ argument

function tolka(argv) {
  const o = { artiklar: [], dagar: 10, forskott: false, eu: false };
  for (let i = 2; i < argv.length; i++) {
    const n = () => argv[++i];
    switch (argv[i]) {
      case '--kund': o.kund = n(); break;
      case '--orgnr': o.orgnr = n(); break;
      case '--adress': o.adress = n(); break;
      case '--epost': o.epost = n(); break;
      case '--referens': o.referens = n(); break;
      case '--artikel': o.artiklar.push(n()); break;
      case '--nummer': o.nummer = n(); break;
      case '--dagar': o.dagar = parseInt(n(), 10) || 10; break;
      case '--forskott': o.forskott = true; break;
      case '--eu': o.eu = true; break;
      case '--ut': o.ut = n(); break;
      case '-h': case '--hjalp': o.hjalp = true; break;
    }
  }
  return o;
}

// ------------------------------------------------------------------ hjälpare

const kr = (n) =>
  n.toLocaleString('sv-SE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' kr';

const datum = (d) => d.toISOString().slice(0, 10);

function nastaNummer() {
  const fil = path.join(HAR, 'raknare.json');
  let n = 1001;
  if (fs.existsSync(fil)) {
    try { n = (JSON.parse(fs.readFileSync(fil, 'utf8')).senaste ?? 1000) + 1; } catch { /* börja om */ }
  }
  fs.writeFileSync(fil, JSON.stringify({ senaste: n }, null, 2));
  return String(n);
}

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ------------------------------------------------------------------ huvudflöde

const o = tolka(process.argv);

if (o.hjalp) {
  console.log(fs.readFileSync(new URL(import.meta.url), 'utf8').split('*/')[0].replace('#!/usr/bin/env node', ''));
  process.exit(0);
}

const saljarfil = path.join(HAR, 'saljare.json');
if (!fs.existsSync(saljarfil)) {
  console.error(`
Hittar inte saljare.json.

Kör först:
  cp ${path.join(HAR, 'saljare.exempel.json')} ${saljarfil}

och fyll i företagsuppgifterna. Filen är gitignorerad och hamnar aldrig i repot.
`);
  process.exit(1);
}

const saljare = JSON.parse(fs.readFileSync(saljarfil, 'utf8'));

if (!o.kund) { console.error('Ange minst --kund "Kundens företagsnamn".'); process.exit(1); }
if (o.artiklar.length === 0) o.artiklar = ['paket'];

const rader = o.artiklar.map((nyckel) => {
  const a = ARTIKLAR[nyckel];
  if (!a) {
    console.error(`Okänd artikel "${nyckel}". Välj bland: ${Object.keys(ARTIKLAR).join(', ')}`);
    process.exit(1);
  }
  return a;
});

const netto = rader.reduce((s, r) => s + r.pris, 0);
const moms = o.eu ? 0 : netto * MOMSSATS;
const totalt = netto + moms;

const nummer = o.nummer || nastaNummer();
const idag = new Date();
const forfallo = new Date(idag.getTime() + o.dagar * 86400000);
const utfil = o.ut || path.join(HAR, `faktura-${nummer}.html`);

const momsrad = o.eu
  ? `<tr><td>Moms</td><td class="h">0,00 kr</td></tr>
     <tr><td colspan="2" class="notis">Omvänd betalningsskyldighet. Köparen redovisar moms i sitt hemland enligt artikel 196 i mervärdesskattedirektivet.</td></tr>`
  : `<tr><td>Moms 25 %</td><td class="h">${kr(moms)}</td></tr>`;

const html = `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<title>Faktura ${esc(nummer)} – ${esc(saljare.foretag)}</title>
<style>
  @page { size: A4; margin: 18mm; }
  body { font: 14px/1.55 -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
         color: #16191d; margin: 0; padding: 34px; max-width: 800px; }
  .topp { display: flex; justify-content: space-between; align-items: flex-start;
          border-bottom: 3px solid #12457a; padding-bottom: 18px; margin-bottom: 28px; }
  .topp h1 { margin: 0; font-size: 30px; letter-spacing: -.5px; }
  .topp .nr { color: #5b6470; font-size: 14px; margin-top: 4px; }
  .saljare { text-align: right; font-size: 13px; line-height: 1.5; }
  .saljare strong { font-size: 15px; }
  .parter { display: flex; gap: 44px; margin-bottom: 26px; }
  .parter h2 { font-size: 11px; text-transform: uppercase; letter-spacing: .8px;
               color: #5b6470; margin: 0 0 6px; }
  table { width: 100%; border-collapse: collapse; margin: 18px 0; }
  th, td { text-align: left; padding: 10px 8px; border-bottom: 1px solid #dfe3e8; vertical-align: top; }
  th { font-size: 11px; text-transform: uppercase; letter-spacing: .6px; color: #5b6470; }
  td.h, th.h { text-align: right; white-space: nowrap; }
  .rad-beskrivning { color: #5b6470; font-size: 12.5px; margin-top: 3px; }
  .summa { margin-left: auto; width: 320px; }
  .summa td { border: 0; padding: 5px 8px; }
  .summa tr.total td { border-top: 2px solid #16191d; font-weight: 700; font-size: 17px; padding-top: 10px; }
  .notis { font-size: 12px; color: #5b6470; }
  .betalning { background: #f6f7f9; border: 1px solid #dfe3e8; border-radius: 8px;
               padding: 16px 18px; margin: 26px 0; }
  .betalning h2 { font-size: 12px; text-transform: uppercase; letter-spacing: .8px;
                  color: #5b6470; margin: 0 0 8px; }
  .betalning dl { display: grid; grid-template-columns: 150px 1fr; gap: 4px 12px; margin: 0; font-size: 13.5px; }
  .betalning dt { color: #5b6470; }
  .betalning dd { margin: 0; font-weight: 600; }
  footer { margin-top: 34px; padding-top: 14px; border-top: 1px solid #dfe3e8;
           font-size: 11.5px; color: #5b6470; }
  .forskott { background: #fff8e6; border-left: 3px solid #b8860b; padding: 11px 14px;
              border-radius: 0 6px 6px 0; margin: 18px 0; font-size: 13.5px; }
</style>
</head>
<body>

<div class="topp">
  <div>
    <h1>Faktura</h1>
    <div class="nr">Nr ${esc(nummer)}</div>
  </div>
  <div class="saljare">
    <strong>${esc(saljare.foretag)}</strong><br>
    ${esc(saljare.adress)}<br>
    ${esc(saljare.postort)}<br>
    ${esc(saljare.epost)}${saljare.telefon ? ' · ' + esc(saljare.telefon) : ''}<br>
    Org.nr ${esc(saljare.orgnr)}<br>
    Momsreg.nr ${esc(saljare.momsnr)}
  </div>
</div>

<div class="parter">
  <div style="flex:1">
    <h2>Faktureras till</h2>
    <strong>${esc(o.kund)}</strong><br>
    ${o.orgnr ? 'Org.nr ' + esc(o.orgnr) + '<br>' : ''}
    ${o.adress ? esc(o.adress) + '<br>' : ''}
    ${o.epost ? esc(o.epost) : ''}
    ${o.referens ? '<br>Er referens: ' + esc(o.referens) : ''}
  </div>
  <div style="flex:1">
    <h2>Uppgifter</h2>
    Fakturadatum: ${datum(idag)}<br>
    Förfallodatum: ${datum(forfallo)}<br>
    Betalningsvillkor: ${o.dagar} dagar<br>
    Dröjsmålsränta: enligt räntelagen
  </div>
</div>

${o.forskott ? '<div class="forskott"><strong>Förskottsbetalning.</strong> Leverans sker så snart betalningen är registrerad.</div>' : ''}

<table>
  <thead>
    <tr><th>Beskrivning</th><th class="h">Belopp</th></tr>
  </thead>
  <tbody>
    ${rader.map((r) => `<tr>
      <td><strong>${esc(r.benamning)}</strong><div class="rad-beskrivning">${esc(r.beskrivning)}</div></td>
      <td class="h">${kr(r.pris)}</td>
    </tr>`).join('')}
  </tbody>
</table>

<table class="summa">
  <tr><td>Netto</td><td class="h">${kr(netto)}</td></tr>
  ${momsrad}
  <tr class="total"><td>Att betala</td><td class="h">${kr(totalt)}</td></tr>
</table>

<div class="betalning">
  <h2>Betalning</h2>
  <dl>
    ${saljare.bankgiro ? `<dt>Bankgiro</dt><dd>${esc(saljare.bankgiro)}</dd>` : ''}
    ${saljare.iban ? `<dt>IBAN</dt><dd>${esc(saljare.iban)}</dd>` : ''}
    ${saljare.bic ? `<dt>BIC</dt><dd>${esc(saljare.bic)}</dd>` : ''}
    <dt>Ange referens</dt><dd>Fakturanummer ${esc(nummer)}</dd>
  </dl>
</div>

<footer>
  ${saljare.fskatt !== false ? 'Godkänd för F-skatt.' : ''}
  Leverans sker digitalt. Eftersom det är en digital produkt som levereras omedelbart gäller ingen
  ångerrätt efter nedladdning vid försäljning till näringsidkare.
  Licensen är knuten till köparen och får inte vidaresäljas.
</footer>

</body>
</html>`;

fs.writeFileSync(utfil, html, 'utf8');

console.log(`
Faktura ${nummer} skapad: ${utfil}

  ${rader.map((r) => `${r.benamning} — ${kr(r.pris)}`).join('\n  ')}

  Netto      ${kr(netto)}
  Moms       ${kr(moms)}${o.eu ? '  (omvänd betalningsskyldighet)' : ''}
  Att betala ${kr(totalt)}

  Förfaller  ${datum(forfallo)}

Öppna filen i webbläsaren och skriv ut till PDF, bifoga sedan i mejlet.
`);
