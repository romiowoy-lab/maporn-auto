# Maporn Autogroup website — handoff notes

Working notes so any machine (or a new Claude session) can pick up where the last one stopped.
Last updated: 30 Oct 2026.

## Starting on a machine

```bash
git pull origin main
npm install          # needed after dependency changes (Next.js 16.4.3 security upgrade, sharp 0.35.5)
npm run dev          # http://localhost:3000
```

Node 20+ (developed on Node 24). Before committing: `npx tsc --noEmit`, `npx eslint <changed files>`, and `npm run build` when touching routing/config.

## Stack

- Next.js 16 App Router (Turbopack) — read `node_modules/next/dist/docs/` before using unfamiliar APIs (see AGENTS.md)
- React 19, Tailwind v4, framer-motion, next/image, font Kanit
- Repo: github.com/romiowoy-lab/maporn-auto, branch `main`
- Image processing is done with `sharp` from small Node scripts (resize → WebP, trim, cutouts on studio backgrounds). New image files get new names so browsers don't serve a cached old one.

## Deploy (Hostatom Plesk — the owner deploys by hand)

1. Git → **Pull now** → **Deploy now** twice
2. Node.js → **NPM install** (only when package.json changed) → **Run script: build** (wait for the page list, no errors)
3. **Restart App**
4. Ctrl+F5 in the browser

Plesk paths: Application Root `/MapornAutoGroup.com`, **Document Root `/MapornAutoGroup.com/public`** (changed after the Oct 2026 hack so source files are no longer served — `/package.json` must return 404).

## Security status (Oct 2026)

- Site was attacked; repo and live site were audited: no foreign commits, no injected scripts, Next.js upgraded to 16.4.3 (critical RCE fixes), npm audit 0 vulnerabilities.
- Still recommended to the owner, not confirmed done: rotate Plesk / FTP / DB / email passwords + enable 2FA, ask Hostatom for an incident report, switch Plesk Node to an LTS version (22/24), consider moving hosting to Vercel.

## Where things live

| What | Where |
|---|---|
| Branches / showrooms (address, phone, LINE, Facebook, Maps, department phones) | `src/lib/data/branches.ts` |
| Company contacts, showroom/service counts (8 / 9) | `src/lib/data/company.ts` |
| Models, trims, prices (`campaignPrice` = central campaign price) | `src/lib/data/models.ts` |
| Wuling Darion / Porta data | `src/lib/data/wuling-darion.ts`, `wuling-porta.ts` |
| Homepage brand cards + showroom tiles | `src/app/page.tsx` (`BENTO_UNITS`, `BRANCH_BRAND_TILES`) |
| Header brand logos (equal visual area sizing) | `src/components/layout/Header.tsx` (`BRAND_STRIP`) |
| Brand showrooms | `src/components/brands/<brand>/` |
| Phone links (`02-322-3663-5` dials the first number) | `telHref` in `src/lib/utils.ts` |

Brand order everywhere: OMODA | JAECOO, GWM, Suzuki, Lepas, Wuling, Farizon, Suzy Fix. NEX was removed entirely.

## Client preferences (follow these)

- Reply in Thai; explain what changed and give the deploy steps each time.
- No red "eyebrow" tag labels above headings.
- Say "กว่า 40 ปี" (not 38 ปี).
- Branch card name bands on /branches say "มาพร", not "Maporn".
- Only real photos of the right model — never another model standing in. Don't use watermarked images (AutoLife, AUTOSPINN) or foreign-price banners.
- Don't invent specs, prices or claims; leave a "สอบถามที่โชว์รูม" note instead.
- Images sent inline in chat can't be saved — ask for the file.

## Waiting on the client

- Darion EV price: site shows 839,000 / 899,000 (matches the official Premium 899,000 poster); an AUTOSPINN image showed 799,000 / 859,000 — needs confirmation.
- Eksion EV specs and official colour names (prices 799,000 / 859,000 are in); add Eksion to `models.ts` / the /cars list once specs arrive.
- Higher-resolution Eksion / Darion photos (current ones are ~400–800 px wide).
- Darion promo poster (899,000 + free insurance + Wallbox) as a file.
- Official horizontal Farizon / Wuling logo files (current ones were rebuilt from the stacked logos).
- About page: new vision and mission copy (cards are intentionally blank).
- Tank 300 2.4T spec sheet (page still describes the 2.0T Hybrid); Tank 500 2.4T and ORA 5 BEV specs.
- Service page header background; sales/service hours split; group LINE OA for the floating button; LINE OA links for Srinakarin and OJ.
