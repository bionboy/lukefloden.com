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
			window.scrollTo({ top: viewport.offsetTop, left: 0, behavior: 'instant' });
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
		scroll-behavior: auto;
		view-transition-name: none;
	}

	:global(html[data-page-viewport='nested'] > body) {
		min-height: 300lvh;
	}

	:global(html[data-page-viewport='nested']) .page-viewport {
		position: absolute;
		top: 100lvh;
		left: 0;
		right: 0;
		height: 100dvh;
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
			overflow: visible;
		}
	}
</style>
