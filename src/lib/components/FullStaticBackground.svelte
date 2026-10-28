<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Picture } from 'vite-imagetools';

	let props: {
		imgSrc?: Picture;
		imgAlt?: string;
		children?: Snippet;
	} = $props();
</script>

<svelte:head>
	{#if props.imgSrc && !props.children}
		<svelte:element this={"style"}>
			{`body { --page-background-image: url("${props.imgSrc.img.src}"); }`}
		</svelte:element>
	{/if}
</svelte:head>

{#if props.children}
	<div class="site-bg fixed inset-0 -z-10 dark:brightness-50">
		{@render props.children()}
	</div>
{/if}

<style lang="postcss">
	:global(body) {
		--page-background-shade: transparent;
		min-height: 100lvh;
		background-image:
			linear-gradient(var(--page-background-shade), var(--page-background-shade)),
			var(--page-background-image, none);
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
	}

	:global(.dark body) {
		--page-background-shade: rgb(0 0 0 / 50%);
	}

	:global(body.bg-accent) {
		background-image: none;
	}

	.site-bg {
		view-transition-name: static-bg;
	}
</style>
