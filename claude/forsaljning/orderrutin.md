# Orderrutin

Syftet är att en försäljning ska kosta så få mänskliga minuter som möjligt. Målet är under tre
minuter per order. Allt som kan förberedas i förväg är förberett.

---

## Engångsuppsättning (görs en gång, cirka 4 minuter)

```bash
cd claude/forsaljning/faktura
cp saljare.exempel.json saljare.json
```

Fyll i företagsnamn, adress, postort, e-post, telefon, org.nr, momsreg.nr och bankgiro.
`saljare.json` är gitignorerad och hamnar aldrig i repot.

---

## När någon svarar "skicka exempelrapporten"

1. Bifoga `produkt/tillganglighetskollen/exempel/exempelrapport.html`.
2. Använd svarsmallen i `utskick-mallar.md`.

Cirka 1 minut. Jag förbereder svaret som utkast så snart svaret syns i inkorgen.

---

## När någon vill beställa

**Steg 1 — bygg leveranspaketet** (cirka 10 sekunder)

```bash
cd claude/forsaljning
./bygg-leverans.sh enskild     # eller: byra
```

**Steg 2 — skapa fakturan** (cirka 30 sekunder)

```bash
cd faktura
node skapa-faktura.mjs \
  --kund "Kundens Företag AB" \
  --orgnr "556123-4567" \
  --adress "Storgatan 1, 111 22 Stockholm" \
  --epost "ekonomi@kunden.se" \
  --artikel byralicens
```

Artiklar: `paket` (1 495), `byralicens` (4 950), `uppstart` (2 900). Flera `--artikel` går att kombinera.

Öppna den skapade HTML-filen och skriv ut till PDF.

**Steg 3 — mejla** (cirka 1 minut)

Bifoga ZIP-filen och fakturan. Jag förbereder mejltexten som utkast.

**Steg 4 — logga**

För in ordern i `utskickslogg.csv` och i `LEDGER.csv` som `pending` tills betalningen syns på kontot,
därefter `settled`.

---

## Viktiga specialfall

**Order efter 14 augusti** — lägg till `--forskott` och leverera först när betalningen syns.
En obetald faktura räknas som noll vid deadline, så efter det datumet hinner tio dagars villkor
inte fram.

```bash
node skapa-faktura.mjs --kund "..." --artikel paket --forskott --dagar 5
```

**Momsregistrerad köpare i annat EU-land** — lägg till `--eu`. Fakturan sätts då till 0 % moms med
hänvisning till omvänd betalningsskyldighet.

**Kunden vill ha uppstartshjälpen** — be dem köra mätningen och skicka `rapport.json`. Jag levererar
åtgärdsplan, utkast till tillgänglighetsredogörelse och ifylld efterlevnadsplan inom tre arbetsdagar.
Det arbetet är mitt, inte ditt.

**Kunden frågar något jag inte täckt** — vidarebefordra frågan, så skriver jag svaret som utkast.
Svara aldrig med en gissning om lagen; hellre "jag återkommer i dag".

---

## Vad som aldrig får sägas

- Att paketet gör kunden lagenlig. Det gör det inte, och det står i varje utskick.
- Att vi är fler än vi är. Inga påhittade referenskunder, ingen uppblåst organisation.
- Att böter är nära förestående för just dem. Sanktionsspannet får nämnas som faktum med källa.
- Att vi ger juridisk rådgivning.

Positioneringen är att vara det ärliga alternativet i en bransch full av överlagringswidgetar som
lovar mer än de kan hålla. Det är också det enda som håller om en kund granskar påståendena.
