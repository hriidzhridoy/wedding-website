# Wedding invitation

React + Vite + Tailwind CSS wedding invitation with a curtain opening, circular scratch-date reveal, responsive design, countdown, calendar download, and demo RSVP.

## Invitation flow

1. Open the original full-screen burgundy curtains to see the hero introduction and nine gentle heart balloons. Gathered SVG drapes frame the hero after the curtains open.
2. Scroll from the hero to the circular date reveal. Reveal the day, month, and year with a short swipe, tap, or keyboard activation. A wider brush and 16% reveal threshold make scratching light. An optional “Reveal the date for me” button reveals all three.
3. Completing the date fires the side cannons once and displays the full invitation below. Until then, the navigation, venue, countdown, RSVP, and footer are not rendered.
4. Replay starts a fresh session, resetting the scratch progress and effects. Both effects respect reduced-motion preferences.

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

Run `npm test` after building to check desktop/mobile gating, short mouse and touch swipes, taps, keyboard and optional reveal, confetti timing, calendar downloads, RSVP previews, replay, and reduced motion. Tests use a locally installed Google Chrome browser.

## Customize

- `src/data/wedding.js`: editable wedding details. Dates use Bangladesh time (+06:00). Keep `dateLabel` and `time` in sync with `date`.
- `src/App.jsx`: session lifecycle and the sealed → scratch → revealed flow.
- `src/components/invitation/`: curtain, layout, and individual invitation sections.
- `src/components/scratch/`: circular scratch controls and date-reveal screen.
- `src/components/effects/`: opening heart balloons and five paired side-cannon volleys (1,100 pieces).
- `src/components/rsvp/`: demo form and validation.
- `src/hooks/`: scratch pointer interactions, reduced-motion preference, and scoped scroll-reveal observer.
- `src/lib/`: date formatting, calendar generation, scratch coating, and coverage calculations. Scratch size, brush, and reveal threshold live in `scratchCanvas.js`.
- `src/styles/`: base styles and separate invitation, curtain, scratch, and effects stylesheets. Tailwind utilities are imported without Preflight to preserve typography.
- `public/venue.png`: venue illustration.
- `index.html`: initial title, description, and favicon.

The RSVP is a preview only. It does not transmit or store guest information. Connect an RSVP service or backend before using this for a real wedding, and update the demo notices, sample venue note and calendar event text. Fonts load from Google Fonts, with local serif and sans-serif fallbacks. The venue illustration is generated artwork, not a picture of a real venue.
