# Tillgänglighetskollen

Automatiserad WCAG 2.1 AA-granskning av svenska webbplatser. Verktyget öppnar varje sida i en riktig
webbläsare, kör axe-core mot det renderade innehållet och producerar tre filer: en rapport på svenska
som går att mejla eller skriva ut till PDF, en åtgärdslista som CSV, och rådata som JSON för att kunna
jämföra mätningar över tid.

Verktyget är byggt för det som tillgänglighetslagen faktiskt kräver av er: ett dokumenterat,
fortlöpande arbete som går att visa upp.

---

## Installation

Kräver Node.js 18 eller senare.

```bash
npm install
npm run installera-webblasare
```

Det andra kommandot laddar ner Chromium som Playwright använder. Det behöver bara göras en gång.

## Snabbstart

Testa direkt på den medföljande demosidan, som innehåller avsiktliga fel:

```bash
npm run demo
```

Granska er egen webbplats:

```bash
node skanna.mjs -o "Företaget AB" https://foretaget.se
```

Öppna sedan `rapport.html` i webbläsaren.

## Vanliga körningar

Granska flera sidmallar samtidigt — det är sidmallarna som räknas, inte antalet sidor, eftersom
samma fel återkommer i varje sida som använder mallen:

```bash
node skanna.mjs -o "Företaget AB" \
  https://foretaget.se \
  https://foretaget.se/produkter \
  https://foretaget.se/produkt/exempel \
  https://foretaget.se/kassa \
  https://foretaget.se/kontakt
```

Låt verktyget själv följa interna länkar och granska upp till 20 sidor:

```bash
node skanna.mjs -o "Företaget AB" --krypa 20 https://foretaget.se
```

Klicka bort en cookiebanner först, så att den inte skymmer sidan:

```bash
node skanna.mjs -o "Företaget AB" --klick "#godkann-alla" https://foretaget.se
```

Läs adresser från en fil, en per rad:

```bash
node skanna.mjs -o "Företaget AB" --fran sidor.txt
```

Granska ett lokalt bygge innan det publiceras:

```bash
node skanna.mjs -o "Företaget AB" dist/index.html dist/kassa.html
```

## Visa utvecklingen över tid

Det här är den funktion som gör mest nytta i en tillsyn. Spara varje mätning med datum i filnamnet
och jämför mot den föregående:

```bash
# Första mätningen
node skanna.mjs -o "Företaget AB" --ut matning-2026-08-01 https://foretaget.se

# Efter att ni rättat felen
node skanna.mjs -o "Företaget AB" --ut matning-2026-09-01 \
  --jamfor matning-2026-08-01.json https://foretaget.se
```

Rapporten inleds då med en ruta som visar hur många fel som försvunnit, vilka regler som är helt
åtgärdade och om några nya fel tillkommit. Spara rapporterna. De utgör er dokumentation.

## Alla flaggor

| Flagga | Betydelse |
|---|---|
| `-o`, `--organisation <namn>` | Namn som visas i rapporten |
| `--fran <fil>` | Läs adresser från textfil, en per rad (`#` inleder en kommentar) |
| `--krypa <antal>` | Följ interna länkar och granska upp till `<antal>` sidor totalt |
| `--ut <prefix>` | Filnamnsprefix för utdata (standard `rapport`) |
| `--klick <selektor>` | Klicka bort ett element före granskning. Kan anges flera gånger |
| `--vanta <ms>` | Extra väntetid efter sidladdning (standard 1500) |
| `--bredd <px>` / `--hojd <px>` | Fönsterstorlek (standard 1280 × 900) |
| `--timeout <ms>` | Max laddningstid per sida (standard 45000) |
| `--jamfor <fil.json>` | Jämför med en tidigare mätning |
| `-h`, `--hjalp` | Visa hjälpen |

## Använda verktyget i CI

Skriptet avslutas med kod `1` om det finns kritiska eller allvarliga fel, annars `0`. Det gör att ni
kan stoppa en driftsättning som skulle införa nya fel:

```yaml
- run: node skanna.mjs -o "Företaget AB" --ut ci https://staging.foretaget.se
```

## Vad verktyget hittar — och vad det inte hittar

Var ärlig mot er själva här, för det är den vanligaste fällan.

Automatiserad testning fångar ungefär en tredjedel av kriterierna i WCAG 2.1 AA. Noll fel i den här
rapporten betyder alltså **inte** att webbplatsen uppfyller lagen.

**Hittas tillförlitligt:** saknade textalternativ, formulärfält utan etikett, för låg färgkontrast,
saknade eller felaktiga språkattribut, ogiltig ARIA, rubriknivåer som hoppar, innehåll utanför
landmärken, tabeller utan rubrikkoppling, blockerad zoom.

**Hittas inte:** om alt-texten faktiskt beskriver rätt sak, om tabbordningen är logisk, om
fokusmarkeringen syns i praktiken, om felmeddelanden i formulär är begripliga, om undertexter är
korrekta, och om hela köpflödet går att genomföra med enbart tangentbord.

Kör därför den manuella checklistan i `02-checklista-wcag-2.1-aa.md` efter att ni rättat det
automatiserade. Den tar ungefär en timme per sidmall och täcker resten.

## Felsökning

**"Kunde inte starta webbläsaren"** — kör `npx playwright install chromium`.

**Sidan granskas men rapporten verkar tom eller felaktig** — sidan bygger troligen innehållet med
JavaScript efter laddning. Höj väntetiden: `--vanta 5000`.

**Cookiebannern skymmer allt** — hitta knappens selektor i webbläsarens utvecklarverktyg och skicka
in den med `--klick`.

**Sidan kräver inloggning** — granska i stället motsvarande sida i er testmiljö, eller ett lokalt
bygge via filsökväg.

**Väldigt många `color-contrast`-fel** — kontrollera först om de kommer från ett enda ställe i er
CSS. Det är nästan alltid en grå nyans som används överallt.

## Ingår i paketet

| Fil | Innehåll |
|---|---|
| `skanna.mjs` | Verktyget |
| `src/regler-sv.js` | Svensk regelordbok — här kan ni lägga till egna formuleringar |
| `src/rapport.js` | Rapportgenerator |
| `exempel/demo-sida.html` | Demosida med avsiktliga fel |
| `exempel/exempelrapport.html` | Så ser en färdig rapport ut |

Rapporten innehåller inga externa resurser. Den kan arkiveras, mejlas och läsas offline som den är.
