<script lang="ts">
	import DemoCard from '../DemoCard.svelte';
	import perlinPlaneImg from '$lib/assets/images/perlin-plane.png?enhanced';
	import granulp5 from '$lib/assets/images/granulp5.png?enhanced';
	import lilygemImg from '$lib/assets/images/LilyGem-dashboard.jpg?enhanced';
</script>

<div class="gallery">
	<DemoCard
		title="LilyGem"
		description="Personal finance app managing currency conversions and tracking transactions"
		tags={['Next.js', 'supabase', 'recharts', 'react-query']}
		route="https://lilygem.vercel.app/"
		github="https://github.com/bionboy/lilygem"
	>
		<div class="demo-card-image">
			<enhanced:img
				class="rounded asdf"
				alt="A personal finance application focusing on international transactions and exchange rate tracking"
				src={lilygemImg}
			/>
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
			<enhanced:img class="rounded" alt="a visualizer for a granular synthesizer" src={granulp5} />
		</div>
	</DemoCard>
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
