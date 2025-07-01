<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Parallax from './parallax/Parallax.svelte';
	import AlwaysLevel from './always-level/AlwaysLevel.svelte';
	import DemoCard from '../DemoCard.svelte';
	import CoverUIScrollAnimation from './cover-ui-scroll-animation/CoverUIScrollAnimation.svelte';

	// For placeholder demo cards
	let placeholders = ['more', 'to', 'come', ':)'];
</script>

<div class="gallery">
	<DemoCard
		title="Cover UI Scroll Animation"
		description="A CSS only carousel inspired by &quot;Cover Flow&quot;"
		tags={['Svelte', 'CSS', 'Container Queries']}
		route="/demos/internal/cover-ui-scroll-animation"
	>
		<CoverUIScrollAnimation />
	</DemoCard>
	<DemoCard
		title="Parallax Hero"
		description="Parallax effect hero component, moving on scroll or mouse"
		tags={['Svelte', 'CSS']}
		route="/demos/internal/parallax"
		github="https://gist.github.com/bionboy/150a1f1c80a1df40737c5f0eec537b62"
	>
		<Parallax title="hi!" islandScale={0.3} />
	</DemoCard>
	<DemoCard
		title="Always Level"
		description="Keeping text on your screen level; despite your devices orientation"
		tags={['Svelte', 'Device Orientation API']}
		route="/demos/internal/always-level"
	>
		<div class="h-full flex place-content-center place-items-center bg-accent text-accent-2">
			<AlwaysLevel />
		</div>
	</DemoCard>

	<!-- * Fill in future spots, so for now our demo cards look less lonely  -->
	{#each placeholders.map((_, i) => i).filter((i) => placeholders[i]) as i (i)}
		<div animate:flip={{ duration: 500, delay: 100 }} transition:fade={{ duration: 200 }}>
			<DemoCard class="opacity-30" onremove={() => (placeholders[i] = '')}>
				<div class="h-full flex place-content-center place-items-center text-6xl">
					{placeholders[i]}
				</div>
			</DemoCard>
		</div>
	{/each}
</div>

<style lang="postcss">
	.gallery {
		@apply grid gap-4 m-5;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
</style>
