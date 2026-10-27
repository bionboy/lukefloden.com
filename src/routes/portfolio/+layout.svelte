<script lang="ts">
	import bgImg from '#lib/assets/images/gradient-blur-texture.jpg?enhanced&blur=100';
	import FullStaticBackground from '#lib/components/FullStaticBackground.svelte';

	let { children } = $props();
</script>

<FullStaticBackground imgSrc={bgImg} />

<div class="page portfolio-page">
	{@render children()}
</div>

<style lang="postcss">
	@reference '../../app.css';

	:global(html:has(.portfolio-page):not(:has(body.bg-accent))),
	:global(body:not(.bg-accent):has(.portfolio-page)) {
		min-height: 100lvh;
		background-color: #e5bf95;
		background-image: var(--page-background-image);
		background-size: 100% 100lvh;
		background-attachment: fixed;
	}

	:global(html.dark:has(.portfolio-page):not(:has(body.bg-accent))),
	:global(.dark body:not(.bg-accent):has(.portfolio-page)) {
		background-color: #725f4a;
		background-image: linear-gradient(#00000080, #00000080), var(--page-background-image);
	}

	.page {
		/* @apply relative flex flex-col; */
		view-transition-name: page-content;
	}
</style>
