<script lang="ts">
	import { mode, ThemeMode } from '$lib/theme';
	import { setDocumentBodyTailwind } from '$lib/setBackground';
	import Parallax from '../demos/parallax/Parallax.svelte';
	import MetaBalls from '../demos/shaders/meta-balls/MetaBalls.svelte';
	import HoverGrid from '../demos/shaders/hover-grid/HoverGrid.svelte';
	import { Dices, Info } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	const demoCount = 3;
	let demoToDisplay = $state(0);

	function nextDemo() {
		demoToDisplay = (demoToDisplay + 1) % demoCount;
	}

	setDocumentBodyTailwind($mode !== ThemeMode.DARK ? 'bg-[hsl(180,100%,55%)]' : 'bg-accent');
</script>

<svelte:window
	onkeypress={(e: KeyboardEvent) => {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		nextDemo();
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

	<div
		class="fixed bottom-4 w-full
			flex items-end justify-between
	"
	>
		<!-- <Button class="island h-fit mx-4" variant="ghost" onclick={nextDemo}> -->
		<button class="island demo-button" onclick={nextDemo}>
			<Dices size={24} />
		</button>
		<!-- </Button> -->

		<div class="island title pointer-events-none">
			<h1>Welcome to my site...</h1>
			<h1>
				things are in flux
				<!-- right now -->
				...
			</h1>
			<h1>but that's ok...</h1>
		</div>

		<button class="island demo-button invisible">
			<Info size={32} />
		</button>
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

	.island {
		@apply border-accent border-[1px] backdrop-blur-sm p-4 rounded-xl;
		background-color: oklch(from hsl(var(--accent)) calc(l * 0.8) c h / 0.2);
	}

	.demo-button {
		@apply h-fit mx-4
		text-accent
		hover:text-accent-2
		hover:border-accent-2;
	}

	.title {
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
