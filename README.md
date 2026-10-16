# AJR Dev Log

The personal site of Anthony Joseph Robles, built with plain HTML, CSS and JavaScript, with Claude as a coding partner. It is the successor to AJR Vlogs, which began as a college lab exercise in 2020 and was made with a site builder. This version has no builder, framework or build step.

Once published, the site will live at https://lawliet747.github.io/ajr-vlogs-v2/

## Structure

```
index.html        Page markup (hero, about, contact)
style.css         All styles, with design tokens at the top
script.js         Nav highlighting, footer year and contact form
assets/
  favicon.svg     Browser tab icon
  og-image.png    Social preview image (1200 x 630)
  images/         Put portrait.jpg here
```

## Run it locally

Open `index.html` in a browser, or serve the folder so paths behave like they will online:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Before publishing

- [ ] Add `assets/images/portrait.jpg` (a square photo, ideally 696 x 696 or larger).
- [ ] Contact form: create a free form at https://formspree.io and replace `YOUR_FORM_ID` in `index.html` with your form ID. Until then, the form opens the visitor's email app with their message filled in.
- [ ] Confirm the URLs in the `<head>` of `index.html` (`canonical`, `og:url`, `og:image`) match the final address of the site.

## Publish with GitHub Pages

1. Go to Settings > Pages in the repository.
2. Under Build and deployment, choose Deploy from a branch, then select `main` and the `/ (root)` folder.
3. Save, and wait a minute or two for the site to go live.

GitHub Pages is only available for private repositories on paid GitHub plans (Pro, Team or Enterprise). On the Free plan, the repository must be public to publish. A published Pages site is visible to everyone on the internet, even when the repository itself is private.

## Design notes

- Palette: ink `#0e1320`, ice `#8fd3ff`, ember `#ff7a3d`, with a dark tint of each for the split hero.
- Type: Dela Gothic One for headings and Hanken Grotesk for body text, loaded from Google Fonts.
- Motion: one load animation (the hero seam), disabled when the visitor prefers reduced motion.
