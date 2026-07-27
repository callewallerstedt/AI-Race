# Manuell checklista — WCAG 2.1 AA

Den här checklistan täcker det som **automatiserad testning inte kan avgöra**. Kör skannern först,
rätta det den hittar, och gå sedan igenom den här listan per sidmall.

**Tidsåtgång:** cirka 45–60 minuter per sidmall första gången, därefter 15–20 minuter.

**Prioritera i den här ordningen:** kassa → varukorg → produktsida → sök och kategori → startsida →
kontakt och konto → övrigt.

Utrustning som behövs: en webbläsare, ett tangentbord, och en skärmläsare. På Windows är NVDA gratis;
på Mac finns VoiceOver inbyggt (Cmd + F5); på iPhone finns VoiceOver under Tillgänglighet.

Markera varje rad som ✅ godkänd, ❌ underkänd eller — ej tillämplig.

---

## A. Tangentbord — gör detta först

Lägg undan musen helt. Allt nedan ska gå att göra med enbart Tab, Shift+Tab, Enter, Mellanslag och
piltangenter.

| # | Kontroll | WCAG | Status |
|---|---|---|---|
| A1 | Går det att nå **alla** interaktiva element med Tab: länkar, knappar, fält, flikar, karuseller, kartor? | 2.1.1 | |
| A2 | Går det att komma **ut** ur varje komponent igen, utan att fastna? Testa särskilt modaler, videospelare och inbäddade kartor. | 2.1.2 | |
| A3 | Ser du **hela tiden** var fokus befinner sig? | 2.4.7 | |
| A4 | Är fokusmarkeringen tydlig även mot färgade bakgrunder och på knappar som redan har hover-effekt? | 2.4.7 | |
| A5 | Följer tabbordningen den **visuella** ordningen? Vanlig fallgrop efter CSS-omflyttning med flex eller grid. | 1.3.2, 2.4.3 | |
| A6 | Öppnas en modal med fokus **inuti** modalen, stannar fokus kvar där, och återgår fokus till den knapp som öppnade den när modalen stängs? | 2.4.3 | |
| A7 | Stängs modaler och menyer med Escape? | 2.1.2 | |
| A8 | Fungerar rullgardinsmenyer, flikar och accordions med piltangenter, Enter och Mellanslag? | 2.1.1 | |
| A9 | Finns en fungerande hoppa-till-innehåll-länk som blir **synlig** när den får fokus? | 2.4.1 | |
| A10 | Går hela köpflödet — från produktsida till bekräftad order — att genomföra utan mus? | 2.1.1 | |

> A10 är det enskilt viktigaste testet i hela dokumentet. Om det misslyckas är det både ett
> lagbrott och en direkt förlorad intäkt.

---

## B. Innehåll och struktur

| # | Kontroll | WCAG | Status |
|---|---|---|---|
| B1 | Beskriver varje alt-text vad bilden faktiskt **förmedlar** i sitt sammanhang? En skanner ser att alt finns, inte att den är rätt. | 1.1.1 | |
| B2 | Har rent dekorativa bilder tomt `alt=""` i stället för en beskrivning? | 1.1.1 | |
| B3 | Innehåller bilder som förmedlar **text** — kampanjbanners, prisskyltar — samma text i alt-attributet? | 1.1.1, 1.4.5 | |
| B4 | Beskriver rubrikerna verkligen sina avsnitt, och bildar de en logisk struktur? | 1.3.1, 2.4.6 | |
| B5 | Är länktexten begriplig **utan** omgivande text? Undvik "läs mer" och "klicka här" som ensam länktext. | 2.4.4 | |
| B6 | Har varje sida en unik och beskrivande titel med det viktigaste först? | 2.4.2 | |
| B7 | Är sidans språk korrekt, och är avsnitt på annat språk markerade med `lang`? | 3.1.1, 3.1.2 | |
| B8 | Förmedlas ingen information **enbart** med färg? Rea-priser, statusar och obligatoriska fält behöver också text eller symbol. | 1.4.1 | |
| B9 | Är tabeller riktiga tabeller med `<th>` och `scope`, inte layouttabeller eller div-rutnät? | 1.3.1 | |

---

## C. Formulär och kassa

| # | Kontroll | WCAG | Status |
|---|---|---|---|
| C1 | Har varje fält en **synlig** etikett som står kvar när användaren skriver? En placeholder räcker inte. | 3.3.2 | |
| C2 | Är obligatoriska fält markerade med något annat än enbart en röd asterisk eller färg? | 3.3.2 | |
| C3 | Beskriver felmeddelanden **vad** som är fel och **hur** det rättas? "Ogiltig inmatning" är underkänt; "Postnumret ska ha fem siffror" är godkänt. | 3.3.1, 3.3.3 | |
| C4 | Får användaren veta att ett fel uppstått även utan att se det — via `aria-live`, fokusflytt eller ett felsammandrag högst upp? | 3.3.1 | |
| C5 | Sitter felmeddelandet **intill** sitt fält och är kopplat med `aria-describedby`? | 3.3.1 | |
| C6 | Har fälten korrekt `autocomplete`, så att namn, adress och e-post fylls i automatiskt? | 1.3.5 | |
| C7 | Går det att granska och korrigera uppgifterna innan en beställning slutförs? | 3.3.4 | |
| C8 | Sker inget oväntat vid enbart fokus eller ändrat värde — ingen automatisk sidladdning när ett fält ändras? | 3.2.1, 3.2.2 | |
| C9 | Finns tillräckligt med tid? Om sessionen kan löpa ut ska användaren kunna förlänga den. | 2.2.1 | |

---

## D. Visuell utformning

| # | Kontroll | WCAG | Status |
|---|---|---|---|
| D1 | Fungerar sidan vid **200 % zoom** utan att innehåll försvinner eller överlappar? | 1.4.4 | |
| D2 | Fungerar sidan i **320 px bredd** utan vågrät rullning? Motsvarar 400 % zoom på desktop. | 1.4.10 | |
| D3 | Har knappar, ikoner, formulärramar och grafik som förmedlar information minst **3:1** kontrast mot bakgrunden? Skannern mäter text, inte gränssnittskomponenter. | 1.4.11 | |
| D4 | Fungerar sidan fortfarande när textavstånd ökas — radavstånd 1,5, styckeavstånd 2, bokstavsavstånd 0,12 em, ordavstånd 0,16 em? | 1.4.12 | |
| D5 | Går innehåll som visas vid hover eller fokus, till exempel verktygstips, att stänga med Escape och att peka på utan att det försvinner? | 1.4.13 | |
| D6 | Fungerar sidan i både stående och liggande läge på mobil? | 1.3.4 | |
| D7 | Finns ett sätt att pausa, stoppa eller dölja allt som rör sig, blinkar eller uppdateras automatiskt i mer än fem sekunder — karuseller, animerade banners? | 2.2.2 | |
| D8 | Blinkar ingenting mer än tre gånger per sekund? | 2.3.1 | |

---

## E. Media

| # | Kontroll | WCAG | Status |
|---|---|---|---|
| E1 | Har alla videor med tal **korrekta** undertexter? Automatgenererade undertexter utan granskning är i praktiken underkänt. | 1.2.2 | |
| E2 | Har videor där viktig information visas visuellt en syntolkning eller en textbeskrivning? | 1.2.3, 1.2.5 | |
| E3 | Har rena ljudfiler, till exempel poddar, en transkribering? | 1.2.1 | |
| E4 | Startar inget ljud automatiskt? Om det ändå gör det, finns en stoppknapp först i tabbordningen? | 1.4.2 | |

---

## F. Test med skärmläsare

Gör minst detta på kassan och produktsidan. Det tar tio minuter och avslöjar mer än allt annat.

| # | Kontroll | WCAG | Status |
|---|---|---|---|
| F1 | Läs igenom sidan uppifrån och ned. Är någonting obegripligt eller i fel ordning? | 1.3.2 | |
| F2 | Lista sidans rubriker med skärmläsarens rubrikgenväg. Ger listan en användbar innehållsförteckning? | 2.4.1 | |
| F3 | Lista sidans länkar. Går det att förstå vart var och en leder? | 2.4.4 | |
| F4 | Gå igenom formuläret i formulärläge. Annonseras varje fälts namn, typ och obligatoriskhet? | 4.1.2 | |
| F5 | Lägg en vara i varukorgen. Annonseras att den lagts till, eller sker det tyst? | 4.1.3 | |
| F6 | Utlös ett formulärfel med flit. Annonseras felet? | 3.3.1, 4.1.3 | |
| F7 | Öppna sök- eller filterfunktionen. Annonseras antalet träffar när resultatet uppdateras? | 4.1.3 | |

---

## Sammanställning

| Avsnitt | Godkända | Underkända | Ej tillämpliga |
|---|---|---|---|
| A. Tangentbord | | | |
| B. Innehåll och struktur | | | |
| C. Formulär och kassa | | | |
| D. Visuell utformning | | | |
| E. Media | | | |
| F. Skärmläsare | | | |

Granskad sidmall: ______________________  Datum: ____________  Granskare: ____________

Spara den ifyllda checklistan. Tillsammans med de daterade skanningsrapporterna utgör den er
dokumentation över att arbetet bedrivs fortlöpande.
