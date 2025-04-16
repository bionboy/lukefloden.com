<script lang="ts">
	import { mode, ThemeMode } from '$lib/theme';
	import { setDocumentBodyTailwind } from '$lib/setBackground';
	import Parallax from '../demos/internal/parallax/Parallax.svelte';
	import MetaBalls from '../demos/shaders/meta-balls/MetaBalls.svelte';
	import HoverGrid from '../demos/shaders/hover-grid/HoverGrid.svelte';
	import { Dices, Info } from 'lucide-svelte';
	import HomeDemoCard from './HomeDemoCard.svelte';
	import HeroPage from '$lib/components/HeroPage.svelte';

	const demos = [
		{
			component: MetaBalls,
			route: '/demos/shaders/#meta-balls'
		},
		{
			component: Parallax,
			props: { title: '', moveWithScroll: false },
			route: '/demos/internal/parallax'
		},
		{
			component: HoverGrid,
			route: '/demos/shaders/#hover-grid',
			hasOpaqueIsland: true
		}
	];

	let demoIndex = $state(0);
	const opaqueIslandBg = $derived(demos[demoIndex].hasOpaqueIsland);
	const DemoToDisplay = $derived(demos[demoIndex]);

	const nextDemo = () => (demoIndex = (demoIndex + 1) % demos.length);

	setDocumentBodyTailwind($mode !== ThemeMode.DARK ? 'bg-[hsl(180,100%,55%)]' : 'bg-accent');
</script>

<svelte:window
	onkeypress={(e: KeyboardEvent) => {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		nextDemo();
	}}
/>

<HeroPage>
	<!-- *  using 60% of max viewport dimension and scaling instead of 110%
       *  to avoid performance issues with resolution being too high -->
	<div class="aspect-square h-[max(75vh,75vw)] scale-[1.5]">
		<!-- {#key demoIndex} -->
		{/* @ts-expect-error: its ok if props is missing */ null}
		<DemoToDisplay.component {...DemoToDisplay.props} />
		<!-- {/key} -->
	</div>

	<div class="bottom-bar">
		<HomeDemoCard onclick={nextDemo} bgOpaque={opaqueIslandBg}>
			<Dices size={24} />
		</HomeDemoCard>

		<HomeDemoCard bgOpaque={opaqueIslandBg}>
			<div class="title pointer-events-none">
				<h1>Welcome to my site,</h1>
				<h1>
					things are in flux
					<!-- right now -->
					...
				</h1>
				<h1>but that's ok! ✨🌟💫</h1>
			</div>
		</HomeDemoCard>

		<a href={DemoToDisplay.route}>
			<HomeDemoCard
				bgOpaque={opaqueIslandBg}
				onclick={() => {
					/* black function to give this card button styles */
				}}
			>
				<Info size={32} />
			</HomeDemoCard>
		</a>
	</div>
</HeroPage>

<style lang="postcss">
	.bottom-bar {
		@apply fixed w-full
			px-4 bottom-4 
			flex items-end gap-4
			justify-between 
			2xl:justify-center
			2xl:gap-8
			pointer-events-none;
	}

	.title {
		& > h1 {
			@apply relative m-0 text-left;

			/* TODO: pick a better fallback font to avoid layout shift */
			/* font-family: 'Instrument Serif', cursive; */
			@apply font-jersey15;
			/* text-shadow: 0 0 30px; */

			@apply text-2xl sm:text-3xl lg:text-4xl tracking-widest
			/* leading-[4rem] */
			/* font-normal */
			/* dark:text-4xl md:dark:text-5xl  */
			/* dark:leading-[4rem] */;
		}
	}
</style>
