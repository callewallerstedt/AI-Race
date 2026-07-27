#!/usr/bin/env bash
# Bygger leveranspaketet som skickas till kund efter köp.
#
#   ./bygg-leverans.sh [enskild|byra]
#
# Resultat: leverans/Tillganglighetspaketet-<licens>-<datum>.zip
#
# Zip-filen innehåller ingen node_modules — kunden kör npm install själv, vilket
# står i LASMIG.md. Det håller filen under någon megabyte så den går att mejla.

set -euo pipefail

LICENS="${1:-enskild}"
HAR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROT="$(dirname "$HAR")"
DATUM="$(date +%Y-%m-%d)"
UT="$HAR/leverans"
BYGG="$(mktemp -d)"
NAMN="Tillganglighetspaketet"

case "$LICENS" in
  enskild) LICENSTEXT="Enskild licens – ett företag, en webbplats." ;;
  byra)    LICENSTEXT="Byrålicens – obegränsat antal kunduppdrag." ;;
  *) echo "Ange 'enskild' eller 'byra'." >&2; exit 1 ;;
esac

mkdir -p "$BYGG/$NAMN" "$UT"

cp -r "$ROT/produkt/tillganglighetskollen" "$BYGG/$NAMN/"
rm -rf "$BYGG/$NAMN/tillganglighetskollen/node_modules" \
       "$BYGG/$NAMN/tillganglighetskollen/package-lock.json"
rm -f  "$BYGG/$NAMN/tillganglighetskollen/rapport."{html,json,csv} 2>/dev/null || true

cp -r "$ROT/produkt/dokument" "$BYGG/$NAMN/"
cp "$ROT/produkt/LASMIG.md" "$ROT/produkt/LICENS.md" "$BYGG/$NAMN/"

cat > "$BYGG/$NAMN/BORJA-HAR.txt" <<TXT
Tillgänglighetspaketet
Levererat $DATUM
$LICENSTEXT

Börja med LASMIG.md. Den tar dig genom de sex stegen i rätt ordning.

Har du bråttom:
  1. cd tillganglighetskollen
  2. npm install
  3. npm run installera-webblasare
  4. node skanna.mjs -o "Ert Företag AB" https://er-webbplats.se
  5. Öppna rapport.html

Vill du se hur en färdig rapport ser ut innan du kör något, öppna
tillganglighetskollen/exempel/exempelrapport.html

Frågor besvaras via e-post. Uppdateringar under tolv månader ingår.
TXT

FIL="$UT/$NAMN-$LICENS-$DATUM.zip"
rm -f "$FIL"
(cd "$BYGG" && zip -rq "$FIL" "$NAMN")
rm -rf "$BYGG"

echo "Klart: $FIL"
echo "Storlek: $(du -h "$FIL" | cut -f1)"
