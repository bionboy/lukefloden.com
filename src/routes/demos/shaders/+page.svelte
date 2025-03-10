<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	// import Parallax from './parallax/Parallax.svelte';
	// import AlwaysLevel from './always-level/AlwaysLevel.svelte';
	import DemoCard from '../DemoCard.svelte';
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
		github=""
	>
		<!-- <Parallax title="hi!" /> -->
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
