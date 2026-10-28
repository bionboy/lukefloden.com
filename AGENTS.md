# lukefloden.com agent instructions

## Visual validation and PR evidence

These requirements apply only to visual changes in this repository that warrant screenshots or recordings.

- Capture before and after screenshots when appearance needs comparison or a visual fix needs proof.
  - Use the actual PR base or production for the before state. Use the current revision for the after state.
  - Match the device, browser, viewport, theme, route, and scroll position in each pair.
  - Label each source with its commit or production URL. Record the tested device, browser version, and theme.
- Record videos when a change affects scrolling or page/view transitions.
  - Exercise the affected routes, scroll positions, and navigation paths. Include document edges and overscroll when relevant.
  - For shared page layouts, cover `/home`, `/about`, `/portfolio`, and affected child routes in both themes.
  - Play each recording and inspect frames during movement. Settled screenshots alone cannot prove motion or transition behavior.
- For changes to native browser controls, validate in the native browser on a device or simulator.
  - For Safari controls, use native Safari. Desktop mobile emulation cannot validate its native controls.
  - Record the tested OS and runtime. Claim compatibility only with versions that were tested.
- Before opening or updating a PR with a visual change, attach or link the warranted screenshots and videos under Testing.
  - Identify the tested revision and state any coverage gaps beside the evidence.
