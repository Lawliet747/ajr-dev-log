# AJR Dev Log

The personal site of Anthony Joseph Robles, a tech support analyst and aspiring web developer from Metro Manila. It is built with plain HTML, CSS and JavaScript, with Claude as a coding partner, and has no builder, framework or build step.

It is the successor to AJR Vlogs, which began as a college lab exercise in 2020 and was made with a site builder.

The site is live at https://ajrdevlog.pages.dev/ (hosted on Cloudflare Pages).

## What's on the page

- **Hero:** a split ice and ember title, a short introduction and two buttons.
- **About:** portrait, short bio, a tech support career paragraph, and a "How I got here" timeline.
- **Contact:** a note for recruiters and anyone interested in my CV, contact links with icons, and a working contact form.

## Structure

```
index.html        Page markup (hero, about, contact)
favicon.ico       Fallback browser icon (kept in the root on purpose)
style.css         All styles, with design tokens at the top
script.js         Nav highlighting, footer year and contact form
README.md         This file
.gitignore        Files Git should skip
assets/
  favicon.svg     Browser tab icon
  favicon-96x96.png     PNG browser icon
  apple-touch-icon.png  Home-screen icon on Apple devices (180 x 180)
  og-image.png    Social preview image (1200 x 630)
  images/
    portrait.jpg  Photo shown in the About section
```

The contact link icons are inline SVGs inside `index.html`, so they need no extra files.

## Run it locally

Open `index.html` in a browser, or serve the folder so paths behave like they will online:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

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

1. Go to Settings > Pages in the repository.
2. Under Build and deployment, choose Deploy from a branch, then select `main` and the `/ (root)` folder.
3. Save, and wait a minute or two for the site to go live.

The site is deployed from the `main` branch with Cloudflare Pages, which redeploys on each push. If you host on GitHub Pages instead, update the `<head>` URLs and the Formspree domain to match.

GitHub Pages is only available for private repositories on paid GitHub plans (Pro, Team or Enterprise). On the Free plan, the repository must be public to publish. A published Pages site is visible to everyone on the internet, even when the repository itself is private.

After the site is live, paste its address into Facebook's Sharing Debugger to refresh the cached preview image.

## Design notes

- **Palette:** ink `#0e1320`, ice `#8fd3ff`, ember `#ff7a3d`, with a dark tint of each for the split hero.
- **Type:** Dela Gothic One for headings and Hanken Grotesk for body text, loaded from Google Fonts.
- **Hero title:** a two-colour gradient clipped to the text, with the colour change sitting on the hero's centre seam. The `padding-bottom` on `.hero-title` keeps the tail of the "g" from being cut off.
- **Phones (860 px and narrower):** the colour split is confined to a band behind the title. The band's height is calculated from the title's font size (`--title-fs`), so the title stays centred in it at every width. The hero and form buttons share one full-width layout.
- **Icons:** simple line icons that take the link colour. They are generic symbols, not brand logos.
- **Motion:** one load animation (the hero seam), disabled when the visitor prefers reduced motion.

## Security notes

- The site is static. Anything visitors change in their browser's developer tools only affects their own copy of the page.
- The real protection is access to this repository, so keep two-factor authentication on and protect the `main` branch.
- The page loads no third-party scripts. Google Fonts is the only outside resource besides the Formspree form endpoint.
- A Content Security Policy `<meta>` tag at the top of `index.html` tells browsers to load scripts and images from this site only, styles from this site and Google Fonts, fonts from Google Fonts, and to send form messages to Formspree only. It also blocks inline scripts, so injected code would not run.
- If you add something new, such as a video embed, an analytics script or another font host, add its address to that tag or the browser will block it. For example, a Vimeo embed needs `frame-src https://player.vimeo.com`. If something stops loading, open the browser console and look for a message mentioning Content Security Policy.
- GitHub Pages cannot set HTTP headers, so the policy is delivered as a `<meta>` tag. Some directives, such as `frame-ancestors`, only work as headers and are not included.
- The CV is deliberately not published. The contact section asks recruiters to use the form so that it can be shared on request.

## Credits

Designed and built by Anthony Joseph Robles with Claude.
