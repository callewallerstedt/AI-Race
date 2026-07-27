# Tillgänglighetslagen i korthet

En sammanfattning av vad lagen kräver, vem den gäller och vad ni faktiskt måste göra.

> Det här är ett faktaunderlag, inte juridisk rådgivning. Vid osäkerhet om er specifika situation
> bör ni stämma av med jurist eller direkt med tillsynsmyndigheten.

---

## 1. Vad heter lagen

I Sverige heter den **lagen (2023:254) om vissa produkters och tjänsters tillgänglighet**, ofta
förkortad **LPTT** och i dagligt tal kallad tillgänglighetslagen. Den kompletteras av
**förordningen (2023:676)**.

Lagen genomför **EU:s tillgänglighetsdirektiv 2019/882**, som på engelska kallas *European
Accessibility Act* (EAA). Samma krav gäller därför i hela EU, även om varje medlemsstat har egna
sanktionsregler.

**Kraven gäller sedan den 28 juni 2025.** Det finns ingen ytterligare övergångstid för nya tjänster.

---

## 2. Vem omfattas

Lagen gäller **konsumentriktade** produkter och tjänster inom ett antal utpekade områden. För
webbplatser och appar är de mest relevanta:

- **E-handel** — alla tjänster där en konsument kan ingå avtal om en vara eller tjänst på distans
- **Banktjänster** för konsumenter
- **Elektroniska kommunikationstjänster**
- **Passagerartransport** — biljetter, reseinformation, appar
- **Tjänster som ger åtkomst till audiovisuella medier**
- **E-böcker och särskild programvara för dem**

### Undantaget för mikroföretag

Ett företag med **färre än 10 anställda** *och* en **årsomsättning eller balansomslutning på högst
2 miljoner euro** är undantaget från kraven **på tjänster**.

Tre saker missförstås ofta här:

1. Undantaget gäller **inte produkter**. Säljer ni fysiska produkter som omfattas kvarstår kraven.
2. Båda villkoren måste vara uppfyllda. 12 anställda och låg omsättning ger inget undantag.
3. Undantaget upphör **direkt** när ni växer förbi gränsen. Det finns ingen inkörsperiod.

Är ni nära gränsen bör ni bygga tillgängligt ändå. Kostnaden att rätta i efterhand är alltid högre
än att göra rätt från början.

---

## 3. Vilken standard gäller

Den harmoniserade europeiska standarden är **EN 301 549**, som för webbinnehåll bygger på
**WCAG 2.1 nivå AA**.

WCAG 2.2 finns publicerad men är i skrivande stund ännu inte införlivad i den harmoniserade
standarden. **WCAG 2.1 AA är därför den nivå ni ska mäta mot.** Att uppfylla 2.2 är aldrig fel — den
är bakåtkompatibel — men det är 2.1 AA som är den rättsliga måttstocken i dag.

WCAG 2.1 AA innehåller 50 kriterier ordnade under fyra principer: innehållet ska vara
**möjligt att uppfatta**, **hanterbart**, **begripligt** och **robust**.

---

## 4. Vad ni konkret måste göra

### 4.1 Tjänsten ska uppfylla tillgänglighetskraven

Webbplatsen, appen och hela köpflödet ska följa EN 301 549 / WCAG 2.1 AA.

### 4.2 Ni ska publicera information om tjänstens tillgänglighet

Detta är ett **självständigt lagkrav** som många missar helt. Enligt **25 § lagen (2023:254)** och
**24 § förordningen (2023:676)** ska en tjänsteleverantör lämna information om hur tjänsten uppfyller
tillgänglighetskraven.

Informationen ska finnas tillgänglig för allmänheten, i skriftlig och muntlig form, och själv vara
tillgänglig för personer med funktionsnedsättning.

Mallen i `03-tillganglighetsredogorelse-mall.md` täcker detta.

### 4.3 Ni ska kunna visa att arbetet pågår

Tillsynsmyndigheterna har i praktiken agerat med vägledning först och sanktioner därefter. Det som
efterfrågas är ett **dokumenterat och fortlöpande arbete** — inte en perfekt webbplats över natten.
Det gör att sparade, daterade mätningar och en åtgärdsplan har ett direkt värde vid en tillsyn.

Mallen i `05-efterlevnadsplan-mall.md` täcker detta.

---

## 5. Vem utövar tillsyn

| Myndighet | Ansvarsområde |
|---|---|
| **PTS** (Post- och telestyrelsen) | Marknadskontroll för **samtliga produkter**, samt tillsyn över **e-handel**, **banktjänster** och **elektroniska kommunikationstjänster**. PTS samordnar också ärenden som berör flera myndigheter. |
| **Mediemyndigheten** | Tjänster som ger åtkomst till audiovisuella medier |
| **Konsumentverket** | Delar av passagerartransport: webbplatser, appar, elektroniska biljetter |
| **Transportstyrelsen** | Delar av passagerartransport: information via interaktiva självbetjäningsterminaler |
| **MTM** (Myndigheten för tillgängliga medier) | E-böcker |

**Driver ni e-handel är PTS er tillsynsmyndighet.**

---

## 6. Sanktioner

PTS kan förelägga en verksamhetsutövare att åtgärda en brist, och kan förena föreläggandet med vite.
PTS kan också besluta om **sanktionsavgift**.

**Sanktionsavgiften bestäms till mellan 10 000 och 10 000 000 kronor**, utifrån överträdelsens
allvar och omfattning samt övriga omständigheter. Avgiften ska betalas inom trettio dagar från det
att beslutet vunnit laga kraft.

En sanktionsavgift får inte beslutas för en överträdelse som redan omfattas av ett vitesföreläggande
som ligger till grund för en ansökan om utdömande av vitet.

Två saker är värda att notera:

- Spannet är brett. Avgiften ska stå i proportion till bristen, så en enskild mindre brist på en
  liten webbplats ligger inte i toppen av skalan.
- Den reella risken på kort sikt är oftast inte avgiften i sig, utan ett föreläggande med tidsfrist
  som tvingar fram ett brådskande och därmed dyrt utvecklingsarbete.

---

## 7. Anmälningar

Konsumenter kan anmäla en tjänst som de anser inte uppfyller kraven. Handikapp- och
funktionsrättsorganisationer bevakar området aktivt. Det innebär i praktiken att tillsyn ofta
initieras utifrån, inte genom slumpmässiga kontroller — och att de mest synliga bristerna på de mest
använda sidorna är de som först uppmärksammas.

Det är också ett argument för att prioritera rätt: börja med startsida, sök, produktsida, varukorg
och kassa. Det är där både kunder och anmälningar uppstår.

---

## 8. Vanliga missuppfattningar

**"Vi har en tillgänglighetsöverlagring, alltså är vi klara."**
Automatiska överlagringswidgetar åtgärdar inte underliggande kodfel och har återkommande kritiserats
av användare av hjälpmedel. De ersätter inte ett rättat gränssnitt.

**"Vår automatiska skanning visar noll fel, alltså uppfyller vi lagen."**
Automatiserad testning täcker ungefär en tredjedel av kriterierna. Noll automatiska fel är en bra
start, inte ett kvitto.

**"Det gäller bara offentlig sektor."**
Det var sant före den 28 juni 2025. DOS-lagen gäller offentlig sektor; LPTT gäller privata aktörer
inom de utpekade områdena.

**"Vi säljer bara till företag, alltså omfattas vi inte."**
Rent B2B-handel utan konsumentförsäljning faller normalt utanför. Men om konsumenter kan handla hos
er över huvud taget omfattas tjänsten.

**"Vi använder en standardplattform, så ansvaret ligger hos leverantören."**
Ansvaret för tjänsten ligger hos er som tillhandahåller den. Plattformen kan vara tillgänglig i
grunden och ändå bli otillgänglig genom er tema-anpassning, era appar och ert innehåll.

---

## 9. Var man börjar

1. Kör en automatiserad mätning av era viktigaste sidmallar och spara resultatet med datum.
2. Rätta de kritiska och allvarliga felen. De är oftast få, återkommande och snabba att åtgärda.
3. Gå igenom den manuella checklistan för minst startsida, produktsida och kassa.
4. Publicera information om tjänstens tillgänglighet.
5. Skriv ner en åtgärdsplan med ansvarig och tidplan.
6. Mät om, och spara jämförelsen.

Steg 1, 2 och 6 stöds direkt av verktyget i det här paketet. Steg 3, 4 och 5 av de medföljande
mallarna.

---

## Källor

- Lag (2023:254) om vissa produkters och tjänsters tillgänglighet — Sveriges riksdag
- Förordning (2023:676) om vissa produkters och tjänsters tillgänglighet
- PTS: Lagen om vissa produkters och tjänsters tillgänglighet, samt PTS tillsyn av lagkraven
- Mediemyndigheten: Nya krav på att vissa produkter och tjänster ska vara tillgängliga
- EU-direktiv 2019/882 (European Accessibility Act)
- EN 301 549 / WCAG 2.1 AA
