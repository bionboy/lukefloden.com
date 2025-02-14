<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Picture } from 'vite-imagetools';

	let props: {
		imgSrc?: Picture;
		imgAlt?: string;
		children?: Snippet;
	} = $props();
</script>

<div class="site-bg fixed -z-10 h-screen w-screen dark:brightness-50">
	{#if props.children}
		{@render props.children()}
	{:else if props.imgSrc}
		<enhanced:img
			src={props.imgSrc}
			class="size-full object-fill"
			alt={props.imgAlt || 'abstract colorful gradient background'}
			loading="eager"
			fetchpriority="high"
		/>
		<!-- TODO(@bionboy, 2025-02-10):
		       - make sure i'm using 'sizes' correctly so it loads smaller ones faster
					 - make sure i need loading="eager"
					 - and fetchpriority="high".
		-->
		<!-- sizes="100px" -->
		<!-- sizes="min(1280px, 100vw)" -->
	{/if}
</div>

<style lang="postcss">
	.site-bg {
		view-transition-name: static-bg;
	}

	/* see /Users/bb/github/mine/my-site/src/view-transition.pcss  */
</style>
