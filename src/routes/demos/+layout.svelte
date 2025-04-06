<script lang="ts">
	import bgImg from '$lib/assets/images/gradient-blur-texture.jpg?enhanced&blur=100';
	import FullStaticBackground from '$lib/components/FullStaticBackground.svelte';
	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();

	const locations = [
		{ route: '/demos/internal', name: 'Internal' },
		{ route: '/demos/external', name: 'External' },
		{ route: '/demos/shaders', name: 'Shaders' }
	];
</script>

<FullStaticBackground imgSrc={bgImg} />

<div class="page">
	<Nav {locations} />
	{@render children()}
</div>

<style lang="postcss">
	.page {
		view-transition-name: page-content;
	}
</style>
