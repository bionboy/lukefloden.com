# Icon and preview evidence

These screenshots show simulations from the actual metadata and image assets. They do not show live social service results.

- Before source: PR base `e9ff75f35eff5317793bb35840e43a4c46f260d4`.
- After source: `src/app.html` and `static/` in the commit that adds this evidence.
- Capture: Chromium 153.0.8010.12, macOS 27.0.1 arm64, desktop viewport 1000 × 900, scroll position 0.
- Each desktop pair uses the same route, viewport, browser, and theme. The route is the local evidence HTML file.
- Mobile simulation: viewport 390 × 844. This is not a native iPhone or Safari test.
- No scrolling, navigation, or page layout code changed.

| Surface | Before | After |
| --- | --- | --- |
| Light theme | [Screenshot](before-light.png) | [Screenshot](after-light.png) |
| Dark theme | [Screenshot](before-dark.png) | [Screenshot](after-dark.png) |
| Mobile layout | — | [Screenshot](after-mobile.png) |

The screenshots cover icons at 16 and 32 pixels, the Apple icon, manifest icons, search text, and social card simulations.
Social examples cover X, Slack, Facebook, LinkedIn, Discord, and Messages or other Open Graph readers.
Platforms can change layouts, crop images, choose fallback images, or retain cached metadata. Search engines can rewrite descriptions.
The base has no explicit social image. Its simulated previews therefore omit an image; this is not a claim about platform fallback behavior.

The favicon SVG embeds the approved PNG. It preserves the animation artwork; it is not a vector tracing.
The browser and manifest PNGs have transparency. The Apple icon and both social images use white backgrounds.
The mark stays blue in both themes. Its blue fill has less contrast on dark surfaces.

`checks.json` records the actual served tags on `/home`, `/about`, and `/portfolio`, and the successful responses for all ten assets.
The shared template also affects child routes. Their text remains site-wide.

Validation:

- Production build passed with Node 22, as required by `.nvmrc`.
- Formatting passed for `src/app.html` and `static/site.webmanifest`.
- The Svelte check reports three errors for `process` in unchanged `vite.config.ts`.
- Native browser tabs, iOS home screen installation, live social crawlers, and search indexing were not tested.

Sources: [Open Graph image properties](https://ogp.me/#structured), [X card documentation](https://developer.x.com/en/docs/x-for-websites/cards/overview/summary).
