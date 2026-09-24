# XFI - Xiaomi Federation Indonesia

Directory of 110 Xiaomi Telegram groups across Indonesia. Find your device community and join instantly. Real profile photos, category filter, codename search.

**Live:** https://xiaomifederationindonesia.vercel.app/ · **Telegram:** [@xfichat](https://t.me/xfichat) · **Channel:** [@XiaomiFederationIndonesia](https://t.me/XiaomiFederationIndonesia)

## Features

- 110 groups / 6 categories (Redmi Note, Redmi, POCO, Xiaomi/Mi, Community, Other) + XFI
- Vertical hero with 5 photo columns (3 on mobile), marquee 38–130s, lightweight on touch (no blur)
- Category filter + search (`ginkgo`, `tanzanite`, `POCO X3`) + URL sync (`?q=&cat=&all=`)
- Flat grid - 2 columns on desktop, 1 on mobile, smooth `View All` with ViewTransition
- i18n ID/EN via `?lang=en`, dark theme only (Xiaomi orange `#FF6900`)
- No framework, no build - pure static with `content-visibility` + `requestIdleCallback`

## Stack

Vanilla HTML5 + CSS3 + ES6. Static hosting on Vercel (framework: Other).

## Structure

```
xfi-directory/
├── index.html
├── css/style.css
├── js/script.js        # single source `groups` array
├── assets/images/      # 110× 320×320 jpg + webp
├── sw.js
├── sitemap.xml
└── manifest.json
```

## Run Locally

```bash
python3 -m http.server 8765 --directory ~/xfi-directory --bind 0.0.0.0
# http://127.0.0.1:8765
```

## Add a Group (PRs Welcome)

PRs to `main` - reviewed by XFI maintainers.

1. Add an entry to `js/script.js` `groups`:
   ```js
   {name:"Xiaomi Redmi ... (Codename)", handle:"@Handle", members:"1.2K", desc:"...", link:"https://t.me/Handle", img:"assets/images/handle-group.jpg", type:"group", device:"Note 12"}
   ```
2. Fetch `t.me/Handle` → `og:title`, `og:image` (cdn*.telesco.pe), `tgme_page_extra` (members), `tgme_page_description`.
3. Download: `curl -A "Mozilla/5.0" -L -o assets/images/handle-group.jpg "<og:image>"` - verify `ff d8 ff e0` and >10K.
4. `device` is mapped to a category pill via `getCategory(device)`.

## Contributing

- Fork → branch `feat/...` → PR to `main`
- Commits: English, Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`), with `Signed-off-by` and `Change-Id`
- Photos must be real - no placeholders

## License

© 2026 XFI. Not affiliated with Xiaomi Corp. Built for Mi Fans.
