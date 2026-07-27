# Erbjudandet — Tillgänglighetskollen

Internt säljunderlag. Ligger till grund för utskick, svar på frågor och leverans.

---

## Positionering i en mening

Ett svenskt verktygs- och dokumentpaket som tar ett företag från "vi vet att tillgänglighetslagen
gäller oss" till "vi mäter, vi åtgärdar och vi kan visa det" — för under en tjugondel av vad en
konsultgranskning kostar.

## Marknadsläget, med belägg

| Fakta | Källa |
|---|---|
| Tillgänglighetslagen (2023:254) gäller privata företag sedan 2025-06-28 | Sveriges riksdag, PTS |
| PTS är marknadskontroll- och tillsynsmyndighet för e-handel, banktjänster och elektroniska kommunikationstjänster | PTS |
| Sanktionsavgift bestäms till mellan 10 000 och 10 000 000 kr | Lag (2023:254) |
| Tillsynsprogram är igång i Sverige och Nederländerna; Frankrike har stämt fyra kedjor; Norge har dömt ut löpande vite | li.solutions, Level Access |
| En manuell WCAG-granskning av en sajt med 10–15 sidmallar kostar 30 000–60 000 kr i Sverige | webperf.se |
| Mikroföretag (<10 anställda **och** ≤2 MEUR) är undantagna från kraven på tjänster | PTS, webperf.se |

**Luckan:** priset på en riktig granskning börjar vid 30 000 kr. Under den nivån finns i praktiken
ingenting mellan gratis engelska skanningsverktyg och full konsultinsats. Där ligger tusentals
svenska e-handlare och de byråer som bygger åt dem.

## Vad kunden får

1. **Tillgänglighetskollen** — en fungerande skanner som öppnar sidorna i en riktig webbläsare, kör
   axe-core mot WCAG 2.1 AA och genererar en rapport på svenska, en åtgärdslista som CSV och rådata
   som JSON. 55 regler är översatta till klarspråk med konkret åtgärd och rätt WCAG-kriterium.
   Jämförelseläget visar utvecklingen mellan två mätningar.
2. **Juridisk översikt** — vad lagen kräver, vem som omfattas, vilken myndighet som utövar tillsyn,
   vilka sanktioner som gäller, och de sex vanligaste missuppfattningarna.
3. **Manuell checklista** — 38 kontroller i sex avsnitt, för det automatiserade tester inte kan
   avgöra.
4. **Mall för tillgänglighetsredogörelse** — lagkravet enligt 25 § som de flesta missar helt.
5. **Utvecklarguide** — 15 vanliga fel med kod före och efter, inklusive React, samt en arbetsordning
   efter effekt per timme.
6. **Efterlevnadsplan** — mallen som gör att arbetet går att visa upp vid en tillsyn.

## Priser

| Paket | Pris exkl. moms | Innehåll |
|---|---|---|
| **Tillgänglighetspaketet** | **1 495 kr** | Allt ovan. Ett företag, en webbplats. Uppdateringar ingår. |
| **Byrålicens** | **4 950 kr** | Allt ovan, med rätt att använda i obegränsat antal kunduppdrag och att leverera rapporterna vidare till kund. |
| **Uppstartshjälp** (tillval) | **+2 900 kr** | Kunden kör mätningen och skickar JSON-filen. Inom tre arbetsdagar levereras en prioriterad åtgärdsplan anpassad till deras teknikstack, ett utkast till tillgänglighetsredogörelse och en ifylld efterlevnadsplan. |

Motivering till prissättningen: 1 495 kr ligger under de flesta företags attestgräns, så en utvecklare
eller marknadsansvarig kan besluta själv utan inköpsprocess. 4 950 kr motsvarar under fyra
debiterbara timmar för en byrå — mindre än vad det kostar dem att själva sätta ihop motsvarande
material en enda gång.

## Vad vi inte påstår

Detta är avgörande för både trovärdighet och juridik, och ska stå i varje utskick:

- Paketet gör ingen automatiskt lagenlig. Automatiserad testning täcker ungefär **en tredjedel** av
  kriterierna i WCAG 2.1 AA.
- Det är inte juridisk rådgivning.
- Det ersätter inte en formell granskning med intyg. Behöver kunden det är 30 000–60 000 kr rätt väg,
  och det säger vi rakt ut.
- Vi lovar inga sökmotoreffekter, inga certifieringar och ingen "compliance-garanti".

Erbjudandet vinner på att vara det ärliga alternativet i en bransch där överlagringswidgetar säljs
med löften de inte kan hålla. Den positioneringen är också den enda hållbara.

## Vanliga invändningar och svar

**"Vi använder redan axe/Lighthouse, det är gratis."**
Bra, då är halva jobbet gjort. Det ni inte får därifrån är den svenska juridiska kopplingen, mallen
för tillgänglighetsredogörelsen som är ett eget lagkrav, den manuella checklistan, och
dokumentationen som visar fortlöpande arbete. Skannern här ger dessutom rapporten på svenska, direkt
mejlbar till kund eller ledning.

**"Vi är för små."**
Undantaget kräver **både** färre än tio anställda **och** högst 2 miljoner euro i omsättning, och
gäller bara tjänster. Ligger ni nära gränsen försvinner undantaget den dag ni växer förbi den, utan
övergångstid.

**"Vi har en tillgänglighetswidget."**
Överlagringar rättar inte den underliggande koden och har återkommande kritiserats av dem som faktiskt
använder hjälpmedel. De löser inte kravet, och de ersätter inte redogörelsen.

**"Vi väntar tills någon säger till."**
Det är ett försvarbart beslut, men värt att fatta medvetet. Tillsynen har hittills gått ut på
vägledning först och sanktion sedan — och det som efterfrågas är dokumenterat, pågående arbete.
Nollmätningen tar en timme. Att stå utan den när frågan kommer är den dyra varianten.

**"Kan ni göra jobbet åt oss?"**
Uppstartshjälpen ger den prioriterade planen och dokumenten. Själva kodändringarna görs i er kod, av
er eller er byrå — utvecklarguiden visar exakt hur.

## Betalning och leverans

Betalning sker **mot faktura, 10 dagars villkor**. Kortbetalning erbjuds inte — säljaren har varken
Stripe eller PayPal, vilket är avgjort och inte värt att bygga runt.

Fakturan skapas med `forsaljning/faktura/skapa-faktura.mjs`, som tar kunduppgifter på kommandoraden
och producerar en färdig faktura med rätt moms, förfallodatum och löpande fakturanummer. Det tar
under en minut per order. Säljarens företagsuppgifter ligger i en gitignorerad `saljare.json` och
hamnar aldrig i repot.

Leverans sker digitalt via e-post direkt när ordern är bekräftad.

**Tidsgräns som styr allt:** en obetald faktura är värd noll i den här tävlingen. Med 10 dagars
villkor plus bankdagar är sista trygga orderdatum omkring **14 augusti**. Order efter det datumet
levereras mot **förskottsbetalning** (`--forskott`), annars hinner pengarna inte fram.

## Villkor

- Priser exklusive moms. 25 % moms tillkommer för svenska köpare. För momsregistrerade köpare i
  annat EU-land tillämpas omvänd betalningsskyldighet.
- Betalning mot faktura, 10 dagar. Förskottsbetalning vid order efter 14 augusti.
- Eftersom det är en digital produkt som levereras omedelbart gäller ingen ångerrätt efter
  nedladdning vid försäljning till näringsidkare. Detta ska framgå tydligt före köp.
- Licensen är knuten till köparen och får inte vidaresäljas. Byrålicensen ger rätt att använda
  materialet i kunduppdrag men inte att sälja paketet vidare som egen produkt.
