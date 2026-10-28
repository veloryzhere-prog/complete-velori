# VELORI — Official Android Download Center

A production-oriented **static download website**, built with HTML, CSS and vanilla JavaScript. Designed for `https://download.veloryz.online`.

## Included

- Animated, responsive VELORI landing page and standalone detail pages
- **Actual APK:** `files/VELORI-Android.apk` (not a placeholder)
- **Actual submitted 60-second walkthrough:** `media/velori-install-guide.mp4` (H.264 / AAC, portrait)
- Installation-guide popup with native video controls, ESC/backdrop close, and a non-intrusive introductory helper card
- QR code pointing **directly to the APK** and a second QR code for the site
- Actual branding from the uploaded VELORI app icon
- 16 linked CMS-style static pages, including privacy, legal, safety, help, accessibility and installation
- Responsive light/dark theme, scroll reveals, rotating orbits, animated marquee, interactive navigation, reduced-motion support
- No Node, NPM, database, paid services, remote CDN or external JavaScript dependencies needed to deploy

## Deployment to Netlify — no coding tools needed

1. Extract the supplied ZIP; open the `VELORI-Download-Site` folder.
2. At Netlify, create a site by dragging **the folder contents** (or the folder itself, if its UI supports it) into **Netlify Drop**. Ensure `index.html` is at the deployed site's web root, not nested under an additional directory.
3. Test the supplied Netlify URL before connecting the custom domain. The homepage, APK and MP4 should all load.
4. Add custom domain **`download.veloryz.online`** to the Netlify site. In your DNS provider, create a `CNAME` record with **Host/Name `download`** and **Target equal to your actual Netlify `<site>.netlify.app` domain**. Do not use a fabricated target. Wait for DNS and HTTPS to be configured.
5. Test `https://download.veloryz.online/files/VELORI-Android.apk` in a private browser window and scan the QR code with another phone.
6. If you instead publish to a different address, edit `SITE` in `scripts/build.py`, and both URLs in `scripts/create_assets.py`; rerun both scripts. You will need Python with Pillow and qrcode to regenerate the supplied QR assets; the website itself does **not** require Python to serve.

## Test locally

From within `VELORI-Download-Site` run `python -m http.server 8080`; open `http://localhost:8080` in your browser. **Do not** double-click the HTML file using the `file://` protocol: root-relative links work correctly when served on a web server.

## Site layout

```text
index.html                    Homepage
<page>/index.html            16 CMS-style static pages
assets/css/site.css          All design, motion, responsiveness
assets/js/site.js            Video modal, theme, menu, reveal, QR/help interactions
assets/img/                  Actual VELORI icon, poster, PNG QR assets
files/VELORI-Android.apk     Direct-download Android APK
media/velori-install-guide.mp4  60-second official tutorial
_headers                     Netlify security and APK download headers
manifest.webmanifest         Website manifest
robots.txt, sitemap.xml      Indexing metadata
scripts/build.py             Optional site/page generator
scripts/create_assets.py    Optional QR/poster generator
```

## Important before publishing

1. **QR codes are not live until the subdomain has been deployed.** The QR PNG points to `https://download.veloryz.online/files/VELORI-Android.apk`; it isn't a ChatGPT or local-file download URL.
2. **Verify the APK's signing identity, permissions, functionality, security warnings, and compatibility** before encouraging public installations. A SHA-256 hash verifies file integrity only; it doesn't prove the app is safe.
3. **The legal/privacy/help pages are editable example content**, not a completed legal audit. The site owner must verify business identity, jurisdiction, privacy/data practices, consent rules, copyright and support contact details for the live VELORI platform. Do not present them as legally reviewed documents without doing so.
4. **The direct download is not a Play Store listing** and does not imply Google certification. The installation guide tells people not to bypass malware/security warnings.
5. This package includes no analytics, back-end forms or account handling. The "mock phone" on the homepage is an illustrated concept, not an authentic screenshot.
6. If you replace the APK, update its hash in the static downloads page by running `python scripts/build.py`, and update the release note and file details accordingly.
7. Branding and external platform links point to **`https://chat.veloryz.online`**. Set up that destination independently if not already live.

## APK SHA-256

`03b0562792ad6cdb4a848535b20e56697491795812c0c39ea9b7924a6dec6037`

## © 2026 VELORYZ
