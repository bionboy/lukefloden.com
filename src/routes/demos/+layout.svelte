<script lang="ts">
	import bgImg from '$lib/assets/images/gradient-blur-texture.jpg?enhanced&blur=100';
	import FullStaticBackground from '$lib/components/FullStaticBackground.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { fade } from 'svelte/transition';

	let { children } = $props();

	const locations = [
		{ route: '/demos/internal', name: 'Internal' },
		{ route: '/demos/external', name: 'External' },
		{ route: '/demos/shaders', name: 'Shaders' }
	];
</script>

<FullStaticBackground imgSrc={bgImg} />

<!-- TODO: fix the view transition so that the nav stays in place while the rest of the page slides -->
<div class="asdf">
	<PageHeader let:headerMinimized class="max-w-64 mx-auto" hideOnScroll={false}>
		{#if !headerMinimized}
			<div class="mx-auto" transition:fade={{ duration: 300 }}>
				<Nav {locations} />
			</div>
		{/if}
	</PageHeader>
</div>
<div class="page">
	{@render children()}
</div>

<style lang="postcss">
	.page {
		/* @apply relative flex flex-col; */
		view-transition-name: page-content;
	}
	.asdf {
		view-transition-name: header;
	}
</style>
