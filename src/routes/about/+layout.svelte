<script lang="ts">
	import bgImg from '$lib/assets/images/abstract-grainy-bg.jpg?enhanced&blur=100';
	import FullStaticBackground from '$lib/components/FullStaticBackground.svelte';

	let { children } = $props();
</script>

<FullStaticBackground imgSrc={bgImg}></FullStaticBackground>
<div class="page">
	{@render children()}
</div>

<style lang="postcss">
	.page {
		view-transition-name: page-content;
	}
</style>
