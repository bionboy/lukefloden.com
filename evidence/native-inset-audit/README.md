# Native inset audit, 2026-10-30

No layout that meets all of [issue #37](https://github.com/bionboy/lukefloden.com/issues/37) was found.
The application code is unchanged from `64456d5`.

## Environment

- lilac, iPhone 17 Pro simulator, iOS 27.0, native Safari, portrait 402 × 874 points.
- Candidate: production build of `64456d5`, `aubr preview`, `https://localhost:4173/about`, dark theme.
- Fixtures: these HTML files served over HTTPS. Magenta is a diagnostic fallback color.
- Not covered: a real iPhone, iOS 26, other routes, light theme, landscape.

## Observations

| Test                                                                                     | Result                                                                                                                                       |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Candidate, native controls ([recording](cand-about.mp4), [frames](cand-about-sheet.jpg)) | The toolbar collapses on scroll. The first clock tap at (80, 32) expands the controls; the second scrolls to the top.                        |
| Candidate, top edge ([frames](c-3.png))                                                  | Mid-page: image behind the status bar. At rest at the top: solid black strip. During a pull: larger solid black area.                        |
| Candidate, bottom edge ([recording](cand-about-end.mp4), [frames](e-2.png))              | At the end, during the pull and at rest: solid black band behind the expanded toolbar.                                                       |
| `plain.html`, root background image ([image](s-plain.png))                               | Top: flat magenta at the top; image with a magenta edge tint mid-page.                                                                       |
| HUD values on every fixture                                                              | `innerHeight` 714 (754 collapsed). `env(safe-area-inset-top)` 0. Document y=0 is below the status bar at rest.                               |
| `fixedimg.html`, fixed `<img>` with `inset:0` ([image](s-fixed-vs-plain-mid.png))        | The top strip stays flat magenta even mid-page. Scrolled text does not show through it.                                                      |
| `negabs.html`, composited image at `top:-400px` ([image](s-neg.png), panels 1–2)         | Flat magenta at the top. The negative part never paints.                                                                                     |
| `negfixed.html`, composited fixed image 300px past both edges (panels 3–4)               | Flat magenta top and bottom strips, at the top and mid-page.                                                                                 |
| `negfixedvis.html`, the same with transparent html (panels 5–6)                          | The strips become flat white, at the top and mid-page.                                                                                       |
| Real sites at the top ([image](s-sites.png))                                             | apple.com and unsplash.com show a solid header color. Production after #36 shows the image, because its document never reaches the true top. |

## Source facts

Pins: WebKit main [`bacf018e`](https://github.com/WebKit/WebKit/tree/bacf018e412546741befdaffa1ca5b5355268272) and branch `safari-7625.2.8.18` [`d953bbed`](https://github.com/WebKit/WebKit/tree/d953bbedb514f5e274f9fa2465a8bc75391e891a).

- Overflow scrollers set `scrollsToTop = NO` ([main ScrollingTreeScrollingNodeDelegateIOS.mm:404](https://github.com/WebKit/WebKit/blob/bacf018e412546741befdaffa1ca5b5355268272/Source/WebKit/UIProcess/RemoteLayerTree/ios/ScrollingTreeScrollingNodeDelegateIOS.mm#L404)).
- The inspected open-source WebKit code has no `scrollViewShouldScrollToTop` override.
  UIKit's default target is `-adjustedContentInset.top`.
  The native tap reaches the top in the recorded tests.
  This source inspection does not establish Safari's closed-source delegate policy.
- The scroll-view background is `underPageBackgroundColor`, from the root background color or `theme-color` ([7625 WKWebViewIOS.mm:668-718](https://github.com/WebKit/WebKit/blob/d953bbedb514f5e274f9fa2465a8bc75391e891a/Source/WebKit/UIProcess/API/ios/WKWebViewIOS.mm#L668)). It is a color.
- A fixed or sticky container at an edge gets a color-extension view: its background color, a sampled predominant color, or `underPageBackgroundColor` ([7625 WKWebView.mm:3516-3560](https://github.com/WebKit/WebKit/blob/d953bbedb514f5e274f9fa2465a8bc75391e891a/Source/WebKit/UIProcess/API/Cocoa/WKWebView.mm#L3516), [main LocalFrameView.cpp:2717-2738](https://github.com/WebKit/WebKit/blob/bacf018e412546741befdaffa1ca5b5355268272/Source/WebCore/page/LocalFrameView.cpp#L2717)).
- When Safari sets obscured insets, `viewport-fit` does not change them ([7625 WKWebViewIOS.mm:827-883](https://github.com/WebKit/WebKit/blob/d953bbedb514f5e274f9fa2465a8bc75391e891a/Source/WebKit/UIProcess/API/ios/WKWebViewIOS.mm#L827)).
- `insetClipLayerRect` sizes `m_clipLayer`. That layer is not created for the main frame when scrolling is delegated to the native scroll view, as on iOS ([main RenderLayerCompositor.cpp:4570-4581](https://github.com/WebKit/WebKit/blob/bacf018e412546741befdaffa1ca5b5355268272/Source/WebCore/rendering/RenderLayerCompositor.cpp#L4570)). The earlier explanation that cites it does not apply to iOS.
- Commit [`8b5cfad`](https://github.com/WebKit/WebKit/commit/8b5cfad939f76e35a20fbc885759fb82914843d0) ("Don't extend page colors under sidebar or top inset") landed on main on 2026-07-29. It is absent from the open `safari-7625*` branches. Its top view was removed on 2026-10-10 in `83f810390d`. It paints `systemBackgroundColor`, not the observed root color. It does not explain this strip.

## Inferences

- Both native features need the root document to scroll. At the native top position and the document end, the strip lies outside the document. Every path found paints it with one solid color.
- Earlier fixed-element tests were not neutral. A fixed element at the top edge adds a solid strip even mid-page.
- The JS clamp result fits a lost race: a JS scroll during the UIKit animation loses, and the UI offset later replaces the JS value.

## Limits

- Safari's closed code sets the insets and pref defaults. Open source does not prove Safari's policy.
- The inspected `7625` branch was not mapped to the simulator's exact engine build.
- Six fixture mechanisms and two real sites were tested. This is strong evidence for this runtime, not a proof for every layout.
- One fixture result is unexplained: in `negfixed.html`, document text shows over the flat bottom strip mid-page.
