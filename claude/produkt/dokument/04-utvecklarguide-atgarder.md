# Utvecklarguide — så rättar ni felen

Konkreta lösningar på de fel som faktiskt återkommer i svenska webbshoppar, i den ordning de brukar
löna sig att ta. Varje avsnitt visar koden före och efter.

Genomgående princip: **rätt HTML-element löser problemet oftare än ARIA gör.** Den första regeln i
ARIA-specifikationen är att inte använda ARIA om det finns ett HTML-element som redan gör jobbet.

---

## 1. Språk på sidan — börja här

Enradsfixen med störst effekt per tecken. Utan den läser skärmläsaren svensk text med engelsk
talsyntes, vilket blir i det närmaste obegripligt.

```html
<!-- Före -->
<html>

<!-- Efter -->
<html lang="sv">
```

Text på annat språk mitt i sidan markeras separat:

```html
<p>Vi erbjuder <span lang="en">free shipping</span> på alla ordrar.</p>
```

---

## 2. Bilder utan alt-text

Frågan att ställa är inte "vad föreställer bilden" utan **"vad förmedlar bilden här"**. Samma bild
kan ha olika alt-text på olika platser.

```html
<!-- Före -->
<img src="/media/p8841.jpg">

<!-- Efter: produktbild -->
<img src="/media/p8841.jpg" alt="Blå damkappa i ull, knälång, med bälte">

<!-- Efter: dekorativ bild — tomt alt, aldrig utelämnat -->
<img src="/media/monster.svg" alt="">

<!-- Efter: bild som är en länk — beskriv målet, inte bilden -->
<a href="/rea"><img src="/media/rea-banner.jpg" alt="Rea: upp till 50 % på höstkollektionen"></a>
```

Regler att följa:

- Skriv inte "bild på" eller "foto av". Skärmläsaren annonserar redan att det är en bild.
- Innehåller bilden text måste texten finnas i alt-attributet.
- Ligger bilden bredvid en text som redan säger samma sak: använd `alt=""`.
- Utelämna aldrig attributet. Då läses filnamnet upp i stället.

I React:

```jsx
// Före
<img src={produkt.bild} />

// Efter — alt är obligatoriskt, och tomt är ett medvetet val
<img src={produkt.bild} alt={produkt.bildbeskrivning ?? ''} />
```

---

## 3. Ikonknappar och ikonlänkar utan namn

Det vanligaste allvarliga felet i sidhuvuden: sök, varukorg, meny och konto är ikoner utan text.

```html
<!-- Före -->
<button><svg>…</svg></button>

<!-- Efter: dold text, syns för skärmläsare, inte för ögat -->
<button>
  <svg aria-hidden="true" focusable="false">…</svg>
  <span class="endast-skarmlasare">Sök</span>
</button>

<!-- Alternativ: aria-label -->
<button aria-label="Öppna varukorgen">
  <svg aria-hidden="true" focusable="false">…</svg>
</button>
```

Verktygsklassen behövs i er CSS. Använd den här, inte `display:none` — det senare döljer texten även
för skärmläsare:

```css
.endast-skarmlasare {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
```

Innehåller knappen ett antal bör antalet ingå i namnet:

```html
<button aria-label="Varukorg, 3 varor">
  <svg aria-hidden="true" focusable="false">…</svg>
  <span class="antal" aria-hidden="true">3</span>
</button>
```

---

## 4. Formulärfält utan etikett

Det fel som direkt kostar er pengar, eftersom det sitter i kassan.

```html
<!-- Före -->
<input type="text" placeholder="Postnummer">

<!-- Efter -->
<label for="postnr">Postnummer</label>
<input type="text" id="postnr" name="postnr" autocomplete="postal-code" inputmode="numeric">
```

**En placeholder är inte en etikett.** Den försvinner så fort användaren börjar skriva, den har
oftast för låg kontrast, och den läses inte upp konsekvent av alla hjälpmedel.

Ska etiketten inte synas visuellt — dölj den för ögat, inte för hjälpmedlet:

```html
<label for="sok" class="endast-skarmlasare">Sök bland produkter</label>
<input type="search" id="sok" placeholder="Sök…">
```

Fyll i `autocomplete` korrekt. Det är ett eget AA-krav (1.3.5) och sparar tid för alla:

```html
<input id="fornamn"  autocomplete="given-name">
<input id="efternamn" autocomplete="family-name">
<input id="epost"    autocomplete="email"      type="email">
<input id="telefon"  autocomplete="tel"        type="tel">
<input id="adress"   autocomplete="street-address">
<input id="postnr"   autocomplete="postal-code">
<input id="ort"      autocomplete="address-level2">
```

I React, där `for` heter `htmlFor` och id måste vara unika i listor:

```jsx
const id = useId();
return (
  <>
    <label htmlFor={id}>Postnummer</label>
    <input id={id} autoComplete="postal-code" />
  </>
);
```

---

## 5. För låg färgkontrast

Nästan alltid en enda grå nyans som används på hela sajten. Rätta den i era designtokens så löser ni
hundratals fel på en gång.

```css
/* Före — 2,85:1 mot vitt, underkänt */
--text-dampad: #9b9b9b;

/* Efter — 4,54:1 mot vitt, godkänt */
--text-dampad: #767676;
```

Gränsvärden att hålla:

| Vad | Krav |
|---|---|
| Brödtext | 4,5:1 |
| Text ≥ 24px, eller ≥ 18,66px halvfet | 3:1 |
| Knapp- och fältramar, ikoner som bär information | 3:1 |
| Rent dekorativ grafik | inget krav |

`#767676` är den ljusaste rena gråtonen som klarar 4,5:1 mot vitt. Ligger er dämpade text ljusare än
så är den underkänd.

Glöm inte tillstånden: inaktiverade knappar undantas, men **hover, fokus och besökta länkar** måste
klara kraven.

---

## 6. Fokusmarkering

Ta aldrig bort fokusmarkeringen utan att ersätta den.

```css
/* Före — gör sidan oanvändbar med tangentbord */
*:focus { outline: none; }

/* Efter — tydlig markering, men bara för tangentbordsanvändare */
:focus-visible {
  outline: 3px solid #12457a;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Behåll en fallback för webbläsare utan :focus-visible */
:focus:not(:focus-visible) { outline: none; }
```

Mot mörka bakgrunder behövs en ljus markering. En dubbel kontur fungerar mot alla bakgrunder:

```css
:focus-visible {
  outline: 3px solid #fff;
  box-shadow: 0 0 0 6px #12457a;
}
```

---

## 7. Hoppa-till-innehåll-länk

```html
<body>
  <a href="#innehall" class="hoppa-lank">Hoppa till innehåll</a>
  <header>…</header>
  <main id="innehall" tabindex="-1">…</main>
```

```css
.hoppa-lank {
  position: absolute;
  left: -9999px;
  top: 0;
  background: #12457a;
  color: #fff;
  padding: 12px 18px;
  z-index: 1000;
}
.hoppa-lank:focus { left: 0; }
```

`tabindex="-1"` på `<main>` behövs för att fokus faktiskt ska flyttas dit i alla webbläsare.

---

## 8. Sidstruktur och landmärken

```html
<!-- Före -->
<div class="header">…</div>
<div class="nav">…</div>
<div class="content">…</div>
<div class="footer">…</div>

<!-- Efter -->
<header>
  <nav aria-label="Huvudmeny">…</nav>
</header>
<main id="innehall">
  <h1>Höstkollektionen</h1>
  …
</main>
<footer>
  <nav aria-label="Sidfot">…</nav>
</footer>
```

Regler: exakt ett `<main>` per sida, exakt en `<h1>`, inga hopp i rubriknivåerna, och namn på varje
`<nav>` när det finns flera.

Välj rubriknivå efter struktur — aldrig efter textstorlek:

```html
<!-- Före: h4 vald för att den råkar se lagom stor ut -->
<h4>Leveranstider</h4>

<!-- Efter: rätt nivå, storleken styrs i CSS -->
<h2 class="rubrik-liten">Leveranstider</h2>
```

---

## 9. Blockerad zoom

```html
<!-- Före -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

<!-- Efter -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## 10. Felmeddelanden i formulär

```html
<!-- Före -->
<input type="email" id="epost" class="fel">
<span class="felmeddelande">Ogiltig inmatning</span>
```

```html
<!-- Efter -->
<label for="epost">E-postadress</label>
<input type="email" id="epost" autocomplete="email"
       aria-invalid="true" aria-describedby="epost-fel">
<span id="epost-fel" class="felmeddelande">
  E-postadressen måste innehålla ett @-tecken. Exempel: namn@exempel.se
</span>
```

Tre saker gör skillnad: `aria-invalid` talar om att fältet är felaktigt, `aria-describedby` kopplar
meddelandet till fältet, och texten säger **vad** som är fel och **hur** det rättas.

Vid inskickat formulär: flytta fokus till ett felsammandrag högst upp.

```html
<div role="alert" tabindex="-1" id="fel-sammandrag">
  <h2>Formuläret kunde inte skickas</h2>
  <ul>
    <li><a href="#epost">E-postadressen saknar @-tecken</a></li>
    <li><a href="#postnr">Postnumret ska ha fem siffror</a></li>
  </ul>
</div>
```

```js
document.getElementById('fel-sammandrag').focus();
```

---

## 11. Dynamiska uppdateringar som sker tyst

När innehåll ändras utan sidladdning — "varan är tillagd", "12 träffar", "rabattkoden godkänd" —
måste det annonseras.

```html
<div aria-live="polite" class="endast-skarmlasare" id="status"></div>
```

```js
document.getElementById('status').textContent = 'Blå damkappa tillagd i varukorgen. 3 varor totalt.';
```

Använd `aria-live="polite"` som standard. Spara `assertive` till sådant som verkligen avbryter,
till exempel att sessionen håller på att löpa ut.

Behållaren måste finnas i DOM:en **innan** texten skrivs in. Skapas den samtidigt annonseras
ingenting.

---

## 12. Modaler

En modal ska: flytta fokus in, hålla kvar fokus, stängas med Escape, och lämna tillbaka fokus.

```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-rubrik">
  <h2 id="modal-rubrik">Välj storlek</h2>
  …
  <button class="stang">Stäng</button>
</div>
```

```js
let senastFokuserad;

function oppnaModal(modal) {
  senastFokuserad = document.activeElement;
  modal.hidden = false;
  modal.querySelector('h2, button, [href], input').focus();
  document.addEventListener('keydown', vidTangent);
}

function stangModal(modal) {
  modal.hidden = true;
  document.removeEventListener('keydown', vidTangent);
  senastFokuserad?.focus();          // tillbaka dit användaren var
}

function vidTangent(e) {
  if (e.key === 'Escape') stangModal(document.querySelector('[aria-modal="true"]'));
}
```

Innehållet bakom modalen ska inte gå att nå med Tab. Enklast med `inert`, som numera stöds brett:

```js
document.getElementById('innehall').inert = true;   // vid öppning
document.getElementById('innehall').inert = false;  // vid stängning
```

---

## 13. Karuseller och automatisk rörelse

Allt som rör sig automatiskt i mer än fem sekunder måste gå att pausa.

```html
<section aria-roledescription="karusell" aria-label="Utvalda produkter">
  <button class="pausa" aria-pressed="false">Pausa bildspelet</button>
  …
</section>
```

Respektera också systeminställningen för minskad rörelse:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 14. Tabeller

```html
<!-- Före -->
<table>
  <tr><td>Sverige</td><td>1–3 dagar</td><td>49 kr</td></tr>
</table>

<!-- Efter -->
<table>
  <caption>Leveranstider och fraktkostnad</caption>
  <thead>
    <tr>
      <th scope="col">Land</th>
      <th scope="col">Leveranstid</th>
      <th scope="col">Fraktkostnad</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Sverige</th>
      <td>1–3 arbetsdagar</td>
      <td>49 kr</td>
    </tr>
  </tbody>
</table>
```

Använd aldrig tabeller för layout. Behöver ni ett rutnät finns CSS grid.

---

## 15. Egna komponenter byggda av div-element

```html
<!-- Före: ser ut som en knapp, fungerar inte som en -->
<div class="knapp" onclick="laggIVarukorg()">Lägg i varukorg</div>

<!-- Efter -->
<button type="button" onclick="laggIVarukorg()">Lägg i varukorg</button>
```

`<button>` ger gratis: fokuserbarhet, aktivering med Enter och Mellanslag, korrekt roll för
hjälpmedel och rätt beteende i formulär. Att bygga samma sak med `<div>` kräver `role`, `tabindex`
och egna tangentbordshanterare — och blir ändå sällan lika bra.

Måste ni ändå använda `<div>`:

```html
<div role="button" tabindex="0"
     onclick="gor()"
     onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();gor()}">
  Lägg i varukorg
</div>
```

---

## Arbetsordning som ger mest effekt per timme

1. `lang` på `<html>` — minuter, stor effekt.
2. Färgkontrast i designtokens — en ändring, hundratals fel borta.
3. Ikonknappar och ikonlänkar i sidhuvud och sidfot — finns på varje sida.
4. Etiketter i kassan och sökrutan — direkt intäktspåverkan.
5. Fokusmarkering och hoppa-till-innehåll — gör tangentbordstestet möjligt.
6. Landmärken och rubriknivåer i grundmallen.
7. Alt-texter, med start på produktbilder.
8. Felhantering i formulär.
9. Modaler och dynamiska annonseringar.
10. Karuseller och media.

Punkt 1–5 tar normalt en till två arbetsdagar och brukar ta bort merparten av de automatiskt
detekterbara felen. Kör skannern igen efter varje punkt och spara resultatet — det är den
dokumentationen som visar att arbetet pågår.
