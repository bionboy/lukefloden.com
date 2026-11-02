# Broad native search for issue 37, 2026-11-02

No compliant layout was found.
This search adds a source-verified mechanism, 14 page captures across 13 sites, and additional structural fixture tests.
Some fixture ideas overlap earlier work; these counts do not represent independent architectures.
The application code is unchanged from `241d51a`.
This is a finite search. It is not an impossibility proof.

## Result

| Requirement                                     | Best tested result                                                                                   |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Status-bar tap, toolbar collapse                | Pass with root scrolling                                                                             |
| Image behind both bars mid-page                 | Pass with root scrolling                                                                             |
| Image during overscroll pulls                   | No continuity fix. `html{overscroll-behavior:none}` suppresses bounce but leaves the existing strip. |
| Image behind the status bar at the true top     | **Fail in every tested structure and real site**                                                     |
| Image behind the toolbar at the true end        | **Fail in every tested structure**                                                                   |
| Image during the tested view-transition fixture | **Fail**: flat strips at both edges, even mid-page. The actual app transition was not retested.      |

## Environment

- lilac, iPhone 17 Pro simulator, iOS 27.0, native Safari, portrait 402 × 874 points.
- Fixtures served over HTTPS from `fixtures/`. Copy `../native-boundary-probe/photo.jpg` next to them first.
- Magenta is a diagnostic root background. It is also Safari's under-page color, so a flat magenta area is the scroll-view background.
- Each fixture prints a HUD: `sy` scroll position, `ih` innerHeight, `sat` `env(safe-area-inset-top)`.
- Not covered: a real iPhone, iOS 26, landscape, and other Safari tab layouts.

## Mechanism (source facts, verified at the pinned lines)

WebKit main [`b2c2fa38`](https://github.com/WebKit/WebKit/tree/b2c2fa38ebe72b1dc63599acdf2ae58c83e248ce), also checked on `safari-7625.2.8.18` `d953bbed`.

- `WKContentView` puts all web layers inside a `FixedClipping` view with `masksToBounds = YES`
  ([WKContentView.mm L283-L293](https://github.com/WebKit/WebKit/blob/b2c2fa38ebe72b1dc63599acdf2ae58c83e248ce/Source/WebKit/UIProcess/ios/WKContentView.mm#L283-L293)).
- Its bounds are the document rect united with the layout viewport
  ([L727-L737](https://github.com/WebKit/WebKit/blob/b2c2fa38ebe72b1dc63599acdf2ae58c83e248ce/Source/WebKit/UIProcess/ios/WKContentView.mm#L727-L737)).
- The layout viewport follows the unobscured rect, which is the view minus Safari's obscured insets.
  Safari sets these insets in closed code.
- A second clip in `RenderLayerBacking::updateCompositedBounds` cuts untransformed composited layers to the document or layout viewport.
  A transform skips that clip, but not the first one.
- Root `overscroll-behavior-y: none` turns off the main scroll view bounce. WebKit reads it only from `<html>`.

Inference: at the true top, the status-bar strip lies above document y=0 and above the layout viewport.
At the true end, the toolbar strip lies below both.
The clip then removes every web layer there, and the scroll view's single background color shows.
This matches every native result below.
The open lever is Safari's inset policy. `viewport-fit=cover` is the only page input found that reaches it, and all fixtures already use it.

Full notes: [WebKit source notes](webkit-source-notes.md), [web research notes](web-research-notes.md).

## Map of approaches

This table includes new structures, related variants, real-page screening, and one rejected prototype.
It must not be read as a count of independent successful implementations.

The site captures include consent and region dialogs. Those dialogs can affect Safari's edge colors.
The 14 captures also include two Apple pages, so they cover 13 sites.
They establish only the captured page states; they are not controlled counterexample tests of every underlying layout.

| #   | Structure                                      | What changes                                               | Pass criterion                            | Native result                                                                                                      |
| --- | ---------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 1   | Real pages, 14 captures across 13 sites        | Third-party DOMs: video heroes, WebGL canvas, photo heroes | Image under the clock at scroll 0         | All captured states flat; some have dialogs. [1](sites-a.jpg) [2](sites-b.jpg) [3](sites-c.jpg)                    |
| 2   | Top layer: popover (new)                       | Image in the top layer at `top:-200px`                     | Image under the clock                     | Flat top; also adds a flat bottom strip. [image](s-escape1.jpg), panel 1                                           |
| 3   | Top layer: modal `::backdrop` (new)            | Viewport-wide backdrop image                               | Same                                      | Flat at both edges. Panel 2                                                                                        |
| 4   | Visual overflow: `border-image-outset` (new)   | Image painted 300px above the body box                     | Same                                      | Flat top. Panel 3                                                                                                  |
| 5   | `::view-transition` (new)                      | Snapshot layer with an image background                    | Image under both bars during a transition | Flat at both edges at the top and mid-page. [top](s-escape2.jpg), [mid-page](vt2.jpg)                              |
| 6   | Transformed oversized fixed image (new)        | `transform` skips clip B                                   | Image under both bars at the true edges   | Mid-page pass; true top and end flat. [image](tfixed.jpg)                                                          |
| 7   | Root `overscroll-behavior:none` (new)          | No bounce on the main scroll view                          | No flat area grows during pulls           | Bounce suppressed. Strips at rest remain; #37 still fails. [base](sheet-pull-base.jpg), [none](sheet-pull-osb.jpg) |
| 8   | Scroll runway from 1ar.io (new source)         | Load at `scrollY=62` with image above                      | Image after the native tap                | Load passes; the tap goes to y=0, flat strip. [image](runway.jpg), [frames](runway-tap-frames.jpg)                 |
| 9   | Reversed scroll origin, `column-reverse` (new) | Root flex reversal                                         | Root scroll with origin above             | Not root scrolling: the scroller became an inner box. Not valid                                                    |

Earlier families, for completeness: parked root with an inner scroller (#36), 13 root background variants, oversized snap areas, and JavaScript bounds.

## Review of real-page screening

The parent rechecked `https://www.chrisburkard.com/` in the same native simulator and rejected its consent dialog.
The [unobstructed page](chrisburkard-no-dialog.png) still shows a dark strip above its image.
This removes that dialog as the cause for this one page state.
It does not establish the page's DOM scroll offset or complete native-scroll behavior.
The other dialog-bearing captures remain screening observations.

## Notes on earlier observations

- **Unexplained `negfixed` text over the bottom strip.** Source inference: the fixed image is too large for a color-extension view.
  Clip B cuts the untransformed image at the layout viewport. Below it, the root background and document text show.
  Fixture 6 tests this. With a transform, the image fills the bars mid-page. So the strip was a clip, not a Safari overlay.
- **Did a diagnostic force the failure?** The magenta root only sets the under-page color.
  Real-page captures show flat strips in their own colors, but dialogs and headers confound some captures.
  Fixture 6 removes the body background and still fails at the edges.
- **Glass tint versus flat color.** Mid-page and after a runway load, the strip shows image texture under a magenta tint.
  At the true top and end, the strip has no texture. The frames show both cases.
- **View transitions.** The app uses view transitions for routes.
  Fixture 5 shows flat strips at both edges during a transition, even mid-page. The app was not retested here.

## Remaining hypotheses

- Safari's closed inset policy may respond to an input not found here. No source or test shows one.
- iOS 26, a real iPhone, and other tab layouts may differ. They are not substitutes under #37.
- A WebKit or Safari change could add image extension. [Bug 301756](https://bugs.webkit.org/show_bug.cgi?id=301756) is the closest open report.
