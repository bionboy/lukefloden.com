<script lang="ts">
	import type { PageData } from './$types';
	import Parallax from './parallax/Parallax.svelte';
	import AlwaysLevel from './always-level/AlwaysLevel.svelte';
	import DemoCard from './DemoCard.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="gallery">
	<DemoCard
		title="Parallax Hero"
		description="Parallax effect hero component, moving on scroll or mouse"
		route="demos/parallax"
	>
		<Parallax title="hi!" />
	</DemoCard>
	<DemoCard
		title="Always Level"
		description="Keeping text on your screen level; despite your devices orientation"
		route="demos/always-level"
	>
		<div class="always-level-container">
			<AlwaysLevel />
		</div>
		<style>
			.always-level-container {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				background-color: hsl(160, 100%, 90%);
			}
		</style>
	</DemoCard>

	<!-- * Fill in future spots, so for now our demo cards look less lonely  -->
	{#each { length: 22 } as _, index}
		<div class="bg-accent size-full aspect-square"></div>
	{/each}
</div>

<style>
	.gallery {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		margin: 20px;
		gap: 15px;
	}
</style>
