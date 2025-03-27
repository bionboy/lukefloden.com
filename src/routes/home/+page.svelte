<script lang="ts">
	import { mode, ThemeMode } from '$lib/theme';
	import { setDocumentBodyTailwind } from '$lib/setBackground';
	import Parallax from '../demos/parallax/Parallax.svelte';
	import MetaBalls from '../demos/shaders/meta-balls/MetaBalls.svelte';
	import HoverGrid from '../demos/shaders/hover-grid/HoverGrid.svelte';

	const demoCount = 3;
	let demoToDisplay = $state(0);

	setDocumentBodyTailwind($mode !== ThemeMode.DARK ? 'bg-[hsl(180,100%,55%)]' : 'bg-accent');
</script>

<svelte:window
	onkeypress={(e: KeyboardEvent) => {
		console.log(e.key);
		if (e.key !== 'Enter') return;

		demoToDisplay = (demoToDisplay + 1) % demoCount;
	}}
/>

<!-- <div class="hero bg-background">
	<Parallax {titleContent}></Parallax>
</div> -->
<div class="hero center-container overflow-clip">
	<!-- *  using 60% of max viewport dimension and scaling instead of 110%
       *  to avoid performance issues with resolution being too high 
	<div class="aspect-square h-[max(110vh,110vw)]">
 -->
	<div class="aspect-square h-[max(60vh,60vw)] scale-[2]">
		{#if demoToDisplay === 0}
			<MetaBalls />
		{:else if demoToDisplay === 1}
			<Parallax title="" />
		{:else if demoToDisplay === 2}
			<HoverGrid />
		{/if}
	</div>

	<div class="fixed bottom-8 pointer-events-none m-0">
		<div class="title p-4 rounded-xl border-accent border-[1px] backdrop-blur-sm">
			<h1>Welcome to my site...</h1>
			<h1>
				things are in flux
				<!-- right now -->
				...
			</h1>
			<h1>but that's ok...</h1>
		</div>
	</div>
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

	.title {
		background-color: oklch(from hsl(var(--accent)) calc(l * 0.8) c h / 0.2);
		& > h1 {
			@apply relative m-0 text-left;

			/* TODO: pick a better fallback font to avoid layout shift */
			/* font-family: 'Instrument Serif', cursive; */
			@apply font-jersey15;
			/* text-shadow: 0 0 30px; */

			@apply text-accent 
			text-2xl sm:text-3xl lg:text-4xl tracking-widest
			/* leading-[4rem] */
			/* font-normal */
			/* dark:text-4xl md:dark:text-5xl  */
			/* dark:leading-[4rem] */;
		}
	}
</style>
