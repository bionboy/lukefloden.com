<script lang="ts">
	import bgImg from '#lib/assets/images/abstract-grainy-bg.jpg?enhanced&blur=100';
	import FullStaticBackground from '#lib/components/FullStaticBackground.svelte';

	let { children } = $props();
</script>

<FullStaticBackground imgSrc={bgImg}></FullStaticBackground>
<div class="page about-page">
	{@render children()}
</div>

<style lang="postcss">
	:global(html:has(.about-page)),
	:global(body:has(.about-page)) {
		min-height: 100lvh;
		background-color: #a298eb;
		background-image: var(--page-background-image);
		background-size: 100% 100lvh;
		background-attachment: fixed;
	}

	:global(html.dark:has(.about-page)),
	:global(.dark body:has(.about-page)) {
		background-color: #514c76;
		background-image: linear-gradient(#00000080, #00000080), var(--page-background-image);
	}

	.page {
		view-transition-name: page-content;
	}
</style>
