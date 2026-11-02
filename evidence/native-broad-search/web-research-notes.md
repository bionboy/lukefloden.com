# Web research notes for Safari image boundaries

Research date: 2026-11-02.
These are reading notes and candidate leads, not native device results.
Use the [native report](README.md) for observed behavior and coverage limits.

## Primary sources reviewed

- [Safari 26 release notes](https://developer.apple.com/documentation/safari-release-notes/safari-26-release-notes) introduce the native `obscuredContentInsets` API for WKWebView hosts.
  This API belongs to the host application; it is not a webpage API.
- [WebKit bug 301756](https://bugs.webkit.org/show_bug.cgi?id=301756) explains solid color extension for fixed or sticky elements near viewport edges.
  An extension color is not image content.
- [WebKit bug 300965](https://bugs.webkit.org/show_bug.cgi?id=300965) records the dialog-backdrop problem and its color-extension fix.
  It does not establish that arbitrary backdrop images extend beyond the document.
- [WebKit bug 303167](https://bugs.webkit.org/show_bug.cgi?id=303167) reports remaining cases with complex dialog backdrops.
- [WebKit bug 301108](https://bugs.webkit.org/show_bug.cgi?id=301108) reports viewport coverage problems involving `viewport-fit=cover` and `height=device-height`.
  The report is not a demonstrated webpage fix.
- [WebKit bug 305546](https://bugs.webkit.org/show_bug.cgi?id=305546) concerns status-area changes during soft navigation.
  Its scope differs from the image failure at the document origin.
- [WebKit bug 317153](https://bugs.webkit.org/show_bug.cgi?id=317153) concerns Home Screen web apps and the status bar.
  Home Screen behavior is not evidence for an ordinary Safari tab.
- [WebKit bug 237696](https://bugs.webkit.org/show_bug.cgi?id=237696) covers main-document `overscroll-behavior` support.
  Suppressing bounce does not establish image continuation at rest.
- [WebKit bug 312813](https://bugs.webkit.org/show_bug.cgi?id=312813) covers smooth scrolling during rubber-banding.
  It is relevant to the risks of scroll-position workarounds, not proof of a compliant layout.

The reviewed release notes, WWDC material, and bug threads did not identify a webpage API that controls Safari's obscured insets.
This statement describes the reviewed material. It does not establish that no such control exists anywhere.
The [pinned source audit](webkit-source-notes.md) gives the relevant implementation paths and its own limitations.

## Implementation leads

These author reports suggested tests. Their claims were not accepted as Safari guarantees.

- [1ar.io's Safari article](https://1ar.io/updates/safari-26-liquid-glass-web/) proposes loading the document at a nonzero offset with image space above it.
  The native runway fixture tested that idea. Loading works, but the native tap exposes the origin strip again.
- [HawkShift's status-bar investigation](https://hawkshift.com/research/ios-26-safari-status-bar) distinguishes ordinary scrolling content from pinned elements.
  Its described scroll position was insufficient to establish a counterexample at the true document start.
- [andesco/safari-color-tinting](https://github.com/andesco/safari-color-tinting) describes color sampling conditions.
  It was a lead for separating flat color extensions from actual image rendering.
- [Ben Frain's fixed-element article](https://benfrain.com/ios26-safari-theme-color-tab-tinting-with-fixed-position-elements/) concerns browser tint control.
  Setting a browser color does not satisfy #37's image requirement.
- [ember-mobile-drawer issue 113](https://github.com/nickschot/ember-mobile-drawer/issues/113) includes observations after scrolling.
  Such observations do not establish image visibility at the document origin.
- [bryanlaiwei/portfolio PR 13](https://github.com/bryanlaiwei/portfolio/pull/13) changes the image-edge design to blend into a color.
  That would change #37's acceptance criteria.
- [AngelGerena/halo PR 81](https://github.com/AngelGerena/halo/pull/81) uses a body color associated with the hero.
  It is a color-based approach, not image continuation.
- [Serubin/Serubin-net PR 97](https://github.com/Serubin/Serubin-net/pull/97) suggested viewport-sized snap slots for the bottom controls.
  Its presence alone does not establish native validation.

## Real-page screening

Image, video, WebGL, product, and photography pages were considered as possible counterexamples.
The saved native sheets contain 14 page captures across 13 sites, including two Apple pages.
Several captures include consent or region dialogs and ordinary solid headers.
Those states can independently produce solid browser backgrounds.
The sheets are screening evidence, not 14 controlled tests that isolate an image-backed document at its true origin.

Candidate lists used during web research also contained URLs that were not captured natively.
A candidate URL, a fetched viewport tag, or a desktop screenshot is not a successful native test.

## Open questions

- Does Safari's closed inset policy accept a page input not identified in the reviewed sources?
- Can a different document structure alter the relationship between the native clip and the visible page without breaking native scrolling?
- Can any candidate demonstrate image detail at the true origin after the native tap, rather than only at a nonzero loading offset?

No working counterexample was established by these sources or the associated native tests.
