<script lang="ts">
	import bgImg from '$lib/assets/images/gradient-blur-texture.jpg?enhanced&blur=100';
	import FullStaticBackground from '$lib/components/FullStaticBackground.svelte';
	import DemoSelector from './DemoSelector.svelte';

	let { children } = $props();
</script>

<FullStaticBackground imgSrc={bgImg}></FullStaticBackground>

<div class="page">
	<DemoSelector />
	{@render children()}
</div>

<style lang="postcss">
	.page {
		view-transition-name: page-content;
	}
</style>
