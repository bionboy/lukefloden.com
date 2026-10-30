<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { setPageScroll } from '#lib/page-scroll.js';

	let { children }: { children: Snippet } = $props();
	let position = $state({ x: 0, y: 0 });

	setPageScroll({
		get x() {
			return position.x;
		},
		get y() {
			return position.y;
		},
		scrollTo(options) {
			window.scrollTo(options);
		}
	});

	function readWindowScroll() {
		position = { x: window.scrollX, y: window.scrollY };
	}

	onMount(readWindowScroll);
</script>

<svelte:window onscroll={readWindowScroll} />

<div id="page-viewport" class="relative flex flex-col">
	{@render children()}
</div>
