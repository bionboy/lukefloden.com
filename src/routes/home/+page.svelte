<script lang="ts">
	import { mode, ThemeMode } from '$lib/theme';
	import { setDocumentBodyTailwind } from '$lib/setBackground';
	import Parallax from '../demos/parallax/Parallax.svelte';
	import MetaBalls from '../demos/shaders/meta-balls/MetaBalls.svelte';
	import HoverGrid from '../demos/shaders/hover-grid/HoverGrid.svelte';
	import { Dices, Info } from 'lucide-svelte';

	const demos = [
		{ component: MetaBalls },
		{ component: Parallax, props: { title: '', moveWithScroll: false } },
		{ component: HoverGrid, hasOpaqueIsland: true }
	];

	let demoIndex = $state(0);
	const opaqueIslandBg = $derived(demos[demoIndex].hasOpaqueIsland);
	const DemoToDisplay = $derived(demos[demoIndex]);

	function nextDemo() {
		demoIndex = (demoIndex + 1) % demos.length;
	}

	setDocumentBodyTailwind($mode !== ThemeMode.DARK ? 'bg-[hsl(180,100%,55%)]' : 'bg-accent');
</script>

<svelte:window
	onkeypress={(e: KeyboardEvent) => {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		nextDemo();
	}}
/>

<div class="hero center-container overflow-clip">
	<!-- *  using 60% of max viewport dimension and scaling instead of 110%
       *  to avoid performance issues with resolution being too high -->
	<div class="aspect-square h-[max(75vh,75vw)] scale-[1.5]">
		<!-- {#key demoIndex} -->
		{/* @ts-expect-error: its ok if props is missing */ null}
		<DemoToDisplay.component {...DemoToDisplay.props} />
		<!-- {/key} -->
	</div>

	<div
		class="bottom-bar fixed bottom-4 w-full
			flex items-end justify-between
			pointer-events-none
	"
		class:opaque-island-bg={opaqueIslandBg}
	>
		<button class="island demo-button pointer-events-auto" onclick={nextDemo}>
			<Dices size={24} />
		</button>

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
		position: fixed;
		top: var(--hero-offset);
		height: var(--hero-height);
		width: 100vw;
	}

	.bottom-bar {
		&.opaque-island-bg > .island {
			@apply bg-card;
		}
	}

	.island {
		--bg-color: var(--accent);
		background-color: oklch(from hsl(var(--bg-color)) calc(l * 0.8) c h / 0.2);

		@apply backdrop-blur-sm 
		outline
		outline-1
		outline-accent 
		p-4 rounded-xl;

		&.demo-button {
			@apply h-fit mx-4
				text-accent
				hover:outline-accent-2
				hover:outline-2
				hover:text-accent-2
				active:outline-4;

			&:hover {
				--bg-color: var(--accent2);
			}
		}
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
