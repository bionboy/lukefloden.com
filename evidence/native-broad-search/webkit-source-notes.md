# WebKit source notes: web content in the iOS obscured-inset region (issue 37)

Pinned commits:

- **main** `b2c2fa38ebe72b1dc63599acdf2ae58c83e248ce` (2026-11-02). Links below use `M/` = `https://github.com/WebKit/WebKit/blob/b2c2fa38ebe72b1dc63599acdf2ae58c83e248ce/`.
- **safari-7625.2.8.18-branch** `d953bbedb514f5e274f9fa2465a8bc75391e891a` (newest `safari-762x` branch on the remote; no `safari-7626*`/`7630*` branch exists). `B/` = `https://github.com/WebKit/WebKit/blob/d953bbedb514f5e274f9fa2465a8bc75391e891a/`. Every key clip below was confirmed on this branch too (line numbers given where they differ).

Labels: **[S]** = source fact. **[I]** = inference. **[C]** = Safari closed code can override.

---

## 1. Why composited content at negative document y (or below document end) does not render

There are **two independent clips**. Either one is enough to hide the content.

### Clip A (UI process, the decisive one): `FixedClipping` view in `WKContentView`

- [S] `WKContentView` builds `_fixedClippingView` with `masksToBounds = YES`. All web layers (`_rootContentView`) are its subview.
  - M/Source/WebKit/UIProcess/ios/WKContentView.mm#L283-L293 (B/ L274-L284)
- [S] Its bounds = `WKContentView.bounds` (the document rect, `{-scrollOrigin, contentsSize}`) **united with** the layout viewport rect (`fixedPositionRectForUI`).
  - M/Source/WebKit/UIProcess/ios/WKContentView.mm#L727-L737 (B/ L630-L640)
  - document rect source: M/Source/WebKit/UIProcess/ios/WKContentView.mm#L1085-L1090
  - updated on every visible-rect update: M/Source/WebKit/UIProcess/ios/WKContentView.mm#L762-L782 and out-of-band M/Source/WebKit/UIProcess/API/ios/WKWebViewIOS.mm#L3455-L3464
- [S] The layout viewport comes from `WebPageProxy::computeLayoutViewportRect(..., Unconstrained)`. Its size is `max(baseLayoutViewportSize, unobscuredContentRect.size)`, and its origin follows the **unobscured** rect (it rubber-bands with it).
  - M/Source/WebKit/UIProcess/Cocoa/WebPageProxyCocoa.mm#L2656-L2721
  - M/Source/WebCore/page/LocalFrameView.cpp#L1866-L1891 and `computeLayoutViewportOrigin` L1894+
- [S] The unobscured rect is `self.bounds` inset by `_computedObscuredInset` (Safari's `_obscuredInsets` when set).
  - M/Source/WebKit/UIProcess/API/ios/WKWebViewIOS.mm#L3304-L3315, L839-L860
- [I] Result: the status-bar strip at scroll top and the toolbar strip at document end are outside **both** the document rect and the layout viewport, by construction. Nothing from the web content tree can paint there. The scroll view background (`underPageBackgroundColor`) shows.
- [I] During top rubber-band, the layout viewport moves to negative y with the unobscured rect. So the gap **between the status bar bottom and document y=0** is inside the clip for **fixed** content. The status-bar strip itself stays outside.
- [I] Mid-page, the inset strips are inside the document rect, so any content there is visible (unless a color-extension view covers it, see section 4).

### Clip B (web process): composited bounds clipped in `RenderLayerBacking::updateCompositedBounds`

- [S] For a composited layer, if `shouldClipCompositedBounds()`, its bounds are intersected with:
  - `rectForFixedPositionLayout()` (layout viewport) if the renderer is `position: fixed` with the RenderView as container;
  - otherwise `RenderView::unscaledDocumentRect()` (layout overflow rect).
  - M/Source/WebCore/rendering/RenderLayerBacking.cpp#L1190-L1215 (B/ L1055-L1068)
- [S] `shouldClipCompositedBounds()` returns **false** when the layer or an ancestor is transformed or uses composited scrolling, when captured in a view transition, or for `::view-transition-new`.
  - M/Source/WebCore/rendering/RenderLayerBacking.cpp#L1160-L1180 (B/ L1020-L1040)
- [S] `rectForFixedPositionLayout()` = `layoutViewportRect()` when visual viewport is on. M/Source/WebCore/page/LocalFrameView.cpp#L2279-L2285
- [S] The web-process layout viewport is computed `ConstrainedToDocumentRect`. M/Source/WebKit/UIProcess/API/ios/WKWebViewIOS.mm#L3346
- [I] So a non-transformed composited element at `top:-400px` gets no backing store above y=0. A transformed one keeps its backing store, but Clip A still hides it at scroll top.

### Things that are NOT the clip on iOS (checked)

- [S] `m_rootContentsLayer->setMasksToBounds(!backgroundShouldExtendBeyondPage)`. M/Source/WebCore/rendering/RenderLayerCompositor.cpp#L2397-L2400. `WebPageProxy::m_backgroundExtendsBeyondPage` defaults to **true** (M/Source/WebKit/UIProcess/WebPageProxy.h#L4354), so the root contents layer does **not** mask on iOS by default. [C] Safari can set `_backgroundExtendsBeyondPage`.
- [S] Main-frame scroll/clip layers (`m_clipLayer`, `m_scrollContainerLayer`) are only created when `requiresScrollLayer` (false for delegated iOS main frame). M/Source/WebCore/rendering/RenderLayerCompositor.cpp#L5222-L5266
- [S] Tile coverage is not clamped to the document: `visibleRectForLayerFlushing()` on iOS = `exposedContentRect()`, which is the full `WKWebView.bounds` in content coordinates, including obscured insets. M/Source/WebCore/rendering/RenderLayerCompositor.cpp#L803-L808; M/Source/WebKit/UIProcess/API/ios/WKWebViewIOS.mm#L2564-L2578
- [S] Overhang layers (`m_layerForTopOverhangColorExtension`, overhang image, `m_layerForOverhangAreas`) are under `HAVE(RUBBER_BANDING)`, which is Mac-only. M/Source/WebCore/rendering/RenderLayerCompositor.cpp#L3262-L3285; `Source/WTF/wtf/PlatformHave.h` L386-387.

### Constructs that were evaluated for an escape

| Construct                                                                           | Result                          | Reason                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Negative top / margins / root transform                                             | Clipped                         | Clip A (document rect) at scroll top; Clip B too if no transform                                                                                                                                                                                                                                                                                 |
| Scroll origin change (RTL, `vertical-lr` + `direction: rtl`, flipped writing modes) | No escape                       | [S] `adjustViewSize` sets scroll origin from `documentRect` (M/Source/WebCore/page/LocalFrameView.cpp#L603-L613), and `WKContentView` bounds use `-scrollOrigin` (L1088-L1090). The clip moves with the document. [I] The obscured strip is still outside the document rect.                                                                     |
| Root visual overflow (box-shadow, outline, filter)                                  | No escape                       | Visual overflow is not in `layoutOverflowRect`; Clip A uses the document rect                                                                                                                                                                                                                                                                    |
| `overflow-clip-margin`, `contain`, `clip`                                           | No escape                       | Clip A is a UIKit layer mask above all web layers                                                                                                                                                                                                                                                                                                |
| View-transition pseudos                                                             | Partial                         | Clip B skipped (L1168-L1171), Clip A still applies                                                                                                                                                                                                                                                                                               |
| Top layer (`<dialog>` `showModal`, popover, `::backdrop`)                           | No escape; gets color extension | [I] Top-layer boxes are fixed-positioned under RenderView, so Clip A/B apply. [S] `fixedContainerEdges` treats a `::backdrop` hit as a viewport-sized dimming container: color = backdrop background, else `pageExtendedBackgroundColor` (M/Source/WebCore/page/LocalFrameView.cpp#L2555-L2578). That makes a **color** extension, not an image. |
| Element fullscreen                                                                  | Not tested here                 | Uses a separate fullscreen window controller. Out of scope for a normal scrolling page.                                                                                                                                                                                                                                                          |

---

## 2. How the obscured insets and the content inset are computed; page-controllable inputs

- [S] `_setObscuredInsetsInternal:` stores insets from the embedder (Safari SPI `_obscuredInsets`). M/Source/WebKit/UIProcess/API/ios/WKWebViewIOS.mm#L270-L313. [C] **Safari decides these values.** WebKit open source does not compute Safari's toolbar or status-bar insets.
- [S] `_computedObscuredInset` returns `_obscuredInsets` when Safari set them. Otherwise it uses the scroll view system content inset plus safe area. M/Source/WebKit/UIProcess/API/ios/WKWebViewIOS.mm#L839-L873
- [S] `env(safe-area-inset-*)` = `max(0, safeArea - obscuredInsets)` per edge when Safari set insets. M/Source/WebKit/UIProcess/API/ios/WKWebViewIOS.mm#L877-L895 (B/ L875). [I] That is why `env(safe-area-inset-top)` = 0: Safari's top obscured inset ≥ the status-bar safe area. Covered by API test `WKScrollViewTests.SafeAreaEnvironmentVariablesAccountForObscuredContentInsets`.
- [S] `_automaticallyAdjustsViewLayoutSizesWithObscuredInset` folds obscured insets into layout size. M/Source/WebKit/UIProcess/API/ios/WKWebViewIOS.mm#L2621-L2622
- [S] Inset visibility and fling targets use obscured insets: `currentlyVisibleContentInsetsWithScale` L3262-L3286; `scrollViewWillEndDragging` L2212-L2231.
- [S] `layoutViewportHeightExpansionFactor` is 0 on iOS (only watchOS/tvOS). `Source/WTF/Scripts/Preferences/UnifiedWebPreferences.yaml` L3608-L3617.

### Page-controllable inputs found

1. **`viewport-fit=cover`** (the only page input in open source that reaches Safari's inset logic).
   - [S] `avoidsUnsafeArea = viewportFit != Cover`. M/Source/WebCore/page/ViewportConfiguration.cpp#L569
   - [S] Sent with each main-frame commit (`WebPageCocoa.mm` L2483) to `-[WKWebView _setAvoidsUnsafeArea:]`. That changes the scroll view `contentInsetAdjustmentBehavior` (Always ↔ Never) and calls the UI delegate `_webView:didChangeSafeAreaShouldAffectObscuredInsets:`. M/Source/WebKit/UIProcess/API/ios/WKWebViewIOS.mm#L3885-L3919, L1368; B/ L3704.
   - [C] Safari implements that delegate method. Safari can then reduce its top/bottom obscured insets so the document lays out under the bars. If that happens, `env(safe-area-inset-top)` becomes > 0 and document y=0 moves under the status bar. **Not verifiable from open source. Test natively.**
2. **`interactive-widget=resizes-content`** changes only the keyboard sizing source (M/Source/WebKit/UIProcess/Cocoa/WebPageProxyCocoa.mm#L2681-L2687). Not relevant to the bars.
3. `theme-color`, `color-scheme`, `apple-mobile-web-app-*`: no open-source effect on obscured insets. They feed colors (`themeColor`, `sampledPageTopColor`, `underPageBackgroundColor`) only. [C] Safari may use them for chrome tint.

---

## 3. Root `overscroll-behavior` on the iOS main scroll view

- [S] Getter reads `overscroll-behavior-x/y` from the **document element (`<html>`) renderer only**, with no body propagation. M/Source/WebCore/page/LocalFrameView.cpp#L7320-L7336 (B/ L7170)
- [S] On each main-frame commit, WKWebView calls `updateScrollViewForOverscrollBehavior(_scrollView, h, v, AllowOverscrollToPreventScrollPropagation::No)`. M/Source/WebKit/UIProcess/API/ios/WKWebViewIOS.mm#L1146-L1149 (B/ L1090)
- [S] That sets `_setBouncesInternal:(h != None) vertical:(v != None)`. M/Source/WebKit/UIProcess/RemoteLayerTree/ios/ScrollingTreeScrollingNodeDelegateIOS.mm#L374-L386 (B/ L355-L358)
- [S] `WKScrollView` effective bounce = `client bounces && internal`. M/Source/WebKit/UIProcess/ios/WKScrollView.mm#L511-L528
- [S] Gate: `OverscrollBehaviorEnabled`, status stable, default **true** (WebKit). `UnifiedWebPreferences.yaml` L4724-L4733.
- [I] `html { overscroll-behavior-y: none }` disables vertical rubber-band on the root scroll view. `contain` and `auto` keep the bounce, because only `None` is checked and propagation is ignored for the root. Layout test: `LayoutTests/fast/scrolling/ios/overscroll-behavior-on-body.html`. Despite its name, this test sets the style on `documentElement` and asserts that a drag does not scroll after `none`.

---

## 4. "Document text visible over the flat bottom strip mid-page" (fixed image extended 300px past both edges)

Source facts:

- [S] Fixed color-extension views are inserted **above** `_contentView` in the scroll view: `[parentView insertSubview:extensionView aboveSubview:_contentView]`. M/Source/WebKit/UIProcess/API/Cocoa/WKWebView.mm#L3594-L3610 (B/ L3529). API test `TopColorExtensionViewAfterRemovingRefreshControl` asserts `contentView` comes before the extension view in subview order. So a real fixed-edge extension view would **hide** text.
- [S] `fixedContainerEdges` hit-tests the midpoint of each viewport edge. For a fixed/sticky ancestor, it compares the length on that side and on the adjacent side with the viewport. If the adjacent length is > 1.05× viewport, the element is `TooLarge` and is **not** a container. M/Source/WebCore/page/LocalFrameView.cpp#L2400-L2420, L2470-L2515 (B/ `return TooLarge` L2469)
- [S] Clip B clips a non-transformed `position: fixed` composited layer to the layout viewport (section 1).

Inference:

- [I] The fixture image is about viewport + 600px tall, so it is `TooLarge` for the top and bottom edges. No bottom fixed container is found, so **no bottom color-extension view** is made.
- [I] The image's composited bounds are clipped to the layout viewport, whose bottom is near the unobscured bottom. Below that line, the image has **no backing store**. The root layer tiles show through there. Those tiles cover the whole exposed rect: the root background color (the flat strip) plus in-flow document text.
- [I] So the strip is the **root background painted in the root tile layer**, with document text painted over it. The strip is not a color-extension view and not the scroll-view background.
- [I] Check: add `transform: translateZ(0)` (or any transform) to the fixed image. This turns off Clip B, so the image should then paint under the bottom bar mid-page. It will still be absent at the true top and end, because of Clip A.

---

## 5. Relevant tests

API tests: `Tools/TestWebKitAPI/Tests/WebKit/WKWebView/ios/WKScrollViewTests.mm`

- `ColorExtensionViewsWhenZoomedIn` (L861): the top extension frame is `(0,-50,400,50)` with 50pt insets, and it moves with zoom and scroll.
- `ColorExtensionViewsDuringAnimatedResize` (L889): the top extension stays at `y=-50` during resize.
- `ShouldSuppressTopColorExtensionView` (L941): the SPI hides the top extension.
- `TopColorExtensionViewAfterRemovingRefreshControl` (L1001): checks subview order. The extension sits above `contentView`, and below the refresh control while it exists.
- `SafeAreaEnvironmentVariablesAccountForObscuredContentInsets` (L1068): safe area (66,10,34,10) with obscured insets (100,0,20,0) gives `env()` values top 0 and bottom 14.
- `ContentInsetAdjustmentBehaviorChangeAfterViewportFitChange` (L1093): with `viewport-fit=cover`, behavior is `Never` and the adjusted inset is zero. Without it, behavior is `Always`.
- `OverscrollBehaviorAndOverflowHiddenOnRootShouldNotPreventScrolling` (L418).
- `TopScrollPocketCaptureColorAfterSettingHardStyle` (L1031), `ClientCanHideScrollEdgeEffects` (L823).

API tests: `Tools/TestWebKitAPI/Tests/WebKit/WKWebView/ObscuredContentInsets.mm`

- Mostly Mac-only (top overhang color-extension layer, scroll pockets, banner overlays).
- `ScrollPocketCaptureColor`, `PreferSolidColorHardPocket`, and others are under `ENABLE(CONTENT_INSET_BACKGROUND_FILL)`.
- `SampledPageTopColor.mm` and `WKWebViewUnderPageBackgroundColor.mm` cover the color sources.

Layout tests:

- `LayoutTests/fast/scrolling/ios/`: `overscroll-behavior-on-body.html` (root `none` stops scroll and bounce), `overscroll-behavior-non-scrollable-document.html`, `content-size-change-during-rubberband.html`, `scroll-into-view-with-top-content-inset.html`, `fixed-position-in-vertical-rl.html`.
- `LayoutTests/fast/viewport/ios/`: `viewport-fit-auto|contain|cover.html`, `viewport-fit-auto-safe-area-inset-change.html`, `full-screen-safe-area-insets.html`, `scale-after-changing-horizontal-obscured-insets.html`.
- No test asserts that page content paints inside the obscured insets at scroll extremes.

---

## Candidates to test natively

1. **`viewport-fit=cover`** [C]. This is the only open-source path to Safari's inset decision.

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
   <style>
   	html {
   		background: url(bg.jpg) center/cover;
   		min-height: 100%;
   	}
   	body {
   		margin: 0;
   		padding-top: env(safe-area-inset-top);
   		padding-bottom: env(safe-area-inset-bottom);
   	}
   </style>
   ```

   - Read `getComputedStyle` of `env(safe-area-inset-top)` and `document.documentElement.getBoundingClientRect().top` at scroll top.
   - If the top value becomes > 0, the document lays out under the status bar, and the root image fills that area.

2. **Rubber-band gap and mid-page bars:** a viewport-anchored, transformed, oversize fixed image.

   ```html
   <div
   	style="position:fixed; left:0; right:0; top:-50vh; height:200vh; z-index:-1;
               background:url(bg.jpg) center/cover; transform:translateZ(0)"
   ></div>
   ```

   - `transform` turns off Clip B.
   - A height > 105% of the viewport avoids fixed-container color extension.
   - Expect the image under the bars mid-page and in the overscroll gap. Expect a flat color in the status-bar strip at the true top and in the toolbar strip at the true end (Clip A).

3. **`html { overscroll-behavior-y: none }`** removes the bounce, so the overscroll problem goes away.
