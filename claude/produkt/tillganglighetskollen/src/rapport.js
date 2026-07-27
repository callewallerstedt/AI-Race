/**
 * Genererar en fristående HTML-rapport på svenska.
 * Ingen extern CSS, inga typsnitt från nätet, inga skript – rapporten ska
 * kunna öppnas offline, mejlas som bilaga och skrivas ut till PDF.
 */

import { ALLVAR, slaUppRegel } from './regler-sv.js';

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const kortaNer = (s, n = 240) => {
  const t = String(s ?? '').replace(/\s+/g, ' ').trim();
  return t.length > n ? t.slice(0, n) + '…' : t;
};

/**
 * Slår ihop resultat från alla sidor till en regelcentrerad vy, eftersom
 * åtgärder görs per regel – en rättning i en mall löser ofta alla sidor på
 * en gång.
 */
export function sammanstall(sidor) {
  const perRegel = new Map();

  for (const sida of sidor) {
    if (sida.fel) continue;
    for (const v of sida.violations) {
      if (!perRegel.has(v.id)) {
        perRegel.set(v.id, {
          id: v.id,
          impact: v.impact,
          helpUrl: v.helpUrl,
          tags: v.tags || [],
          sidor: new Map(),
          antalElement: 0,
        });
      }
      const post = perRegel.get(v.id);
      // Behåll den högsta allvarlighetsgraden om den varierar mellan sidor.
      if ((ALLVAR[v.impact]?.ordning ?? 9) < (ALLVAR[post.impact]?.ordning ?? 9)) {
        post.impact = v.impact;
      }
      post.antalElement += v.nodes.length;
      post.sidor.set(sida.url, v.nodes);
    }
  }

  const regler = [...perRegel.values()].sort((a, b) => {
    const o = (ALLVAR[a.impact]?.ordning ?? 9) - (ALLVAR[b.impact]?.ordning ?? 9);
    if (o !== 0) return o;
    return b.antalElement - a.antalElement;
  });

  const summering = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  let totaltElement = 0;
  for (const r of regler) {
    if (summering[r.impact] !== undefined) summering[r.impact] += r.antalElement;
    totaltElement += r.antalElement;
  }

  const lyckade = sidor.filter((s) => !s.fel);
  const sidorMedFel = lyckade.filter((s) => s.violations.length > 0).length;

  return {
    regler,
    summering,
    totaltElement,
    antalRegler: regler.length,
    antalSidor: lyckade.length,
    sidorMedFel,
    misslyckade: sidor.filter((s) => s.fel),
  };
}

function stapel(summering, totalt) {
  if (totalt === 0) return '';
  const delar = [
    ['critical', '#b3261e'],
    ['serious', '#c2670a'],
    ['moderate', '#8a6d00'],
    ['minor', '#4a5568'],
  ];
  return delar
    .filter(([k]) => summering[k] > 0)
    .map(
      ([k, farg]) =>
        `<span class="seg" style="width:${((summering[k] / totalt) * 100).toFixed(2)}%;background:${farg}" title="${ALLVAR[k].etikett}: ${summering[k]}"></span>`
    )
    .join('');
}

function atgardslista(regler) {
  // De tio poster som ger störst effekt: allvarlighet först, sedan antal element.
  return regler.slice(0, 10).map((r, i) => {
    const sv = slaUppRegel({ id: r.id, helpUrl: r.helpUrl, tags: r.tags });
    return `<tr>
      <td class="num">${i + 1}</td>
      <td><strong>${esc(sv.namn)}</strong><div class="mini">${esc(r.id)}</div></td>
      <td><span class="pill ${r.impact}">${ALLVAR[r.impact]?.etikett ?? r.impact}</span></td>
      <td class="num">${r.antalElement}</td>
      <td class="num">${r.sidor.size}</td>
    </tr>`;
  }).join('');
}

function regelavsnitt(r, index) {
  const sv = slaUppRegel({ id: r.id, helpUrl: r.helpUrl, tags: r.tags });
  const wcag = sv.wcag && sv.wcag.length
    ? `<div class="wcag">${sv.wcag.map((w) => `<span>${esc(w)}</span>`).join('')}</div>`
    : '';

  const sidlista = [...r.sidor.entries()]
    .map(([url, noder]) => {
      const exempel = noder.slice(0, 3).map((n) => {
        const selector = Array.isArray(n.target) ? n.target.flat().join(' ') : String(n.target);
        return `<li><code class="sel">${esc(selector)}</code><pre>${esc(kortaNer(n.html, 300))}</pre></li>`;
      }).join('');
      const fler = noder.length > 3 ? `<li class="mini">…och ${noder.length - 3} till på denna sida</li>` : '';
      return `<div class="sidblock">
        <div class="sidrubrik">${esc(url)} <span class="mini">${noder.length} element</span></div>
        <ul class="noder">${exempel}${fler}</ul>
      </div>`;
    })
    .join('');

  const flagga = sv.oversatt ? '' : '<div class="notis">Denna regel saknar svensk beskrivning i verktyget. Texten nedan kommer från axe-core.</div>';

  return `<section class="regel" id="regel-${esc(r.id)}">
    <h3><span class="idx">${index + 1}</span> ${esc(sv.namn)} <span class="pill ${r.impact}">${ALLVAR[r.impact]?.etikett ?? r.impact}</span></h3>
    <div class="meta">Regel-id <code>${esc(r.id)}</code> · ${r.antalElement} element på ${r.sidor.size} ${r.sidor.size === 1 ? 'sida' : 'sidor'}</div>
    ${wcag}
    ${flagga}
    <p class="txt"><strong>Vad är fel:</strong> ${esc(sv.problem)}</p>
    ${sv.paverkan ? `<p class="txt"><strong>Konsekvens:</strong> ${esc(sv.paverkan)}</p>` : ''}
    <div class="atgard"><strong>Så åtgärdar ni det:</strong> ${esc(sv.atgard)}</div>
    <details><summary>Berörda element (${r.antalElement})</summary>${sidlista}</details>
  </section>`;
}

export function byggRapport({ sidor, sammanfattning, organisation, datum, verktygsversion, jamforelse }) {
  const s = sammanfattning;
  const totalt = s.totaltElement;

  const jamforBlock = jamforelse
    ? `<div class="jamfor ${jamforelse.forandring <= 0 ? 'bra' : 'daligt'}">
        <strong>Jämförelse med föregående mätning (${esc(jamforelse.tidigareDatum)}):</strong>
        ${jamforelse.tidigare} → ${totalt} fel
        (${jamforelse.forandring > 0 ? '+' : ''}${jamforelse.forandring},
        ${jamforelse.forandring <= 0 ? 'förbättring' : 'försämring'}).
        ${jamforelse.losta.length ? `Helt åtgärdade regler: ${jamforelse.losta.map(esc).join(', ')}.` : ''}
        ${jamforelse.nya.length ? `Nya regler med fel: ${jamforelse.nya.map(esc).join(', ')}.` : ''}
       </div>`
    : '';

  const misslyckadeBlock = s.misslyckade.length
    ? `<div class="notis"><strong>${s.misslyckade.length} sidor kunde inte granskas:</strong>
        <ul>${s.misslyckade.map((m) => `<li>${esc(m.url)} – ${esc(m.fel)}</li>`).join('')}</ul></div>`
    : '';

  return `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tillgänglighetsrapport – ${esc(organisation)}</title>
<style>
  :root{--txt:#16191d;--dim:#5b6470;--linje:#dfe3e8;--bg:#fff;--panel:#f6f7f9;--blaa:#12457a}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--txt);
       font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
  .wrap{max-width:940px;margin:0 auto;padding:48px 28px 80px}
  header.topp{border-bottom:3px solid var(--blaa);padding-bottom:22px;margin-bottom:34px}
  header.topp h1{margin:0 0 6px;font-size:30px;letter-spacing:-.4px}
  header.topp .org{font-size:19px;color:var(--blaa);font-weight:600}
  header.topp .datum{color:var(--dim);font-size:14px;margin-top:8px}
  h2{font-size:21px;margin:44px 0 14px;padding-bottom:8px;border-bottom:1px solid var(--linje)}
  h3{font-size:17px;margin:0 0 6px;display:flex;align-items:center;gap:9px;flex-wrap:wrap}
  .kort{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin:22px 0}
  .kort div{background:var(--panel);border:1px solid var(--linje);border-radius:8px;padding:14px}
  .kort .n{font-size:27px;font-weight:700;line-height:1.1}
  .kort .e{font-size:12px;color:var(--dim);text-transform:uppercase;letter-spacing:.6px;margin-top:4px}
  .bar{display:flex;height:14px;border-radius:7px;overflow:hidden;background:var(--panel);margin:8px 0 6px}
  .bar .seg{display:block}
  .legend{font-size:12.5px;color:var(--dim);display:flex;gap:16px;flex-wrap:wrap}
  .legend i{display:inline-block;width:9px;height:9px;border-radius:2px;margin-right:5px}
  table{width:100%;border-collapse:collapse;font-size:14.5px;margin:14px 0}
  th,td{text-align:left;padding:9px 10px;border-bottom:1px solid var(--linje);vertical-align:top}
  th{font-size:12px;text-transform:uppercase;letter-spacing:.5px;color:var(--dim)}
  td.num,th.num{text-align:right;white-space:nowrap}
  .pill{font-size:11px;font-weight:700;padding:2px 8px;border-radius:11px;white-space:nowrap;color:#fff}
  .pill.critical{background:#b3261e}.pill.serious{background:#c2670a}
  .pill.moderate{background:#8a6d00}.pill.minor{background:#4a5568}
  .regel{border:1px solid var(--linje);border-radius:9px;padding:18px 20px;margin:16px 0;background:#fff;break-inside:avoid}
  .regel .idx{background:var(--blaa);color:#fff;width:24px;height:24px;border-radius:50%;
              display:inline-flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:700;flex:none}
  .meta{font-size:12.5px;color:var(--dim);margin-bottom:9px}
  .wcag{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
  .wcag span{background:#e8f0fa;color:var(--blaa);font-size:11.5px;padding:3px 9px;border-radius:4px;font-weight:600}
  .txt{margin:7px 0}
  .atgard{background:#eef7ee;border-left:3px solid #2e7d32;padding:11px 14px;border-radius:0 6px 6px 0;margin:12px 0 6px}
  .notis{background:#fff8e6;border-left:3px solid #b8860b;padding:11px 14px;border-radius:0 6px 6px 0;margin:12px 0;font-size:14.5px}
  .jamfor{padding:12px 15px;border-radius:7px;margin:18px 0;font-size:14.5px}
  .jamfor.bra{background:#eef7ee;border-left:3px solid #2e7d32}
  .jamfor.daligt{background:#fdecea;border-left:3px solid #b3261e}
  details{margin-top:12px}
  summary{cursor:pointer;font-size:14px;font-weight:600;color:var(--blaa)}
  .sidblock{margin:12px 0 0;padding-left:2px}
  .sidrubrik{font-size:13px;font-weight:600;word-break:break-all;margin-bottom:5px}
  .mini{font-size:12px;color:var(--dim);font-weight:400}
  ul.noder{list-style:none;padding:0;margin:0}
  ul.noder li{margin:0 0 10px}
  code.sel{font-size:12px;background:var(--panel);padding:2px 6px;border-radius:4px;word-break:break-all}
  pre{background:#1e2228;color:#e6edf3;padding:9px 11px;border-radius:6px;overflow-x:auto;
      font-size:12px;line-height:1.5;margin:5px 0 0;white-space:pre-wrap;word-break:break-word}
  .scope{background:var(--panel);border:1px solid var(--linje);border-radius:9px;padding:18px 20px;margin:26px 0;font-size:14.5px}
  .scope ul{margin:9px 0 0;padding-left:20px}
  footer{margin-top:56px;padding-top:18px;border-top:1px solid var(--linje);font-size:12.5px;color:var(--dim)}
  @media print{
    .wrap{max-width:none;padding:0}
    .regel{border-color:#ccc}
    details{display:block}
    details summary{display:none}
    pre{color:#111;background:#f2f2f2;border:1px solid #ddd}
    a{color:inherit;text-decoration:none}
  }
</style>
</head>
<body>
<div class="wrap">

<header class="topp">
  <div class="org">${esc(organisation)}</div>
  <h1>Tillgänglighetsgranskning enligt WCAG 2.1 AA</h1>
  <div class="datum">Automatiserad granskning utförd ${esc(datum)} · ${s.antalSidor} ${s.antalSidor === 1 ? 'sida granskad' : 'sidor granskade'} · Tillgänglighetskollen ${esc(verktygsversion)}</div>
</header>

${jamforBlock}

<h2>Sammanfattning</h2>

<div class="kort">
  <div><div class="n">${totalt}</div><div class="e">Fel totalt</div></div>
  <div><div class="n">${s.antalRegler}</div><div class="e">Regler med fel</div></div>
  <div><div class="n">${s.summering.critical + s.summering.serious}</div><div class="e">Kritiska/allvarliga</div></div>
  <div><div class="n">${s.sidorMedFel}/${s.antalSidor}</div><div class="e">Sidor med fel</div></div>
</div>

<div class="bar">${stapel(s.summering, totalt)}</div>
<div class="legend">
  <span><i style="background:#b3261e"></i>Kritisk ${s.summering.critical}</span>
  <span><i style="background:#c2670a"></i>Allvarlig ${s.summering.serious}</span>
  <span><i style="background:#8a6d00"></i>Måttlig ${s.summering.moderate}</span>
  <span><i style="background:#4a5568"></i>Mindre ${s.summering.minor}</span>
</div>

${misslyckadeBlock}

<div class="scope">
  <strong>Vad den här granskningen täcker – och vad den inte täcker</strong>
  <p style="margin:9px 0 0">Rapporten bygger på automatiserad testning med axe-core. Automatiserade tester hittar
  tillförlitligt de maskinellt kontrollerbara kraven, men de kan inte bedöma allt i WCAG 2.1 AA. Branschens
  vedertagna uppskattning är att automatiserad testning fångar ungefär en tredjedel av kriterierna.</p>
  <ul>
    <li><strong>Täcks:</strong> textalternativ, formuläretiketter, färgkontrast, språkattribut, ARIA-fel, rubrikstruktur, landmärken och tabellstruktur.</li>
    <li><strong>Täcks inte:</strong> om alt-texten faktiskt beskriver rätt sak, logisk tabbordning, synlig fokusmarkering i praktiken, korrekt felhantering i formulär, undertexternas kvalitet, och om hela köpflödet går att genomföra med enbart tangentbord.</li>
  </ul>
  <p style="margin:9px 0 0">Åtgärda punkterna nedan först. De är konkreta, verifierbara och utgör den största delen
  av de fel som faktiskt stoppar användare. Komplettera därefter med manuell granskning enligt den medföljande
  checklistan.</p>
</div>

<h2>Prioriterad åtgärdslista</h2>
<p class="txt">Sorterad efter allvarlighetsgrad och därefter efter antal berörda element. Fel som återkommer på
många sidor ligger nästan alltid i en gemensam mall – en enda rättning löser då samtliga förekomster.</p>
<table>
  <thead><tr><th class="num">#</th><th>Problem</th><th>Grad</th><th class="num">Element</th><th class="num">Sidor</th></tr></thead>
  <tbody>${atgardslista(s.regler)}</tbody>
</table>

<h2>Alla fel i detalj</h2>
${s.regler.map((r, i) => regelavsnitt(r, i)).join('')}

<h2>Resultat per sida</h2>
<table>
  <thead><tr><th>Sida</th><th class="num">Fel</th><th class="num">Regler</th></tr></thead>
  <tbody>
    ${sidor.filter((p) => !p.fel).map((p) => {
      const antal = p.violations.reduce((n, v) => n + v.nodes.length, 0);
      return `<tr><td style="word-break:break-all">${esc(p.url)}</td><td class="num">${antal}</td><td class="num">${p.violations.length}</td></tr>`;
    }).join('')}
  </tbody>
</table>

<h2>Metod</h2>
<p class="txt">Varje sida öppnades i en verklig webbläsare, Chromium via Playwright, i fönsterstorleken som anges
i rapporthuvudet. Sidan fick ladda klart, varefter axe-core ${esc(verktygsversion.split('axe-core ')[1] || '')}
kördes mot det renderade DOM-trädet med regeluppsättningarna wcag2a, wcag2aa, wcag21a och wcag21aa. Endast
faktiska fel redovisas; godkända och ofullständiga kontroller utelämnas.</p>
<p class="txt">Granskningen kan köras om när som helst med samma kommando. Använd flaggan
<code>--jamfor</code> mot en tidigare JSON-fil för att dokumentera utvecklingen över tid. Det är den typen av
dokumenterat, fortlöpande arbete som tillsynsmyndigheter efterfrågar.</p>

<footer>
  Genererad av Tillgänglighetskollen ${esc(verktygsversion)}. Rapporten är ett tekniskt underlag och utgör inte
  juridisk rådgivning. Dokumentet innehåller inga externa resurser och kan arkiveras som det är.
</footer>

</div>
</body>
</html>`;
}
