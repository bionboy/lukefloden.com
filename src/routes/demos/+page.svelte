<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Parallax from './parallax/Parallax.svelte';
	import AlwaysLevel from './always-level/AlwaysLevel.svelte';
	import DemoCard from './DemoCard.svelte';
	import perlinPlaneImg from '$lib/assets/images/perlin-plane.png?enhanced';
	import granulp5 from '$lib/assets/images/granulp5.png?enhanced';

	let placeholders = ['more', 'to', 'come', ':)'];
</script>

<div class="gallery">
	<DemoCard
		title="Parallax Hero"
		description="Parallax effect hero component, moving on scroll or mouse"
		tags={['Svelte', 'CSS']}
		route="demos/parallax"
		github="https://gist.github.com/bionboy/150a1f1c80a1df40737c5f0eec537b62"
	>
		<Parallax title="hi!" />
	</DemoCard>
	<DemoCard
		title="Always Level"
		description="Keeping text on your screen level; despite your devices orientation"
		tags={['Svelte', 'Device Orientation API']}
		route="demos/always-level"
	>
		<div class="h-full flex place-content-center place-items-center bg-accent text-accent-2">
			<AlwaysLevel />
		</div>
	</DemoCard>
	<DemoCard
		title="Perlin Plane"
		description="An interactive 3d rendering of a 2d plane of 'perlin' noise. Made with three.js"
		tags={['Three.js']}
		route="https://bionboy.github.io/PerlinPlane/"
		github="https://github.com/bionboy/PerlinPlane"
	>
		<div class="demo-card-image">
			<enhanced:img
				class="rounded"
				alt="a 2d plane with generated hills based on a noise algorithm. The different heights correspond to different colors"
				src={perlinPlaneImg}
			/>
		</div>
	</DemoCard>

	<DemoCard
		title="Granulp5"
		description="A web granular sampler and visualizer using p5.js"
		tags={['p5.js']}
		route="https://bionboy.github.io/Granulp5/"
		github="https://github.com/bionboy/Granulp5"
	>
		<div class="demo-card-image">
			<enhanced:img
				class="rounded"
				alt="a 2d plane with generated hills based on a noise algorithm. The different heights correspond to different colors"
				src={granulp5}
			/>
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

	.demo-card-image {
		@apply size-full flex place-items-center overflow-clip rounded;
	}
</style>
