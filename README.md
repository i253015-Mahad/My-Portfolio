# Mahad Waqas: Personal Portfolio (V1)

A static, dependency-free portfolio built with plain HTML, CSS and JavaScript, following the project SRS.

## Run locally
Open `index.html` in a browser, or serve the folder: `python -m http.server 8000` then visit http://localhost:8000.

## Structure
| Path | Purpose |
| --- | --- |
| `index.html` | Page shell, semantic sections, SEO and social metadata |
| `css/base.css` | Design tokens (colors, type, spacing), reset, light/dark themes |
| `css/layout.css` | Header, sections, grids, responsive breakpoints, footer |
| `css/components.css` | Buttons, cards, chips, timeline, project dialog |
| `js/data.js` | **All content.** Edit this to update the site |
| `js/render.js` | Builds the DOM from the data (no `innerHTML`) |
| `js/ui.js` | Nav, scroll-spy, theme toggle, project filter, dialog |
| `js/main.js` | Entry point |
| `assets/` | `images/`, `icons/`, `videos/` |

## Updating content (all in `js/data.js`)
- **Add a project:** copy an object in `projects`. Add screenshots as `images: [{ src: "assets/images/x.webp", alt: "..." }]`.
- **Links and email:** edit `links` and `config.email`. Empty values are hidden automatically.
- **Skills, experience, education:** edit the matching arrays.

## Before deploying (open items from the SRS)
- [ ] Confirm GitHub profile URL (OI-002) and add LinkedIn URL (OI-001)
- [ ] Add public email (OI-003)
- [ ] Verify dates for experience/education (OI-007), then fill `period`
- [ ] Finalise IICT, ALRS, OOP and DLD descriptions and technologies (OI-006, OI-008)
- [ ] Add project screenshots/videos and an `assets/images/og-preview.png` (1200x630)
- [ ] Run Lighthouse; deploy to Netlify, Vercel or GitHub Pages (HTTPS)
