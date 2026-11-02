# iOS 26/27 Safari: page content behind the status bar and the bottom toolbar

Research date: 2026-11-02. Web sources only. No device or simulator tests.

## TL;DR

- **Apple publishes no rule for this.** Safari 26.0 through 27 release notes, the WebKit WWDC25 and WWDC26 posts, and the WWDC26 session 204 transcript say nothing about theme-color, toolbar tint, or status-bar compositing for web pages.
- **Apple engineers commented only in bug threads:**
  - Color extension is a solid fill for fixed or sticky elements at a viewport edge (bug 301756).
  - Home Screen web apps "do not support drawing arbitrary content below the status bar" (bug 317153).
- **Community testing supports the observed behavior:**
  - At `scrollY = 0` in a Safari tab, the strip above the page is a sampled or fallback flat color.
  - Real page pixels show behind the status bar only after the document has scrolled.
- **The only documented technique that puts an image behind the status bar at rest is a "scroll runway"** (1ar.io, 2026-05-13). The page loads scrolled down by about 62px, so `scrollY` is never 0 at rest.
  - Inference: tapping the status bar or pulling down shows the runway or the flat color again.
- **The bottom toolbar is easier.** With `viewport-fit=cover` and a non-transparent root, page content draws behind the floating bar, and a hero sized with `lvh` can fill the area under it. No source claims a document-end image fails behind the bottom bar.

## 1. What Safari 26/27 does at the page edges

### Primary sources (Apple and WebKit)

- **Safari 26.0 release notes** ([JSON](https://developer.apple.com/tutorials/data/documentation/safari-release-notes/safari-26-release-notes.json)):
  - No entry for theme-color, tint, status bar, safe-area, or viewport-fit.
  - The only related entry is the new WKWebView API: "Added a new `obscuredContentInsets` property to WKWebView that allows developers to specify areas of the web view that are covered by browser UI elements like tab bars or toolbars. Set this property to automatically adjust the layout viewport so web content renders within the visible area without being obscured by overlapping interface elements. (155921447)"
- **Safari 26.1 release notes:** "Fixed a bottom gap appearing on layouts with viewport-sized fixed containers on iOS. (158055568)"
- **Safari 26.2 release notes:**
  - "Fixed an issue where fullscreen dialog backdrops did not properly extend below the address bar by extending the backdrop's background into obscured inset areas. (163535684)"
  - "Fixed an issue where sticky elements at the edge of the viewport could disappear during rubber band scrolling. (160385933)"
- **Safari 26.4 release notes:** "Fixed an issue where WKWebView apps with a toolbar would fail to display a top scroll edge effect when relying on automatic content inset adjustments. (161370795)"
  - This note confirms that WebKit's scroll view uses the UIKit scroll edge effect and automatic content insets.
- **Safari 27 release notes:**
  - "Fixed top and bottom fixed-position elements flickering during rubber-band scrolling. (176226179)"
  - "Fixed rubberbanding behaving incorrectly when a site triggers a smooth scroll to the top during a rubberband. (170705188)"
  - No entry about tint or the status bar.
- **WebKit blog posts:** [Safari 26 beta (WWDC25)](https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/), [Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/), and [Safari 27 beta (WWDC26)](https://webkit.org/blog/17967/news-from-wwdc26-webkit-in-safari-27-beta/).
  - None mentions theme-color deprecation, color extension, or status-bar behavior.
  - The 26.0 post says: "By default, every website added to the Home Screen opens as a web app."
- **WWDC26 session 204, "What's new in WebKit for Safari 27"** ([video](https://developer.apple.com/videos/play/wwdc2026/204/)): the transcript does not mention the topic.
- **WebKit bug 301756** ([link](https://bugs.webkit.org/show_bug.cgi?id=301756)), "Clarification: Top bar tint in Safari is derived from page background". Status NEW. Wenson Hsieh (Apple) wrote on 2025-11-07:
  - "this current behavior (white background for the top toolbar) seems expected."
  - "A solid background color extension ("top bar tint") is only needed in cases where there's a viewport-constrained (fixed or sticky) element near one of the edges of the viewport ... in order to avoid a gap above or below fixed elements in the page that would otherwise appear."
  - "This color extension behavior is more critical on iPhone, where there's a much "softer" blur effect."
- **WebKit bug 300965** ([link](https://bugs.webkit.org/show_bug.cgi?id=300965)), "Dialog backdrop doesn't extend below address bar". RESOLVED FIXED in 301911@main by Wenson Hsieh.
  - Alexey Proskuryakov (Apple) wrote on 2025-11-26: "At this point, we believe that this obvious solution would break more websites than it would fix."
  - On 2025-11-30 he wrote: "it's fixed - in that the situation is detected, and both top and bottom become solid color."
- **WebKit bug 317153** ([link](https://bugs.webkit.org/show_bug.cgi?id=317153)), "REGRESSION (iOS 27.0): Status bar remains visible in fullscreen mode in Home Screen Web apps". RESOLVED FIXED.
  - Luming Yin (Apple) wrote on 2026-06-16: "The black-translucent status bar mode has been deprecated for multiple releases." He also wrote: "Home Screen web apps does not support drawing arbitrary content below the status bar."
  - Later comments say beta 4 fixed the reported regression.
- **Ending theme-color in tabs:**
  - No Apple statement exists.
  - An MDN browser-compat-data PR ([mirror](https://gh.r-mj.com/mdn/browser-compat-data/pull/28503)) proposes the note "only used for installed web apps from Safari 26".
  - A maintainer disputed the change, because WebKit still has the theme-color code.

### Community sources (dated, with tests)

- **1ar.io, "Safari 26 Liquid Glass: toolbar tinting, white bars, viewport bugs"** (Pavel Larionov, 2026-05-13, [link](https://1ar.io/updates/safari-26-liquid-glass-web/)). Tested on real devices.
  - "At `scrollY = 0`, Safari often uses the sampled or fallback root color."
  - After the page scrolls, Safari "can composite real page pixels behind the top status area."
  - "Without `viewport-fit=cover`, the page content stops at the safe area boundary." With it, "content extends behind the toolbar, giving Liquid Glass something to show through."
  - "Transparent root backgrounds can fall back to white."
  - Root background images and video are "not reliable as toolbar tint input."
  - Technique: a "scroll runway". The fix makes `body` `min-height: calc(100dvh + 62px)`, gives the app `margin-top: 62px`, calls `scrollTo(0, 62)` on load, and lets the media bleed 62px above and 136px below the viewport.
- **HawkShift, "iOS 26 Safari status bar: page behind the clock"** (2026-09-24, [link](https://hawkshift.com/research/ios-26-safari-status-bar)). 26 setups on one iPhone in a normal tab.
  - Safari "decides from one thin band a few pixels below the top of the screen" (about 4px).
  - The tests say "Nothing pinned → the page shows."
  - "Only normal, scrolling content passes behind the status bar."
  - "Safari never drew pinned content there, even 80px above the top."
  - Safari treats translucent and backdrop-blur headers as opaque strips.
  - A transparent header with `pointer-events: none` is skipped.
  - A gradient or image background on a pinned element is sampled to one flat color, and the color can freeze.
  - The author cites WebKit `LocalFrameView::fixedContainerEdges`.
  - **Caveat:** the article does not say whether "page shows" was at `scrollY = 0` or after a scroll. It does not show the viewport meta tag either. Its intro describes sites where you "scroll them up and, instead of the page, you see a flat band of colour."
- **andesco/safari-color-tinting** ([GitHub](https://github.com/andesco/safari-color-tinting)) documents the sampling rules:
  - Safari uses the `body` background, then the `html` background, then white or black.
  - A fixed or sticky element wins if it is within 4px of the top or 3px of the bottom and is at least 80% wide (iOS) and at least 3px tall.
  - `backdrop-filter` elements, `display:none` elements, and pseudo-elements are not sampled.
  - "`viewport-fit=cover` ... is required for controlling the bottom bar tint."
- **Ben Frain** (2025-11-16, [link](https://benfrain.com/ios26-safari-theme-color-tab-tinting-with-fixed-position-elements/)): "In iOS26, Safari dropped support for/broke theme-color." He describes fixed elements that color the "forehead" and "chin".
- **Hacker News, user sheept** ([link](https://news.ycombinator.com/item?id=48336096)): "Currently, it is not possible to use viewport-fit=cover to show content under the status or address bars in iOS 26 Safari." n_e replied that it works in landscape.
- **ember-mobile-drawer issue #113** (2026-11-01, iOS 27.2 simulator plus one real iPhone, [link](https://github.com/nickschot/ember-mobile-drawer/issues/113)).
  - When the page was scrolled to y=932, the status bar showed the page with "Safari's gradual blur."
  - "A fixed `<body>` alone makes the bar solid."
  - The page was not tested at y=0.
- **bryanlaiwei/portfolio PR #13** (2026-10-27, iOS 26.5 simulator, [link](https://github.com/bryanlaiwei/portfolio/pull/13)).
  - At the top, "the strip is the photo's average colour."
  - The fix fades the photo into that color over the first 72px.
  - This matches our observation.
- **AngelGerena/halo PR #81** (2026-10-28, [link](https://github.com/AngelGerena/halo/pull/81)): the fix sets the body background to the hero's top-edge color while the hero is visible. This means a flat strip, not the image.

### safe-area-inset-top

- **Safari tab:** no primary source gives a value.
  - Inference from the 26.0 `obscuredContentInsets` note and the 26.4 "automatic content inset adjustments" note: WebKit's UIScrollView content inset puts the document's top edge below the status bar at scroll 0.
  - Content scrolls under the bar only after the scroll offset passes that inset. This is standard UIKit `contentInset` behavior and matches the observation.
- **Home Screen web apps:** bug 301994 ([link](https://bugs.webkit.org/show_bug.cgi?id=301994)) reports `env(safe-area-inset-top)` = 0 since iOS 26.1, where 26.0 gave about 44pt.
  - Users say 26.2 fixed it. Marcos Caceres reopened it for the iOS 27 beta on 2026-08-04.

## 2. Image visible behind the status bar at scroll 0 (normal tab, document scroll)

- **No primary source** (Apple demo, WebKit test, or Apple engineer) shows or describes an image behind the status bar at `scrollY = 0` in a non-standalone iOS 26+ tab.
- **Only technique found:** the 1ar.io scroll runway. The document is scrolled to about 62px on load, and the media bleeds above the visible area.
  - Inference: tapping the status bar scrolls to 0 and shows the flat strip again. Pull-down overscroll shows the same flat strip.
- **HawkShift "nothing pinned → page shows"** is the only possible counterexample, but its scroll position is unclear (see above). A native test should copy its setup:
  - nothing fixed or sticky in the top 4px band
  - a colorful scrolling background
  - test both with and without `viewport-fit=cover`
- **Bottom toolbar at the document end:**
  - [Serubin/Serubin-net PR #97](https://github.com/Serubin/Serubin-net/pull/97) (2026-10-22) runs the hero under the floating bottom toolbar with `lvh`-tall snap slots that hold `dvh`-tall sections. It has no screenshots or device evidence.
  - [llun/activities.next PR #2470](https://github.com/llun/activities.next/pull/2470) (2026-10-15) says that without `viewport-fit=cover` "iOS keeps the layout viewport inside the safe area", which "produces the solid bar from iOS 26 onward". It was not tested on a device.

## 3. Candidate URLs for native counterexample tests

I fetched the viewport meta tags on 2026-11-02 with an iPhone user agent. "cover" means the page sets `viewport-fit=cover`. I did not check header opacity on a device, so verify it.

| #   | URL                                  | Structure / why                                                                                                                                                          |
| --- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | https://www.tesla.com/               | Transparent fixed nav over a full-bleed video. Full-screen sections with snap. The last section is an image with a footer overlay. The bot block stopped the meta check. |
| 2   | https://www.apple.com/iphone-17-pro/ | cover. Dark hero. The global nav is not fixed; the local nav is sticky further down.                                                                                     |
| 3   | https://www.apple.com/vision-pro/    | cover. Full-bleed dark video and image hero.                                                                                                                             |
| 4   | https://www.apple.com/airpods-max/   | cover. Full-bleed product image hero.                                                                                                                                    |
| 5   | https://www.apple.com/environment/   | cover. Full-bleed nature photography sections.                                                                                                                           |
| 6   | https://stripe.com/                  | cover. Animated WebGL canvas gradient behind a transparent nav.                                                                                                          |
| 7   | https://linear.app/                  | cover plus `height=device-height`. Dark hero. It tests the bug 301108 meta case.                                                                                         |
| 8   | https://teenage.engineering/         | cover. Image-led product pages.                                                                                                                                          |
| 9   | https://www.spacex.com/              | Full-bleed video hero, transparent nav, dark image sections down to the footer. No cover.                                                                                |
| 10  | https://www.rivian.com/              | Video hero under a transparent nav. theme-color #000. No cover.                                                                                                          |
| 11  | https://lucidmotors.com/             | Video hero under a transparent nav. theme-color #000.                                                                                                                    |
| 12  | https://www.blueorigin.com/          | Full-bleed video and image, dark. theme-color #000.                                                                                                                      |
| 13  | https://bruno-simon.com/             | Full-screen WebGL canvas. Probably not document scrolling, so it only shows the canvas case.                                                                             |
| 14  | https://www.chrisburkard.com/        | Photographer portfolio with full-bleed photos. Uses a `minimal-ui` viewport.                                                                                             |
| 15  | https://www.aman.com/                | Full-bleed hotel photography hero with a light nav. theme-color #f3eee7, so it tests whether the sampled color matches theme-color or the photo.                         |

## 4. WebKit bugs

| Bug                                                      | Title (short)                                                                                       | Status                                                                                                              | Key quote                                                                                                                                                          |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [301108](https://bugs.webkit.org/show_bug.cgi?id=301108) | REGRESSION (iOS 26): viewport meta does not work for `viewport-fit=cover` or `height=device-height` | NEW, InRadar (rdar://163501215), no Apple comment                                                                   | Reporter (2026-01-20): "at some point this was fixed and I no longer see content behind the header"; "your color guessing game fails ... toggling dark/light mode" |
| [301756](https://bugs.webkit.org/show_bug.cgi?id=301756) | Top bar tint is derived from the page background                                                    | NEW                                                                                                                 | Wenson Hsieh: tint "only needed ... where there's a viewport-constrained (fixed or sticky) element near one of the edges"                                          |
| [300965](https://bugs.webkit.org/show_bug.cgi?id=300965) | Dialog backdrop does not extend below the address bar                                               | FIXED in 301911@main and shipped in 26.2                                                                            | "both top and bottom become solid color"                                                                                                                           |
| [303167](https://bugs.webkit.org/show_bug.cgi?id=303167) | Follow-up for the dialog backdrop                                                                   | Filed 2025-11-26 (status not checked)                                                                               | n/a                                                                                                                                                                |
| [305546](https://bugs.webkit.org/show_bug.cgi?id=305546) | Safari 26.2: status bar background replaced by a shadow on soft navigation                          | NEW, assigned to pascoe@apple.com, [PR 60377](https://github.com/WebKit/WebKit/pull/60377) not merged as of 2026-06 | "setting theme-color ... has no effect"                                                                                                                            |
| [301994](https://bugs.webkit.org/show_bug.cgi?id=301994) | iOS 26.1: status bar visible in fullscreen Home Screen apps; top inset 0                            | REOPENED for the iOS 27 beta                                                                                        | "a permanent solid rectangle of colour behind the status bar"                                                                                                      |
| [317153](https://bugs.webkit.org/show_bug.cgi?id=317153) | iOS 27: black-translucent status bar in Home Screen apps                                            | FIXED (beta 4)                                                                                                      | Apple: "does not support drawing arbitrary content below the status bar"                                                                                           |
| [316008](https://bugs.webkit.org/show_bug.cgi?id=316008) | Wrong 100vh and lvh in standalone apps without the status-bar-style meta                            | NEW, InRadar                                                                                                        | n/a                                                                                                                                                                |
| [237696](https://bugs.webkit.org/show_bug.cgi?id=237696) | [iOS] Fix `overscroll-behavior` for the main document                                               | FIXED r291198 (2022-03)                                                                                             | Simon Fraser: "I don't think we want to set this on the root scroll view"                                                                                          |
| [312813](https://bugs.webkit.org/show_bug.cgi?id=312813) | nfl.com smooth `scrollTo` during rubber-band leaves a negative offset                               | FIXED 311641@main (2026-04)                                                                                         | n/a                                                                                                                                                                |
| [228259](https://bugs.webkit.org/show_bug.cgi?id=228259) | `underPageBackgroundColor` changes the scroll bar color                                             | Patch reviewed 2021-07                                                                                              | No bug found about images in `underPageBackgroundColor`. The API is a single UIColor, so the overscroll area cannot show an image.                                 |
| 247231 (macOS)                                           | A linear-gradient or JPEG background "wins" over theme-color for the overscroll color               | Seen in search only, not opened                                                                                     | n/a                                                                                                                                                                |

## Facts and inferences

- **Sourced facts:**
  - Apple has no documentation.
  - Apple engineers call color extension a solid fill for edge-pinned elements.
  - Home Screen apps cannot draw content under the status bar.
  - Several dated community tests report a flat sampled strip at the top at rest, and real pixels after scroll.
- **Inferences:**
  - The top inset at scroll 0 comes from UIKit `contentInset` or obscured insets.
  - No CSS can move the document origin above that inset in a normal tab, so only a non-zero resting scroll offset (the runway) shows an image there.
  - A pull-down overscroll at 0 shows the flat extension color, not the image.
