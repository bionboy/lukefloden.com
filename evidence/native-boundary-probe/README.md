# Native Safari boundary tests, 2026-10-30

No tested layout met all requirements of [issue #37](https://github.com/bionboy/lukefloden.com/issues/37).
The application code remains at `8c7d633`.
These files are diagnostic fixtures, not application code or a proposed production workaround.

## Environment

- lilac, iPhone 17 Pro simulator, iOS 27.0, native Safari.
- Portrait, 402 × 874 points. Screenshots use one pixel per point.
- Served locally over HTTPS at `https://127.0.0.1:4287/`.
- The image is a copy of `src/lib/assets/images/gradient-blur-texture.jpg`.
- Magenta is an intentional diagnostic fallback color. It makes exposed native background areas visible.
- The scheduled check succeeded. Its schedule is disabled and has no next run.

## Reproduction

Serve this directory over HTTPS with a certificate the simulator trusts.
Open `ordinary.html` in native Safari with the device tools.
The status area shows a flat magenta strip while the image starts below it.
The image must continue behind the controls for the test to pass.

The initial test reported:

```text
top: 100% diagnostic fallback; FAIL
bottom: 0% diagnostic fallback; PASS
```

The sample is the leftmost 30 points, from 5 to 45 points below the screen top.
The ordinary case was reproduced twice before testing alternatives.
The outer edges of the native bars are part of this test; desktop browser emulation cannot replace it.

A magenta tint over varied image pixels does not establish a flat fallback strip.
Later checks also measured variation in the sampled RGB values and inspected the image.
The failed ordinary variants had an RGB range of only one, rather than visible image variation.

## CSS tests

Each row changes the stated property from the ordinary fixture.
All rows below still showed the flat fallback strip at the document start.

| Variant                | Change                                                                                        |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| Default viewport       | Remove `viewport-fit=cover`.                                                                  |
| Body background        | Paint the background on the body instead of html.                                             |
| Fixed image            | Paint an oversized fixed pseudo-element behind the page.                                      |
| Overflow image         | Paint an absolute pseudo-element above and below the document.                                |
| Negative root position | Set `position:relative; top:-100px; padding-top:100px` on html.                               |
| Root transform         | Translate html upward by 100px and add equal padding.                                         |
| Negative root margin   | Set `margin-top:-100px; padding-top:100px` on html.                                           |
| Fixed background       | Set `background-attachment:fixed`.                                                            |
| Compositing hint       | Set `will-change:transform` on html.                                                          |
| Transparent canvas     | Use transparent html with an oversized fixed image. The fallback becomes a flat system color. |
| Clip margin            | Set `overflow:clip; overflow-clip-margin:100px` on html.                                      |
| Repeated image         | Repeat the image across viewport-sized background tiles.                                      |
| Safe-area padding      | Paint the body background and add the safe-area padding.                                      |

The previously used larger document with an inner scroller remained the control.
It kept image detail behind both native controls, but retained the native-control failure from PR #36.

## CSS snap area

`snap.html` uses document scrolling, a large snap area, and one large viewport of padding at each edge.
It can move the initial view away from the outer document edge.
The native status-bar tap still reaches the outer start, leaving blank image space before the content.
Adding a separate first snap marker did not correct the native tap.

- [Recording of scrolling and native taps](snap-native-tap.mp4)
- [Screen after the native tap](snap-after-native-tap.png)

This is a failure of the tested oversized snap layout.
It does not mean that status-bar scrolling fails on every page that uses CSS snapping.
WebKit's [older general snap-to-top bug](https://bugs.webkit.org/show_bug.cgi?id=255592) is marked fixed.

## JavaScript bounds

`bounded.html` keeps the native root scroller and clamps its position between the content boundaries.
The fixture includes visible measurements to distinguish layout state from native rendering.

The native tap changes the measured position from `y=1284` to the intended minimum of `y=754`.
However, the rendered page exposes a large magenta fallback area.
The failure remains after settling.
A correct numeric scroll position therefore does not establish a correct rendered result.

- [Recording of the native taps](bounded-native-tap.mp4)
- [Screen after the native tap](bounded-after-native-tap.png)
- [Inspected frames during movement](bounded-motion-frames.jpg)

I decoded the recordings and inspected frames during the native scroll animation.
Neither workaround was added to the application.

## Browser implementation

Three WebKit paths explain the observed constraint:

- [`insetClipLayerRect`](https://github.com/WebKit/WebKit/blob/82e38652261d445230604088d5c1943783b0f2e7/Source/WebCore/page/LocalFrameView.cpp#L2764) clips the obscured region at the document boundaries.
- [`calculateExtendedBackgroundMode`](https://github.com/WebKit/WebKit/blob/82e38652261d445230604088d5c1943783b0f2e7/Source/WebCore/page/LocalFrameView.cpp#L4572) returns no extended image mode on iOS.
- [`baseScrollViewBackgroundColor`](https://github.com/WebKit/WebKit/blob/82e38652261d445230604088d5c1943783b0f2e7/Source/WebKit/UIProcess/API/ios/WKWebViewIOS.mm#L677) selects a color for the native scroll-view background.

These sources and tests support a browser boundary constraint.
They do not prove that every possible website layout must fail.
The inspected WebKit commit is not asserted to be the simulator's exact engine revision.
[WebKit issue 301108](https://bugs.webkit.org/show_bug.cgi?id=301108) tracks related viewport coverage problems.

## Decision still needed

The current draft restores the native controls but exposes solid backgrounds at the true document edges.
PR #36 preserves the images by avoiding those edges, at the cost of the native controls.
The tested snap and clamp alternatives do not combine both behaviors correctly.

No requirement was relaxed, and no workaround was added to application code.
Before proceeding with a design that permits solid colors at the true document edges, Luke must approve that change to #37.
A real iPhone, iOS 26, other routes, landscape, and the complete navigation matrix are not covered by these fixture tests.
