<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { afterNavigate, snapshot } from '$app/navigation';
	import { browser } from '$app/env';
	import { setPageScroll } from '#lib/page-scroll.js';

	let { children }: { children: Snippet } = $props();
	let viewport: HTMLDivElement;
	let position = $state({ x: 0, y: 0 });
	const nested = browser && CSS.supports('-webkit-touch-callout', 'none');

	setPageScroll({
		get x() {
			return position.x;
		},
		get y() {
			return position.y;
		},
		scrollTo(options) {
			(nested ? viewport : window).scrollTo(options);
		}
	});

	function parkDocument() {
		if (nested && viewport) {
			const screenBlock = screen.orientation.type.startsWith('landscape')
				? Math.min(screen.width, screen.height)
				: Math.max(screen.width, screen.height);
			document.documentElement.style.setProperty('--screen-block', `${screenBlock}px`);
			const padding = parseFloat(getComputedStyle(viewport).paddingTop);
			window.scrollTo({ top: viewport.offsetTop + padding, left: 0, behavior: 'instant' });
		}
	}

	function readViewportScroll() {
		if (nested) position = { x: viewport.scrollLeft, y: viewport.scrollTop };
	}

	function readWindowScroll() {
		if (!nested) position = { x: window.scrollX, y: window.scrollY };
	}

	snapshot({
		id: 'page-viewport-scroll',
		capture: () => ({ x: viewport.scrollLeft, y: viewport.scrollTop }),
		restore: ({ x, y }) => {
			if (nested) viewport.scrollTo({ left: x, top: y, behavior: 'instant' });
		},
		reset: () => {
			if (nested) viewport.scrollTo({ left: 0, top: 0, behavior: 'instant' });
		}
	});

	afterNavigate((navigation) => {
		if (!nested) return;
		const hash = navigation.to?.url.hash;
		if (navigation.type !== 'popstate' && hash) {
			document
				.getElementById(decodeURIComponent(hash.slice(1)))
				?.scrollIntoView({ block: 'start', behavior: 'instant' });
		}
		parkDocument();
		readViewportScroll();
	});

	onMount(() => {
		if (nested) document.documentElement.dataset.pageViewport = 'nested';
		parkDocument();
		readWindowScroll();
	});
</script>

<svelte:window onscroll={readWindowScroll} onresize={parkDocument} />

<div
	id="page-viewport"
	class="page-viewport relative flex flex-col"
	bind:this={viewport}
	onscroll={readViewportScroll}
>
	{@render children()}
</div>

<style>
	:global(html[data-page-viewport='nested']) {
		height: 300lvh;
		overflow: hidden;
		overflow-anchor: none;
		scroll-behavior: auto;
		view-transition-name: none;
	}

	:global(html[data-page-viewport='nested'] > body) {
		min-height: 300lvh;
	}

	:global(html[data-page-viewport='nested']) .page-viewport {
		--page-overscan: max(0px, var(--screen-block, 100dvh) - 100dvh);
		position: absolute;
		top: calc(100lvh - var(--page-overscan));
		left: 0;
		right: 0;
		height: calc(100dvh + 2 * var(--page-overscan));
		padding-block: var(--page-overscan);
		scroll-padding-block: var(--page-overscan);
		overflow-y: auto;
		overscroll-behavior-y: contain;
	}

	@media print {
		:global(html[data-page-viewport='nested']) {
			height: auto;
			overflow: visible;
		}

		:global(html[data-page-viewport='nested'] > body) {
			min-height: 0;
		}

		:global(html[data-page-viewport='nested']) .page-viewport {
			position: static;
			height: auto;
			padding-block: 0;
			overflow: visible;
		}
	}
</style>
