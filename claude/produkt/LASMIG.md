# Tillgänglighetspaketet

Allt ni behöver för att komma igång med tillgänglighetslagen (2023:254) — verktyget som mäter,
kunskapen som förklarar, och mallarna som dokumenterar.

## Så här kommer ni igång

**Steg 1 — förstå vad som gäller er.** Läs `dokument/01-juridisk-oversikt.md`. Tar tio minuter och
besvarar om ni omfattas, av vad, och vem som utövar tillsyn.

**Steg 2 — mät nuläget.** Följ `tillganglighetskollen/LASMIG.md`. Kör skannern på era viktigaste
sidmallar och spara rapporten med dagens datum i filnamnet. Det är er nollmätning.

**Steg 3 — rätta felen.** `dokument/04-utvecklarguide-atgarder.md` visar kod före och efter för varje
vanligt fel, i den ordning som ger mest effekt per timme.

**Steg 4 — granska det maskinen inte ser.** `dokument/02-checklista-wcag-2.1-aa.md`. Börja med
kassan.

**Steg 5 — publicera lagkravet ni troligen missat.** `dokument/03-tillganglighetsredogorelse-mall.md`.
Att publicera information om tjänstens tillgänglighet är ett eget krav enligt 25 § i lagen.

**Steg 6 — dokumentera att arbetet pågår.** `dokument/05-efterlevnadsplan-mall.md`. Mät om varje
månad med `--jamfor` mot förra mätningen och för in resultatet i planen.

## Innehåll

```
tillganglighetskollen/     Skannern
  skanna.mjs               Verktyget — kör detta
  LASMIG.md                Fullständig dokumentation
  exempel/                 Demosida med avsiktliga fel + färdig exempelrapport
  src/regler-sv.js         Svensk regelordbok, redigerbar
  src/rapport.js           Rapportgenerator

dokument/
  01-juridisk-oversikt.md              Vad lagen kräver, vem den gäller, sanktioner
  02-checklista-wcag-2.1-aa.md         Manuell granskning, 6 avsnitt, 38 kontroller
  03-tillganglighetsredogorelse-mall.md Lagkravet enligt 25 § — ifyllbar mall
  04-utvecklarguide-atgarder.md        15 vanliga fel med kod före och efter
  05-efterlevnadsplan-mall.md          Dokumentation för tillsyn
```

## En ärlig avgränsning

Det här paketet gör er inte automatiskt lagenliga, och det påstår inte det.

Automatiserad testning täcker ungefär en tredjedel av kriterierna i WCAG 2.1 AA. Resten kräver
manuell granskning, och det är därför checklistan finns med. Paketet ger er mätning, kunskap och
struktur — själva rättningarna måste göras i er kod.

Det är också värt att veta att en fullständig manuell WCAG-granskning av en företagswebbplats med
10–15 sidmallar normalt kostar 30 000–60 000 kronor på den svenska marknaden. Behöver ni ett
formellt granskningsintyg är det den vägen ni ska gå. Det här paketet är till för att ni ska komma
igång, komma långt på egen hand, och kunna visa att arbetet pågår.

## Support

Frågor om paketet besvaras via e-post. Uppdateringar av regelordboken och mallarna ingår.
