# AJR Dev Log

The personal site of Anthony Joseph Robles, a tech support analyst and aspiring web developer from Metro Manila. It is built with plain HTML, CSS and JavaScript, with Claude as a coding partner, and has no builder, framework or build step.

It is the successor to AJR Vlogs, which began as a college lab exercise in 2020 and was made with a site builder.

The site is live at https://ajrdevlog.pages.dev/ (hosted on Cloudflare Pages).

**Version:** 3.5.1 (October 25, 2026). See [Release notes](#release-notes).

## What's on the page

- **Hero:** a full-width photo behind the split ice and ember name, with a rare glitch flash on both the name and the background, then a one-line tagline and two buttons.
- **About:** portrait, short bio, a tech support career paragraph, a "How I got here" timeline and a quote. On desktop the timeline sits under the portrait, beside the bio.
- **Projects:** the Detective Conan Watch Order checklist (live), a musician website (in development), and one "coming soon" card ready to be filled in.
- **Footer:** your name and a short line about you, an Explore column (About, Projects, Contact), a Connect column (Email, Messenger, LinkedIn), then the copyright line and a Back to top link.
- **Contact:** a note for recruiters and anyone interested in my CV, contact links with icons, and a working contact form.

## Structure

```
index.html        Page markup (hero, about, projects, contact)
favicon.ico       Fallback browser icon (kept in the root on purpose)
style.css         All styles, with design tokens at the top
script.js         Hero name fitting, nav highlighting, footer year and contact form
README.md         This file
RELEASE-*.md      The release description for each version
.gitignore        Files Git should skip
assets/
  favicon.svg     Browser tab icon
  favicon-96x96.png     PNG browser icon
  apple-touch-icon.png  Home-screen icon on Apple devices (180 x 180)
  og-image.png    Social preview image (1200 x 630), with the name Anthony Joseph Robles
  noise.png       Tiled film-grain texture laid over the page
  projects/
    watch-order.svg  Icon for the Detective Conan Watch Order project card
    minaw.svg        Icon for the musician website project card
  images/
    portrait.jpg  Photo shown in the About section
    background-desktop.webp  Hero photo for desktops and tablets held sideways
    background-tablet.webp   Hero photo (6:5 crop) for tablets held upright and wide phones
    background-mobile.webp   Hero photo (3:4 crop) for phones
```

The contact link icons are inline SVGs inside `index.html`, so they need no extra files.

## Run it locally

Open `index.html` in a browser, or serve the folder so paths behave like they will online:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Projects

The Projects section is in `index.html`, between About and Contact. Each project is one `<li class="project-card">`.

- **Full cards:** the first two cards are full examples. Each has an icon (`assets/projects/watch-order.svg` and `assets/projects/minaw.svg`), a status ("Live" or "In development"), a title, a description, a list of tools (`project-tags`) and an "Open the app" link. Copy that card to add another project, and put its icon in `assets/projects/`. The link opens in a new tab with `rel="noopener"`.
- **Placeholder card:** the last card still says "Coming soon". To fill one in, change the status text, the `<h3>` title and the description, then add the icon, tools list and link as in the first two cards.
- **Hiding the section:** comment out the whole `<section class="projects">` block and the Projects item in the header nav.
- **Images:** the Content Security Policy only allows images from this site, so keep project icons and screenshots inside `assets/`. Outside links are fine, since they are ordinary links and not loaded content.

The Detective Conan Watch Order app is a separate project, hosted on its own Cloudflare Pages site at https://watch-detective-conan.pages.dev/. It is an unofficial fan project and uses only original artwork.

The musician website is also separate, hosted on its own Cloudflare Pages site at https://minawph.pages.dev/. It is still in development: some sections hold placeholder text and the contact form is not connected yet. When it is finished, change the card's status from "In development" to "Live" and update its description.

## Contact form

The form sends messages through [Formspree](https://formspree.io). The form's ID is the last part of the `action` URL on the `<form>` tag in `index.html`. Submissions appear in the Formspree dashboard and are emailed to the address set on the form there.

- `script.js` validates the fields and sends the message with `fetch`, then shows a success or error message under the button.
- A hidden spam-trap field (`_gotcha`) quietly drops submissions from bots.
- If the form's `action` ever contains `YOUR_FORM_ID`, the form falls back to opening the visitor's email app with the message filled in.
- Keep CAPTCHA switched off in the form's Formspree settings. The form sends with `fetch` and has no CAPTCHA widget, so with CAPTCHA on, every submission is rejected with a 403 error.
- The form is restricted to the site's domain (`ajrdevlog.pages.dev`). Submissions from anywhere else, including a local copy opened from a file, go to the Spam tab. Test on the live site.
- Formspree's spam filter can flag throwaway test entries such as "test 1". If a message does not arrive in your inbox, check the Spam tab in the dashboard and mark real messages as not spam.

## Contact links

The contact list shows email, Messenger and LinkedIn. Facebook and Instagram are already written in `index.html` with their icons, but commented out. To turn one on:

1. Find its line inside the `.contact-links` list.
2. Remove the `<!--` before it and the `-->` after it.
3. Replace the placeholder address (for example `https://instagram.com/username/`) with the real profile URL.

## Before publishing

- [x] Portrait added at `assets/images/portrait.jpg`.
- [x] Formspree form connected and tested.
- [x] LinkedIn link points to the real profile.
- [x] In Formspree, mark the early test entries as not spam, then send one realistic message and confirm it reaches the Inbox and your email.
- [x] Confirm the URLs in the `<head>` of `index.html` (`canonical`, `og:url`, `og:image`) match the final address of the site.
- [x] Check the page once more at a phone width and a laptop width, and read the text for typos and dates.
- [x] Two-factor authentication is on for the GitHub account.
- [x] Protect the `main` branch in the repository settings.
- [x] In Formspree, restrict the form to the site's domain.
- [x] Content Security Policy tag added to `index.html` (see Security notes).

## Publish

The site is deployed with Cloudflare Pages from the `main` branch. Every push to `main` redeploys it within a minute or two, and there is no build step. GitHub Pages is not used: it is unpublished, and the live site is only at https://ajrdevlog.pages.dev/.

1. Push or merge a change to `main`.
2. In the Cloudflare dashboard, open Workers & Pages, select the project, and open Deployments. The newest deployment should show Success.
3. Hard refresh the live site to see the change.

The contact form only works on `ajrdevlog.pages.dev`, because Formspree is restricted to that domain. If the address ever changes, update the `canonical`, `og:url` and `og:image` tags in `index.html`, and the domain in Formspree's settings.

After a change to the preview image or the sharing tags, paste the site address into Facebook's Sharing Debugger to refresh the cached preview.

## Design notes

- **Look:** a matte black base with fine film grain (`assets/noise.png`, laid over the page by `body::before`), a faint grid behind the hero, mono HUD-style labels, square corners and corner brackets on the project cards. It is inspired by hacker-style interfaces in general and uses no logos or artwork from any game.
- **Palette:** ink `#0a0b0d`, ice `#8fd3ff`, ember `#ff7a3d`, with a very dark tint of each for the split hero.
- **Type:** Chakra Petch (bold, squared and techy) for the hero name, headings and the header label, Hanken Grotesk for body text and JetBrains Mono for labels, nav and buttons, all loaded from Google Fonts. To change the heading font, change the link in the `<head>` of `index.html` and `--font-display` at the top of `style.css`.
- **Hero name:** "ANTHONY JOSEPH ROBLES" in capitals on one line, as a two-colour gradient clipped to the text, with the colour change at the centre of the hero. `script.js` sizes it to fill a set share of the width (`--title-fill` in `style.css`: 0.97 on phones and upright tablets, 0.72 on desktop), so it stays on one line whichever font loads and on any screen. The `padding-bottom` on `.hero-title` keeps the tails of letters like "J" and "Y" from being cut off.
- **Hero photo:** there are three layouts. On desktops and tablets held sideways the photo fills the hero, the name sits near the bottom and the tagline and buttons sit right under it. On phones and tablets held upright the layout is stacked: a title band, then the photo (a square crop on phones, a 6:5 crop from 600 px wide), with the tagline and buttons over its faded bottom edge. Each device downloads only the photo it uses. The photos are about 160 KB, 72 KB and 63 KB.
- **Stacked hero (phones and upright tablets):** the colour split is confined to a band behind the name. The band's height is calculated from the name's font size (`--title-fs`) and line count (`--title-lines`), so the name stays centred in it at every width. On phones the hero and form buttons share one full-width layout, and on tablets the hero buttons keep their natural width.
- **Icons:** simple line icons that take the link colour. They are generic symbols, not brand logos.
- **Motion:** a short glitch every few seconds on the name and on the background photo, in step with each other. The background glitch is a copy of the hero background (`.hero::after`) that flashes in shifted, colour-tinted slices. All of it is switched off when the visitor prefers reduced motion.
- **Small phones:** below 520 px the Home link is hidden from the header so four nav items fit; the brand already links to the top.

## Security notes

- The site is static. Anything visitors change in their browser's developer tools only affects their own copy of the page.
- The real protection is access to this repository, so keep two-factor authentication on and protect the `main` branch.
- The page loads no third-party scripts. Google Fonts is the only outside resource besides the Formspree form endpoint.
- A Content Security Policy `<meta>` tag at the top of `index.html` tells browsers to load scripts and images from this site only, styles from this site and Google Fonts, fonts from Google Fonts, and to send form messages to Formspree only. It also blocks inline scripts, so injected code would not run.
- If you add something new, such as a video embed, an analytics script or another font host, add its address to that tag or the browser will block it. For example, a Vimeo embed needs `frame-src https://player.vimeo.com`. If something stops loading, open the browser console and look for a message mentioning Content Security Policy.
- The policy is delivered as a `<meta>` tag so that it works on any host. Some directives, such as `frame-ancestors`, only work as headers and are not included.
- The CV is deliberately not published. The contact section asks recruiters to use the form so that it can be shared on request.

## Release notes

### v3.6 (October 25, 2026)

- Rebuilt the footer so it reads like a personal site: the mark and name with a short line about me, an Explore column (About, Projects, Contact), a Connect column (Email, Messenger, LinkedIn), and a bottom row with the copyright line and a Back to top link.
- Added a blue and orange line along the top of the footer, matching the section dividers. It is one column on small phones and two columns up to 700 px wide.
- To change the footer's links, edit the lists in `<footer class="site-footer">` in `index.html`. The year is still filled in by `script.js` (keep `id="year"`).
- No scripts or third-party resources were added, so the Content Security Policy is unchanged.

### v3.5 (October 25, 2026)

- On desktop (861 px and wider) the About section is now two columns: the portrait with the "How I got here" timeline underneath on the left, and the bio with the quote on the right. This removes the empty space that sat under the portrait.
- The bio and the timeline are now wrapped in `.about-bio` and `.about-path` in `index.html`, so the layout can rearrange them. The Pat Riley quote moved to the end of the bio.
- Phones and tablets keep one column. The order there is now portrait, bio, quote, then the timeline.

### v3.4 (October 25, 2026)

- On phones (under 600 px wide) the hero now fills the visible screen when the page loads, so the About section no longer peeks in at the bottom. It uses the visible screen height, so it also works with a phone browser's address bar.
- Made a taller 3:4 crop of the hero photo for phones (`background-mobile.webp`, about 63 KB) to fill that space. The photo covers whatever height the phone has, and the tagline and buttons sit at the bottom of the screen.
- Tablets, desktops and the glitch effect are unchanged.

### v3.3 (October 23, 2026)

- Filled in the second project card with the musician website: its own icon, an "In development" status, a short description, a list of tools and a link that opens the site in a new tab.
- Updated the Projects intro line to say that one project is live and one is in development.
- Shortened the page description and the sharing description to 144 characters, inside the 90 to 155 range that the Facebook Sharing Debugger asks for.
- Removed the vertical line from the hero on every screen size. The name keeps its blue and orange colour split, and the phone and tablet title band keeps its two-tone background.
- Added `assets/projects/minaw.svg`. No scripts or third-party resources were added, so the Content Security Policy is unchanged.

### v3.2 (October 23, 2026)

- Added a full-width photo behind the hero, with three crops (`background-desktop.webp`, `background-tablet.webp`, `background-mobile.webp`), each loaded only on the devices that use it.
- Changed the hero name from "AJR Dev Log" to "ANTHONY JOSEPH ROBLES", kept on one line on every screen. `script.js` now fits the name to the width, so any font works without resizing.
- Moved the tagline and the two buttons below the name, with type that scales with the screen. On tablets the buttons keep their natural width instead of stretching.
- Changed the heading font from Dela Gothic One to Chakra Petch, inspired by hacker-style interfaces. Updated the Google Fonts link to match.
- Added the glitch effect to the hero background, in step with the name's glitch. It is switched off for visitors who prefer reduced motion.
- Changed the page title, description and sharing tags to Anthony Joseph Robles, and rebuilt the social preview image (`og-image.png`) with the name. It is also smaller, about 112 KB instead of 243 KB. "AJR Dev Log" stays as the site name in the header and as the small label on the preview image.
- Removed unused files from the repository: `background-desktop.png`, `icon-sheet.png`, `assets/images/portrait_og.jpg` and `assets/images/.gitkeep`.
- No third-party scripts were added. The Content Security Policy is unchanged.

### v3.0 (October 20, 2026)

- Added the first real project to the Projects section: the Detective Conan Watch Order checklist, with its own icon, a "Live" status, a list of tools and a link that opens the app in a new tab.
- Updated the Projects intro line, and kept two "coming soon" cards for the next projects.
- Added project card styles for the icon row, tool tags and link, and made each card a column so the link sits at the bottom of a taller card.
- Added `assets/projects/watch-order.svg`. No scripts or third-party resources were added, so the Content Security Policy is unchanged.

### v2.3 (October 19, 2026)

- Restyled the site with a matte black base, fine film grain, a faint grid behind the hero, mono HUD-style labels, square corners and corner brackets. The ice and ember accents stay.
- Added a short, rare glitch on the hero title. It is switched off for visitors who prefer reduced motion.
- Added a Projects tab and a section with three "coming soon" cards.
- Replaced the icon set (SVG, 96 x 96 PNG, Apple touch icon, `favicon.ico`) with a new glitch-sliced "A" mark, and added the mark beside the name in the header.
- Rebuilt the social preview image (`og-image.png`) to match, and added `twitter:image` and `twitter:image:alt` tags.
- Fixed the header on narrow phones: Home is hidden below 520 px, and below 370 px only the icon shows next to the nav, so nothing overflows at 320 px.

### v2.2 (October 18, 2026)

- Moved the live site to https://ajrdevlog.pages.dev/ (Cloudflare Pages) and updated `canonical`, `og:url` and `og:image` to match.
- Added `author`, `article:author`, `article:published_time` and `date` metadata, so the site passes the sharing checks.
- Added a 96 x 96 PNG icon, a 180 x 180 Apple touch icon and a root `favicon.ico`, and kept the SVG icon.
- Restricted the Formspree form to the site's domain, and documented that CAPTCHA must stay off with this form.
- Shortened the page `<title>` to "AJR Dev Log | Anthony Joseph Robles".
- Confirmed with the Facebook Sharing Debugger that the preview card is correct.

## Credits

Designed and built by Anthony Joseph Robles with Claude.
