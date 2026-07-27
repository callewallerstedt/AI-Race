/**
 * Svensk regelordbok för axe-core.
 *
 * Varje post översätter en axe-core-regel till klarspråk på svenska och kopplar
 * den till rätt WCAG-kriterium. Fältet `atgard` ska vara konkret nog att en
 * utvecklare kan agera direkt utan att slå upp något annat.
 *
 * Fält:
 *   namn      – kort rubrik
 *   problem   – vad som faktiskt är fel, i klarspråk
 *   paverkan  – vem som drabbas och hur
 *   atgard    – konkret åtgärd
 *   wcag      – lista med WCAG 2.1-kriterier (nummer + namn)
 */

export const REGLER = {
  'area-alt': {
    namn: 'Bildkarta saknar textalternativ',
    problem: 'Ett <area>-element i en bildkarta saknar alt-text.',
    paverkan: 'Skärmläsare läser upp filnamnet eller ingenting alls, så länken blir omöjlig att förstå.',
    atgard: 'Ge varje <area> ett alt-attribut som beskriver vart länken leder, till exempel <area alt="Kontakta oss">.',
    wcag: ['1.1.1 Innehåll som inte är text', '2.4.4 Syftet med en länk'],
  },
  'aria-allowed-attr': {
    namn: 'Otillåtet ARIA-attribut på elementet',
    problem: 'Ett ARIA-attribut används på ett element där det inte är tillåtet enligt specifikationen.',
    paverkan: 'Hjälpmedel kan tolka elementet fel eller ignorera det helt.',
    atgard: 'Ta bort attributet, eller byt till ett element eller en roll där attributet är tillåtet. Kontrollera mot specifikationen ARIA in HTML.',
    wcag: ['4.1.2 Namn, roll, värde'],
  },
  'aria-allowed-role': {
    namn: 'Otillåten ARIA-roll på elementet',
    problem: 'Elementet har en role som inte är tillåten för den HTML-taggen.',
    paverkan: 'Skärmläsaren annonserar fel typ av komponent, vilket gör gränssnittet förvirrande.',
    atgard: 'Använd rätt semantiskt HTML-element i stället för att skriva över rollen, till exempel <button> i stället för <div role="button">.',
    wcag: ['4.1.2 Namn, roll, värde'],
  },
  'aria-command-name': {
    namn: 'Knapp eller länk med ARIA-roll saknar namn',
    problem: 'Ett element med role="button", "link" eller "menuitem" har inget tillgängligt namn.',
    paverkan: 'Skärmläsaren säger bara "knapp" utan att berätta vad den gör.',
    atgard: 'Lägg till synlig text i elementet, eller sätt aria-label respektive aria-labelledby.',
    wcag: ['4.1.2 Namn, roll, värde'],
  },
  'aria-hidden-body': {
    namn: 'aria-hidden på <body>',
    problem: 'Hela sidan är dold för hjälpmedel med aria-hidden="true".',
    paverkan: 'Skärmläsaranvändare får en helt tom sida. Detta är ett totalstopp.',
    atgard: 'Ta bort aria-hidden från <body>. Använd attributet bara på enskilda dekorativa element.',
    wcag: ['4.1.2 Namn, roll, värde'],
  },
  'aria-hidden-focus': {
    namn: 'Dolt element går att tabba till',
    problem: 'Ett element med aria-hidden="true" innehåller något som går att fokusera med tangentbord.',
    paverkan: 'Tangentbordsanvändare hamnar i en osynlig fokusficka där skärmläsaren inte säger något.',
    atgard: 'Sätt tabindex="-1" på de fokuserbara elementen inuti, eller dölj dem helt med display:none.',
    wcag: ['1.3.1 Information och relationer', '4.1.2 Namn, roll, värde'],
  },
  'aria-input-field-name': {
    namn: 'ARIA-formulärfält saknar namn',
    problem: 'Ett element med en ARIA-roll för inmatning saknar tillgängligt namn.',
    paverkan: 'Användaren hör inte vad som ska fyllas i.',
    atgard: 'Koppla en <label>, eller använd aria-label respektive aria-labelledby.',
    wcag: ['4.1.2 Namn, roll, värde'],
  },
  'aria-required-attr': {
    namn: 'Obligatoriskt ARIA-attribut saknas',
    problem: 'Rollen kräver vissa attribut som inte finns, till exempel aria-checked på role="checkbox".',
    paverkan: 'Hjälpmedlet kan inte berätta komponentens tillstånd.',
    atgard: 'Lägg till de attribut som rollen kräver, och uppdatera dem när tillståndet ändras.',
    wcag: ['4.1.2 Namn, roll, värde'],
  },
  'aria-required-children': {
    namn: 'ARIA-roll saknar nödvändiga barnelement',
    problem: 'En roll som role="list" eller role="tablist" saknar de barnroller den kräver.',
    paverkan: 'Skärmläsaren kan inte annonsera antal och position, till exempel "3 av 7".',
    atgard: 'Lägg till rätt barnroller, eller ta bort föräldrarollen och använd semantisk HTML.',
    wcag: ['1.3.1 Information och relationer'],
  },
  'aria-required-parent': {
    namn: 'ARIA-roll saknar nödvändig förälder',
    problem: 'Ett element med till exempel role="listitem" ligger inte inuti en role="list".',
    paverkan: 'Relationen mellan delarna går förlorad för hjälpmedel.',
    atgard: 'Placera elementet i rätt föräldraroll, eller använd vanlig <ul> med <li>.',
    wcag: ['1.3.1 Information och relationer'],
  },
  'aria-roles': {
    namn: 'Ogiltig ARIA-roll',
    problem: 'Elementet har en role som inte finns i ARIA-specifikationen, ofta ett stavfel.',
    paverkan: 'Rollen ignoreras och elementet presenteras fel.',
    atgard: 'Rätta stavningen eller ta bort rollen.',
    wcag: ['4.1.2 Namn, roll, värde'],
  },
  'aria-toggle-field-name': {
    namn: 'Kryssruta eller reglage saknar namn',
    problem: 'Ett element med role="checkbox", "radio" eller "switch" saknar tillgängligt namn.',
    paverkan: 'Användaren hör "kryssruta, ej ikryssad" utan att veta vad valet gäller.',
    atgard: 'Koppla en <label> eller sätt aria-label.',
    wcag: ['4.1.2 Namn, roll, värde'],
  },
  'aria-valid-attr-value': {
    namn: 'Ogiltigt värde i ARIA-attribut',
    problem: 'Ett ARIA-attribut pekar på ett id som inte finns, eller har ett värde utanför det tillåtna.',
    paverkan: 'Kopplingen mellan element går förlorad. Vanligast är aria-labelledby som pekar fel.',
    atgard: 'Kontrollera att id:t existerar och är unikt, och att värdet är tillåtet för attributet.',
    wcag: ['4.1.2 Namn, roll, värde'],
  },
  'aria-valid-attr': {
    namn: 'Ogiltigt ARIA-attributnamn',
    problem: 'Attributet finns inte i ARIA-specifikationen, ofta ett stavfel som aria-lable.',
    paverkan: 'Attributet ignoreras helt.',
    atgard: 'Rätta stavningen.',
    wcag: ['4.1.2 Namn, roll, värde'],
  },
  'autocomplete-valid': {
    namn: 'Felaktigt autocomplete-värde',
    problem: 'Attributet autocomplete innehåller ett värde som inte är giltigt.',
    paverkan: 'Användare som är beroende av automatisk ifyllnad får ingen hjälp. Detta är ett uttryckligt AA-krav.',
    atgard: 'Använd giltiga värden, till exempel autocomplete="given-name", "email", "postal-code" eller "tel".',
    wcag: ['1.3.5 Identifiera indatasyfte'],
  },
  'avoid-inline-spacing': {
    namn: 'Textavstånd låst med inline-stil',
    problem: 'Rad-, ord- eller teckenavstånd är satt med !important i en inline-stil.',
    paverkan: 'Användare som behöver öka textavståndet för att kunna läsa kan inte göra det.',
    atgard: 'Flytta avståndet till CSS utan !important så att användarens egna stilar kan ta över.',
    wcag: ['1.4.12 Textavstånd'],
  },
  'blink': {
    namn: '<blink>-element',
    problem: 'Sidan innehåller blinkande innehåll via <blink>.',
    paverkan: 'Kan utlösa anfall och gör texten oläsbar för många.',
    atgard: 'Ta bort elementet.',
    wcag: ['2.2.2 Pausa, stoppa, dölj'],
  },
  'button-name': {
    namn: 'Knapp utan text',
    problem: 'En <button> saknar tillgängligt namn. Vanligast när knappen bara innehåller en ikon.',
    paverkan: 'Skärmläsaren säger bara "knapp". Användaren måste gissa vad som händer.',
    atgard: 'Lägg till dold text, till exempel <span class="visually-hidden">Sök</span>, eller aria-label="Sök". Själva ikonen ska ha aria-hidden="true".',
    wcag: ['4.1.2 Namn, roll, värde'],
  },
  'bypass': {
    namn: 'Ingen genväg förbi menyn',
    problem: 'Sidan saknar en hoppa-till-innehåll-länk och korrekta landmärken.',
    paverkan: 'Tangentbordsanvändare måste tabba igenom hela huvudmenyn vid varje sidladdning.',
    atgard: 'Lägg först i <body> en länk <a href="#innehall" class="skip-link">Hoppa till innehåll</a> och ge huvudinnehållet id="innehall". Länken får vara dold tills den får fokus, men måste bli synlig då.',
    wcag: ['2.4.1 Hoppa över återkommande block'],
  },
  'color-contrast': {
    namn: 'För låg kontrast mellan text och bakgrund',
    problem: 'Kontrastförhållandet understiger 4,5:1 för brödtext eller 3:1 för stor text.',
    paverkan: 'Den enskilt vanligaste bristen på svenska webbplatser. Drabbar alla med nedsatt syn, äldre användare och alla som använder mobilen i solljus.',
    atgard: 'Mörka ner textfärgen eller ljusa upp bakgrunden tills förhållandet når 4,5:1, eller 3:1 för text som är minst 24px eller 18,66px halvfet. Ljusgrå text på vitt underkänns nästan alltid.',
    wcag: ['1.4.3 Kontrast (minimum)'],
  },
  'definition-list': {
    namn: 'Felaktig struktur i definitionslista',
    problem: '<dl> innehåller annat än korrekt ordnade par av <dt> och <dd>.',
    paverkan: 'Kopplingen mellan term och beskrivning går förlorad.',
    atgard: 'Se till att <dl> bara innehåller <dt>, <dd> och eventuellt <div> som grupperande element.',
    wcag: ['1.3.1 Information och relationer'],
  },
  'dlitem': {
    namn: '<dt> eller <dd> utanför <dl>',
    problem: 'Ett listelement ligger utanför sin definitionslista.',
    paverkan: 'Strukturen tolkas fel av hjälpmedel.',
    atgard: 'Placera elementet direkt i en <dl>.',
    wcag: ['1.3.1 Information och relationer'],
  },
  'document-title': {
    namn: 'Sidan saknar titel',
    problem: '<title> saknas eller är tom.',
    paverkan: 'Skärmläsaren läser upp titeln allra först. Utan den vet användaren inte vilken sida som öppnats, och flikar blir omöjliga att skilja åt.',
    atgard: 'Ge varje sida en unik, beskrivande <title> med det viktigaste först, till exempel "Kassa – Företaget AB".',
    wcag: ['2.4.2 Sidan har en titel'],
  },
  'duplicate-id-active': {
    namn: 'Dubblerat id på aktivt element',
    problem: 'Två fokuserbara element delar samma id.',
    paverkan: 'Etiketter och ARIA-kopplingar hamnar på fel element.',
    atgard: 'Gör alla id unika. Vanligt fel när en komponent renderas i en loop.',
    wcag: ['4.1.1 Parsning'],
  },
  'duplicate-id-aria': {
    namn: 'Dubblerat id som används av ARIA',
    problem: 'Ett id som refereras av aria-labelledby eller aria-describedby förekommer flera gånger.',
    paverkan: 'Fel text läses upp som etikett.',
    atgard: 'Gör alla id unika.',
    wcag: ['4.1.1 Parsning'],
  },
  'empty-heading': {
    namn: 'Tom rubrik',
    problem: 'Ett rubrikelement saknar text.',
    paverkan: 'Rubriklistan som skärmläsaranvändare navigerar med får tomma poster.',
    atgard: 'Fyll rubriken med text, eller ta bort elementet om det bara används för layout.',
    wcag: ['1.3.1 Information och relationer', '2.4.6 Rubriker och etiketter'],
  },
  'empty-table-header': {
    namn: 'Tom tabellrubrik',
    problem: 'En <th> saknar innehåll.',
    paverkan: 'Kolumnen blir namnlös när tabellen läses cell för cell.',
    atgard: 'Fyll i rubriktexten, eller använd <td> om cellen inte är en rubrik.',
    wcag: ['1.3.1 Information och relationer'],
  },
  'form-field-multiple-labels': {
    namn: 'Formulärfält med flera etiketter',
    problem: 'Samma fält har mer än en <label>.',
    paverkan: 'Olika hjälpmedel läser olika etiketter, eller bara en av dem.',
    atgard: 'Använd en enda <label> och lägg eventuell extra hjälptext i aria-describedby.',
    wcag: ['1.3.1 Information och relationer', '3.3.2 Ledtexter eller instruktioner'],
  },
  'frame-title': {
    namn: '<iframe> saknar titel',
    problem: 'En inbäddad ram saknar attributet title.',
    paverkan: 'Skärmläsaren säger bara "ram". Vanligt för inbäddade kartor, videor och betalfönster.',
    atgard: 'Lägg till title som beskriver innehållet, till exempel title="Karta till butiken". Helt dekorativa ramar kan i stället döljas med aria-hidden.',
    wcag: ['2.4.1 Hoppa över återkommande block', '4.1.2 Namn, roll, värde'],
  },
  'heading-order': {
    namn: 'Rubriknivåer hoppar över steg',
    problem: 'Rubrikerna går till exempel från <h2> direkt till <h4>.',
    paverkan: 'Användare som navigerar mellan rubriker tappar dokumentets struktur.',
    atgard: 'Använd nivåerna i ordning. Välj rubriknivå efter struktur, inte efter hur stor texten ska se ut. Styr storleken med CSS.',
    wcag: ['1.3.1 Information och relationer'],
  },
  'html-has-lang': {
    namn: 'Språk saknas på sidan',
    problem: '<html> saknar attributet lang.',
    paverkan: 'Skärmläsaren läser svensk text med engelskt uttal, vilket ofta blir helt obegripligt.',
    atgard: 'Sätt <html lang="sv">. En enda rad med mycket stor effekt.',
    wcag: ['3.1.1 Sidans språk'],
  },
  'html-lang-valid': {
    namn: 'Ogiltig språkkod',
    problem: 'Attributet lang innehåller ingen giltig BCP 47-kod.',
    paverkan: 'Språkvalet ignoreras och uttalet blir fel.',
    atgard: 'Använd en giltig kod, till exempel lang="sv" eller lang="sv-SE".',
    wcag: ['3.1.1 Sidans språk'],
  },
  'html-xml-lang-mismatch': {
    namn: 'lang och xml:lang stämmer inte överens',
    problem: 'De två språkattributen anger olika språk.',
    paverkan: 'Hjälpmedel kan välja fel talsyntes.',
    atgard: 'Sätt samma språkkod i båda attributen.',
    wcag: ['3.1.1 Sidans språk'],
  },
  'image-alt': {
    namn: 'Bild saknar alt-text',
    problem: '<img> saknar attributet alt.',
    paverkan: 'Skärmläsaren läser upp filnamnet. På en produktsida betyder det att kunden hör "IMG_20841.jpg" i stället för vad varan är.',
    atgard: 'Beskriv vad bilden förmedlar, till exempel alt="Blå damkappa i ull, knälång". Är bilden rent dekorativ ska den ha tomt alt="". Utelämna aldrig attributet helt.',
    wcag: ['1.1.1 Innehåll som inte är text'],
  },
  'image-redundant-alt': {
    namn: 'Alt-texten upprepar intilliggande text',
    problem: 'Bildens alt-text är identisk med texten bredvid.',
    paverkan: 'Användaren hör samma sak två gånger.',
    atgard: 'Sätt alt="" på bilden när den intilliggande texten redan förmedlar samma sak.',
    wcag: ['1.1.1 Innehåll som inte är text'],
  },
  'input-button-name': {
    namn: 'Formulärknapp saknar text',
    problem: '<input> av typen submit, button eller reset saknar value eller tillgängligt namn.',
    paverkan: 'Användaren vet inte vad knappen gör.',
    atgard: 'Sätt value="Skicka" eller aria-label.',
    wcag: ['4.1.2 Namn, roll, värde'],
  },
  'input-image-alt': {
    namn: 'Bildknapp saknar alt-text',
    problem: '<input type="image"> saknar alt.',
    paverkan: 'En knapp helt utan namn. Ofta är det just sökknappen.',
    atgard: 'Lägg till alt som beskriver handlingen, till exempel alt="Sök".',
    wcag: ['1.1.1 Innehåll som inte är text', '4.1.2 Namn, roll, värde'],
  },
  'label': {
    namn: 'Formulärfält saknar etikett',
    problem: 'Ett inmatningsfält har ingen kopplad <label>.',
    paverkan: 'Den näst vanligaste allvarliga bristen. I en kassa betyder det att kunden inte vet vilket fält som är postnummer och vilket som är telefonnummer. Det stoppar köp.',
    atgard: 'Använd <label for="postnr">Postnummer</label> tillsammans med <input id="postnr">. En placeholder är inte en etikett, eftersom den försvinner så fort användaren börjar skriva.',
    wcag: ['1.3.1 Information och relationer', '3.3.2 Ledtexter eller instruktioner', '4.1.2 Namn, roll, värde'],
  },
  'landmark-one-main': {
    namn: 'Saknar landmärket <main>',
    problem: 'Sidan har inget unikt huvudinnehållsområde.',
    paverkan: 'Skärmläsaranvändare kan inte hoppa direkt till innehållet.',
    atgard: 'Omslut huvudinnehållet med <main>. Exakt ett per sida.',
    wcag: ['1.3.1 Information och relationer'],
  },
  'landmark-unique': {
    namn: 'Landmärken går inte att skilja åt',
    problem: 'Flera landmärken av samma typ saknar unika namn.',
    paverkan: 'Användaren får en lista med flera identiska "navigation" och vet inte vilken som är vilken.',
    atgard: 'Ge dem namn, till exempel <nav aria-label="Huvudmeny"> och <nav aria-label="Sidfot">.',
    wcag: ['1.3.1 Information och relationer'],
  },
  'link-in-text-block': {
    namn: 'Länk i löpande text urskiljs bara med färg',
    problem: 'Länken skiljer sig från omgivande text enbart genom färg, med för låg kontrast dem emellan.',
    paverkan: 'Färgblinda användare ser inte att det är en länk.',
    atgard: 'Stryk under länkar i brödtext, eller se till att kontrasten mot omgivande text är minst 3:1 plus en visuell markering vid hovring och fokus.',
    wcag: ['1.4.1 Användning av färg'],
  },
  'link-name': {
    namn: 'Länk utan text',
    problem: 'En <a> saknar tillgängligt namn. Vanligt för ikonlänkar till sociala medier och för logotypen i sidhuvudet.',
    paverkan: 'Skärmläsaren läser upp webbadressen tecken för tecken, eller säger bara "länk".',
    atgard: 'Lägg till dold text eller aria-label="Till startsidan". Undvik "läs mer" som enda länktext.',
    wcag: ['2.4.4 Syftet med en länk', '4.1.2 Namn, roll, värde'],
  },
  'list': {
    namn: 'Felaktigt innehåll i lista',
    problem: '<ul> eller <ol> innehåller annat än <li> som direkta barn.',
    paverkan: 'Antalet poster annonseras fel, till exempel "lista med 0 objekt".',
    atgard: 'Låt bara <li> ligga direkt i listan. Omslut annat innehåll i en <li>.',
    wcag: ['1.3.1 Information och relationer'],
  },
  'listitem': {
    namn: '<li> utanför lista',
    problem: 'Ett listobjekt ligger inte i <ul> eller <ol>.',
    paverkan: 'Listrelationen går förlorad.',
    atgard: 'Placera elementet i en riktig lista.',
    wcag: ['1.3.1 Information och relationer'],
  },
  'marquee': {
    namn: '<marquee>-element',
    problem: 'Sidan innehåller rörlig text som inte går att stoppa.',
    paverkan: 'Omöjlig att läsa för många, och kan utlösa besvär.',
    atgard: 'Ta bort elementet.',
    wcag: ['2.2.2 Pausa, stoppa, dölj'],
  },
  'meta-refresh': {
    namn: 'Automatisk omladdning av sidan',
    problem: '<meta http-equiv="refresh"> laddar om eller vidarebefordrar automatiskt.',
    paverkan: 'Användare som läser långsamt hinner inte klart innan sidan byts ut.',
    atgard: 'Ta bort taggen. Använd omdirigering på serversidan (301 eller 302) om du behöver skicka vidare besökaren.',
    wcag: ['2.2.1 Justerbar tidsbegränsning'],
  },
  'meta-viewport': {
    namn: 'Zoom är blockerad',
    problem: 'Taggen viewport anger user-scalable=no eller maximum-scale under 2.',
    paverkan: 'Användare med nedsatt syn kan inte zooma på mobilen. Mycket vanligt och mycket lätt att åtgärda.',
    atgard: 'Använd <meta name="viewport" content="width=device-width, initial-scale=1"> och ta bort user-scalable och maximum-scale.',
    wcag: ['1.4.4 Ändring av textstorlek'],
  },
  'nested-interactive': {
    namn: 'Klickbart element inuti klickbart element',
    problem: 'Till exempel en <button> inuti en <a>.',
    paverkan: 'Skärmläsare och tangentbord hanterar det olika, och det inre elementet blir ofta onåbart.',
    atgard: 'Placera elementen bredvid varandra i stället för inuti varandra.',
    wcag: ['4.1.2 Namn, roll, värde'],
  },
  'no-autoplay-audio': {
    namn: 'Ljud startar automatiskt',
    problem: 'Ljud spelas i mer än tre sekunder utan att användaren har startat det.',
    paverkan: 'Överröstar skärmläsaren helt, så att sidan blir oanvändbar.',
    atgard: 'Starta inte ljud automatiskt, eller erbjud en tydlig paus- och stoppknapp först i tabbordningen.',
    wcag: ['1.4.2 Ljudkontroll'],
  },
  'object-alt': {
    namn: '<object> saknar textalternativ',
    problem: 'Inbäddat objekt saknar beskrivande text.',
    paverkan: 'Innehållet är osynligt för hjälpmedel.',
    atgard: 'Lägg alternativtext inuti <object>, eller sätt title.',
    wcag: ['1.1.1 Innehåll som inte är text'],
  },
  'p-as-heading': {
    namn: 'Stycke används som rubrik',
    problem: 'Ett <p> är formaterat med fet eller stor stil och fungerar visuellt som en rubrik.',
    paverkan: 'Rubriken syns för seende men saknas i skärmläsarens rubriklista.',
    atgard: 'Använd ett riktigt rubrikelement och styr utseendet med CSS.',
    wcag: ['1.3.1 Information och relationer'],
  },
  'page-has-heading-one': {
    namn: 'Sidan saknar <h1>',
    problem: 'Ingen huvudrubrik finns.',
    paverkan: 'Användaren får ingen ingång till vad sidan handlar om. Påverkar även sökmotorer.',
    atgard: 'Ge varje sida exakt en <h1> som beskriver sidans syfte.',
    wcag: ['1.3.1 Information och relationer', '2.4.6 Rubriker och etiketter'],
  },
  'region': {
    namn: 'Innehåll ligger utanför landmärken',
    problem: 'Delar av sidan ligger inte inuti <header>, <nav>, <main>, <aside> eller <footer>.',
    paverkan: 'Användare som navigerar region för region missar innehållet.',
    atgard: 'Strukturera sidan med semantiska landmärken så att allt synligt innehåll hamnar i något av dem.',
    wcag: ['1.3.1 Information och relationer'],
  },
  'role-img-alt': {
    namn: 'role="img" saknar textalternativ',
    problem: 'Ett element som annonseras som bild saknar namn. Vanligt för SVG-ikoner infogade direkt i koden.',
    paverkan: 'Skärmläsaren säger "bild" utan innehåll.',
    atgard: 'Lägg till aria-label, eller sätt aria-hidden="true" om ikonen är dekorativ.',
    wcag: ['1.1.1 Innehåll som inte är text'],
  },
  'scope-attr-valid': {
    namn: 'Felaktigt scope-attribut i tabell',
    problem: 'scope har ett annat värde än row, col, rowgroup eller colgroup.',
    paverkan: 'Kopplingen mellan rubrik och celler blir fel.',
    atgard: 'Använd scope="col" eller scope="row" på <th>.',
    wcag: ['1.3.1 Information och relationer'],
  },
  'scrollable-region-focusable': {
    namn: 'Rullningsbart område går inte att nå med tangentbord',
    problem: 'Ett område med overflow går att rulla med mus men inte med tangentbord.',
    paverkan: 'Tangentbordsanvändare kommer inte åt innehållet.',
    atgard: 'Ge området tabindex="0" och ett tillgängligt namn.',
    wcag: ['2.1.1 Tangentbord'],
  },
  'select-name': {
    namn: 'Rullgardinsmeny saknar etikett',
    problem: '<select> har ingen kopplad <label>.',
    paverkan: 'Användaren vet inte vad valet gäller, till exempel storlek eller antal i en kassa.',
    atgard: 'Koppla en <label for>, eller sätt aria-label.',
    wcag: ['4.1.2 Namn, roll, värde'],
  },
  'server-side-image-map': {
    namn: 'Serverbaserad bildkarta',
    problem: 'Attributet ismap används, vilket kräver muspekare.',
    paverkan: 'Omöjlig att använda med tangentbord.',
    atgard: 'Byt till klientbaserad bildkarta med <area>, eller till vanliga länkar.',
    wcag: ['2.1.1 Tangentbord'],
  },
  'svg-img-alt': {
    namn: 'SVG med bildroll saknar text',
    problem: 'En <svg role="img"> saknar <title> eller aria-label.',
    paverkan: 'Ikoner och logotyper blir namnlösa.',
    atgard: 'Lägg <title> först i SVG-koden, eller sätt aria-label. Dekorativa SVG:er får aria-hidden="true".',
    wcag: ['1.1.1 Innehåll som inte är text'],
  },
  'target-size': {
    namn: 'För liten klickyta',
    problem: 'Ett klickbart element är mindre än 24 × 24 CSS-pixlar och ligger för tätt intill andra.',
    paverkan: 'Svårt att träffa för användare med darrningar, och på mobil.',
    atgard: 'Öka ytan till minst 24 × 24 pixlar, gärna 44 × 44, med padding i stället för marginal.',
    wcag: ['2.5.8 Målstorlek (minimum) – WCAG 2.2'],
  },
  'td-has-header': {
    namn: 'Datacell saknar rubrik',
    problem: 'I en stor tabell saknar cellen koppling till en rubrikcell.',
    paverkan: 'Värdet läses utan sammanhang: "1 495" utan att användaren hör vilken kolumn det gäller.',
    atgard: 'Använd <th> med scope, eller attributet headers på cellerna.',
    wcag: ['1.3.1 Information och relationer'],
  },
  'td-headers-attr': {
    namn: 'Attributet headers pekar fel',
    problem: 'headers refererar till id som inte finns i samma tabell.',
    paverkan: 'Kopplingen bryts.',
    atgard: 'Kontrollera att varje id i headers finns på en <th> i tabellen.',
    wcag: ['1.3.1 Information och relationer'],
  },
  'th-has-data-cells': {
    namn: 'Rubrikcell utan dataceller',
    problem: 'En <th> har inga celler kopplade till sig.',
    paverkan: 'Tabellstrukturen tolkas fel.',
    atgard: 'Se över tabellens struktur, eller använd <td> om cellen inte är en rubrik.',
    wcag: ['1.3.1 Information och relationer'],
  },
  'valid-lang': {
    namn: 'Ogiltig språkkod på element',
    problem: 'Ett lang-attribut inne i sidan har en ogiltig kod.',
    paverkan: 'Språkväxling mitt i texten fungerar inte.',
    atgard: 'Använd giltiga koder, till exempel <span lang="en">customer service</span>.',
    wcag: ['3.1.2 Språk för delar av sidan'],
  },
  'video-caption': {
    namn: 'Video saknar undertexter',
    problem: '<video> har inget <track kind="captions">.',
    paverkan: 'Döva och hörselskadade utestängs från innehållet. Gäller även produktfilmer.',
    atgard: 'Lägg till en undertextfil: <track kind="captions" srclang="sv" src="undertexter.vtt" label="Svenska">.',
    wcag: ['1.2.2 Textalternativ (inspelat)'],
  },
};

/** Allvarlighetsgrad från axe-core, översatt. */
export const ALLVAR = {
  critical: { etikett: 'Kritisk', ordning: 0 },
  serious: { etikett: 'Allvarlig', ordning: 1 },
  moderate: { etikett: 'Måttlig', ordning: 2 },
  minor: { etikett: 'Mindre', ordning: 3 },
};

/**
 * Hämtar svensk text för en regel. Faller tillbaka på axe-cores egen
 * beskrivning om regeln inte finns i ordboken, och markerar det tydligt
 * så att rapporten aldrig låter mer heltäckande än den är.
 */
export function slaUppRegel(violation) {
  const post = REGLER[violation.id];
  if (post) return { ...post, oversatt: true };
  return {
    namn: violation.help || violation.id,
    problem: violation.description || '',
    paverkan: '',
    atgard: 'Se axe-cores dokumentation för denna regel: ' + (violation.helpUrl || ''),
    wcag: (violation.tags || [])
      .filter((t) => /^wcag\d/.test(t))
      .map((t) => t.replace(/^wcag/, 'WCAG ')),
    oversatt: false,
  };
}
