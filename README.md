# Candy Travels India — static website

Five-page marketing site for group and family tours from Greater Noida West. HTML, CSS and JavaScript only.

## Pages

- `index.html` — home and image slider
- `about.html` — story and Force Urbania 16-seater
- `destinations.html` — spiritual, heritage and hill destinations including Lansdowne and Bharatpur
- `services.html` — Urbania-led group travel and partner-car booking for smaller groups
- `contact.html` — enquiry form, details and map

## Edit business details

Open `js/config.js` and change any field. Every page reads this file for name, email, phone, WhatsApp, address and map.

WhatsApp link format: `https://wa.me/` + `whatsapp` + pre-filled `whatsappMessage`.

Email currently set to `candytravelsindia@gmail.com`. Confirm the mailbox is live before you share the site.

## Add home slider images

Static HTML cannot list a folder. The slider reads `images.json`.

1. Copy a `.jpg`, `.png` or `.webp` file into `images/`.
2. Add a slide object in `images.json`:

```json
{
  "src": "images/your-photo.jpg",
  "alt": "Short description",
  "kicker": "Small label",
  "caption": "Headline on the slide"
}
```

3. Refresh the home page. Destination slides alternate hill and temple/tourist scenes every two seconds, with arrows, dots, and pause on hover.

## Enquiry form

The form validates, submits the enquiry to Formspree for email delivery, and opens a prefilled WhatsApp message.

To send to your inbox automatically:

1. Create a form at [Formspree](https://formspree.io/).
2. Verify `candytravelsindia@gmail.com` as the recipient in the Formspree dashboard.
3. Paste the form endpoint (for example, `https://formspree.io/f/xxxxxxxx`) into `formspreeEndpoint` in `js/config.js`.

The endpoint is public client-side configuration, not a secret API key. Formspree handles delivery and its dashboard controls the verified notification recipient. Until configured, submission opens WhatsApp and a prefilled email draft; that fallback needs the customer to send the email manually.

## Run locally

Because the slider fetches `images.json`, use a small local server (opening `index.html` as a file still works via the JS fallback list):

```bash
npx --yes serve .
```

Then open the URL shown in the terminal.

## Deploy

Upload the whole folder (including `images/`, `css/`, `js/`, `images.json`) to any static host: Netlify, GitHub Pages, Cloudflare Pages, or a basic Apache/Nginx public_html directory. No build step.


## Image credits

Wikimedia Commons image credits and license links are recorded in `images/SOURCES.md`. The Grandthum construction-site photo is credited to the official Grandthum updates page; image reuse terms are not stated there, so confirm permission before production use.
