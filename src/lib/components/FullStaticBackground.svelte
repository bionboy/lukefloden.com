<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Picture } from 'vite-imagetools';

	let props: {
		imgSrc?: Picture;
		imgAlt?: string;
		children?: Snippet;
	} = $props();
	$inspect(props.imgSrc);
</script>

<div class="site-bg fixed -z-10 h-screen w-screen dark:brightness-50">
	{#if props.children}
		{@render props.children()}
	{:else if props.imgSrc}
		<enhanced:img
			src={props.imgSrc}
			class="size-full object-fill"
			alt={props.imgAlt || 'abstract colorful gradient background'}
		/>
	{/if}
</div>

<style lang="postcss">
	.site-bg {
		/* transition: background-color 0.5s; */
	}
</style>
