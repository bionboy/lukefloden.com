<script lang="ts">
	import bgImg from '$lib/assets/images/gradient-blur-texture.jpg?enhanced&blur=100';
	import FullStaticBackground from '$lib/components/FullStaticBackground.svelte';

	let { children } = $props();
</script>

<FullStaticBackground imgSrc={bgImg} />

<div class="page">
	{@render children()}
</div>

<style lang="postcss">
	.page {
		/* @apply relative flex flex-col; */
		view-transition-name: page-content;
	}
</style>
