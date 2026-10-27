<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import type { Picture } from 'vite-imagetools';

	let props: {
		imgSrc?: Picture;
		imgAlt?: string;
		children?: Snippet;
	} = $props();

	onMount(() => {
		if (!props.imgSrc || props.children) return;
		document.documentElement.style.setProperty(
			'--page-background-image',
			`url("${props.imgSrc.img.src}")`
		);
		return () => document.documentElement.style.removeProperty('--page-background-image');
	});
</script>

<div class="site-bg fixed inset-0 -z-10 dark:brightness-50">
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

	/* see /Users/bb/github/mine/my-site/src/view-transition.css  */
</style>
