<script lang="ts">
	import type { PageData } from './$types';
	import Parallax from './parallax/Parallax.svelte';
	import AlwaysLevel from './always-level/AlwaysLevel.svelte';
	import DemoCard, { type DemoTag } from './DemoCard.svelte';
	import perlinPlane from '$lib/assets/images/perlin-plane.png';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { ExternalLink } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	const tags: Record<string, DemoTag> = {
		github: {
			name: 'GitHub',
			icon: ExternalLink,
			twColor: 'green-600'
		},
		external: {
			name: 'External',
			twColor: 'blue-400',
			variant: 'secondary'
		}
	};
</script>

<div class="gallery bg-background">
	<DemoCard
		title="Parallax Hero"
		description="Parallax effect hero component, moving on scroll or mouse"
		route="demos/parallax"
		tags={[
			{ ...tags.github, href: 'https://gist.github.com/bionboy/150a1f1c80a1df40737c5f0eec537b62' }
		]}
	>
		<Parallax title="hi!" />
	</DemoCard>
	<DemoCard
		title="Always Level"
		description="Keeping text on your screen level; despite your devices orientation"
		route="demos/always-level"
	>
		<div class="h-full flex place-content-center place-items-center bg-accent text-accent-2">
			<AlwaysLevel />
		</div>
	</DemoCard>
	<DemoCard
		title="Perlin Plane"
		description="An interactive 3d rendering of a 2d plane of 'perlin' noise. Made with three.js"
		route="https://bionboy.github.io/PerlinPlane/"
		tags={[{ ...tags.github, href: 'https://github.com/bionboy/PerlinPlane' }, tags.external]}
	>
		<div class="size-full flex place-items-center overflow-clip rounded">
			<img
				class="rounded"
				alt="a 2d plane with generated hills based on a noise algorithm. The different heights correspond to different colors"
				src={perlinPlane}
			/>
		</div>
	</DemoCard>

	<!-- * Fill in future spots, so for now our demo cards look less lonely  -->
	<!-- {#each Array(3) as _} <div class="bg-border size-full aspect-square rounded-md"></div> {/each} -->
</div>

<style lang="postcss">
	.gallery {
		@apply grid gap-4 m-5;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
</style>
