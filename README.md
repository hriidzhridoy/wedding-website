# Wedding invitation

React + Vite + Tailwind CSS, with the original curtain reveal, responsive design, countdown, calendar download, and demo RSVP.

## Development

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

On Windows PowerShell, use `npm.cmd` if the execution policy blocks `npm.ps1`.

## Production

```sh
npm run build
npm run preview
```

Deploy the generated `dist` folder to a static web host. Serve it over HTTP; opening the HTML directly as a file does not load the React modules. Relative asset paths support hosting in a subdirectory.

Run `npm test` after building to check desktop/mobile interactions, calendar downloads, RSVP previews, replay focus, and reduced motion. Tests use a locally installed Google Chrome browser.

## Customize

- `src/wedding.js`: names, date, venue, invitation, dress code, and gifts. Dates use Bangladesh time (+06:00). Keep `dateLabel` and `time` in sync with `date`.
- `src/App.jsx`: invitation sections, responsive Tailwind layouts, and reveal/replay behavior.
- `src/components.jsx`: countdown, calendar download, and RSVP form.
- `src/styles.css`: typography, colors, decorative styling, and animations. Tailwind theme and utilities are imported without Preflight to preserve the original design.
- `public/venue.png`: venue illustration.
- `index.html`: initial title, description, and favicon.

The RSVP is a preview only. It does not transmit or store guest information. Connect an RSVP service or backend before using this for a real wedding, and update the demo notices, sample venue note and calendar event text. Fonts load from Google Fonts, with local serif and sans-serif fallbacks. The venue illustration is generated artwork, not a picture of a real venue.
