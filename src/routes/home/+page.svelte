<script lang="ts">
	import { mode } from 'mode-watcher';
	import type { PageData } from './$types';
	import Parallax from '../demos/parallax/Parallax.svelte';
	import Cloud from '$lib/components/Cloud.svelte';

	let { data }: { data: PageData } = $props();

	import { setDocumentBodyTailwind } from '$lib/setBackground';
	setDocumentBodyTailwind($mode !== 'dark' ? 'bg-[hsl(180,100%,55%)]' : 'bg-accent');
</script>

{#snippet titleContent()}
	{#if $mode === 'light'}
		<div class="absolute top-1/2 z-[1] scale-[1.8] sm:scale-[2.5] md:scale-[2.5] lg:scale-[3]">
			<Cloud />
		</div>
	{/if}
	<div class="title z-[2]">
		<h1>Welcome to my site...</h1>
		<h1>things are in flux right now...</h1>
		<h1>but that's ok...</h1>
	</div>
{/snippet}

<div class="hero bg-background">
	<Parallax {titleContent}></Parallax>
</div>
<div class="after-hero mt-[--after-hero-offset]">
	<!-- TODO(@bionboy, 2025-02-10): put some content here and add a gradient or something moving that shows the user they can scroll down -->
	<!-- <p>hey</p> -->
</div>

<style lang="postcss">
	:root {
		--hero-offset: -4rem;
		--hero-height: calc(100dvh - var(--hero-offset));
		--after-hero-offset: calc(100dvh + var(--hero-offset) + -2rem);
	}

	.hero {
		position: absolute;
		top: var(--hero-offset);
		height: var(--hero-height);
		width: 100vw;
	}

	.title > h1 {
		margin: 0px;
		text-align: left;
		/* TODO: pick a better fallback font to avoid layout shift */
		font-family: 'Instrument Serif', cursive;
		text-shadow: 0 0 30px;

		@apply text-accent 
			text-3xl sm:text-4xl  lg:text-5xl
			/* leading-[4rem] */
			font-normal
			dark:text-4xl md:dark:text-5xl 
			dark:leading-[4rem];
	}
</style>
