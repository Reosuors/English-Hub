#!/usr/bin/env bash
# Publish one built asset to the GitHub Release for this version.
# Usage: bash scripts/publish-release.sh VERSION LOCAL_FILE ASSET_NAME
# Permanent links: https://github.com/<owner>/<repo>/releases/latest/download/<ASSET_NAME>
set -uo pipefail
VERSION="$1"; FILE="$2"; NAME="$3"
TAG="v$VERSION"
ALL_ASSETS="EnglishHub.apk EnglishHub-Web.zip EnglishHub-Setup.exe EnglishHub.dmg"
export GH_REPO="${GITHUB_REPOSITORY}"

STAGE="$(mktemp -d)"
cp "$FILE" "$STAGE/$NAME"

for attempt in 1 2 3 4 5; do
  if gh release view "$TAG" >/dev/null 2>&1; then break; fi
  PREV="$(gh release view --json tagName -q .tagName 2>/dev/null || true)"
  if gh release create "$TAG" --title "English Hub $VERSION" --target "$GITHUB_SHA" --latest=false \
       --notes "English Hub $VERSION — Android (EnglishHub.apk), Windows (EnglishHub-Setup.exe), Mac (EnglishHub.dmg), Web source (EnglishHub-Web.zip). Web app: https://english-hub.sites.tab.bot/ | Download page: https://english-hub-download.sites.tab.bot/"; then
    if [ -n "$PREV" ] && [ "$PREV" != "$TAG" ]; then
      SEED="$(mktemp -d)"
      for a in $ALL_ASSETS; do
        [ "$a" = "$NAME" ] && continue
        gh release download "$PREV" -D "$SEED" -p "$a" >/dev/null 2>&1 || continue
        gh release upload "$TAG" "$SEED/$a" >/dev/null 2>&1 || true
      done
      rm -rf "$SEED"
    fi
    break
  fi
  sleep $((attempt * 5))
done

ok=0
for attempt in 1 2 3 4 5; do
  if gh release upload "$TAG" "$STAGE/$NAME" --clobber; then ok=1; break; fi
  sleep $((attempt * 10))
done
[ "$ok" = 1 ] || { echo "upload of $NAME to $TAG failed"; rm -rf "$STAGE"; exit 1; }
rm -rf "$STAGE"

# Give GitHub API a brief moment, then mark release Latest once all 4 assets are present.
sleep 3
HAVE="$(gh release view "$TAG" --json assets -q '.assets[].name' 2>/dev/null || true)"
missing=0
for a in $ALL_ASSETS; do echo "$HAVE" | grep -qx "$a" || missing=1; done
if [ "$missing" = 0 ]; then
  gh release edit "$TAG" --latest >/dev/null && echo "$TAG is now Latest"
else
  echo "Uploaded $NAME to $TAG (waiting on remaining assets before marking Latest)"
fi
echo "Published $NAME to $TAG"
