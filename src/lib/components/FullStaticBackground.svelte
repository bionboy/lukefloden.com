<script lang="ts">
	import type { Snippet } from 'svelte';

	let props: {
		imgSrc?: string;
		children?: Snippet;
	} = $props();
</script>

<div class="site-bg fixed -z-10 h-screen w-screen dark:brightness-50">
	{#if props.children}
		{@render props.children()}
	{:else if props.imgSrc}
		<img src={props.imgSrc} class="size-full object-fill blur" />
	{/if}
</div>

<style lang="postcss">
	.site-bg {
		/* transition: background-color 0.5s; */
	}
</style>
