<script lang="ts">
	import MetaBalls from '../shaders/meta-balls/MetaBalls.svelte';
	import AspectRatio from '$lib/components/ui/aspect-ratio/aspect-ratio.svelte';
	import Shapes from '../shaders/shapes/Shapes.svelte';
	import HoverGrid from './hover-grid/HoverGrid.svelte';
	import Circles from './circles/Circles.svelte';
	import ShaderDescriptionCard from './ShaderDescriptionCard.svelte';

	const bg1 = 'bg-slate-200 dark:bg-slate-800';
	const bg2 = 'bg-stone-200 dark:bg-stone-700';
</script>

<div class="grouping">
	<div class="header {bg1}" id="meta-balls">
		<div class="title-cell">
			<h1>
				<!-- <a href="/demos/shaders/meta-balls"> -->
				Meta Balls
				<!-- </a> -->
			</h1>
		</div>
		<div class="description-cell">
			<ShaderDescriptionCard>
				<h3>
					An artifact from a study on rendering circles. See also
					<a href="#circles">Circles</a>.
					<br />
					Try hovering <em>(or tapping on mobile)</em>
				</h3>
			</ShaderDescriptionCard>
		</div>
	</div>
	<div class="shared-content-container">
		<div class="content-cell {bg1}">
			<AspectRatio ratio={1} class="size-full">
				<MetaBalls />
			</AspectRatio>
		</div>
		<div class="content-cell {bg2}">
			<AspectRatio ratio={1} class="size-full">
				<Shapes />
			</AspectRatio>
		</div>
	</div>
	<div class="header {bg2}" id="shapes">
		<div class="div5 description-cell">
			<ShaderDescriptionCard>
				<h3>
					An exploration of what I could create with a handwritten function for rendering rectangles
				</h3>
			</ShaderDescriptionCard>
		</div>
		<div class="div6 title-cell">
			<h1>
				<!-- <a href="/demos/shaders/shapes"> -->
				Shapes
				<!-- </a> -->
			</h1>
		</div>
	</div>
</div>
<div class="grouping mt-4">
	<div class="header {bg1}" id="hover-grid">
		<div class="title-cell">
			<h1>
				<!-- <a href="/demos/shaders/hover-grid">  -->
				Hover Grid
				<!-- </a> -->
			</h1>
		</div>
		<div class="description-cell">
			<ShaderDescriptionCard>
				<h3>
					Created while experimenting with absolute and relative positioning. I created a grid
					system to help with debugging.
					<br />
					Try hovering <em>(or tapping on mobile).</em>
					<br />
					<em> Two versions alternate every few seconds. </em>
				</h3>
			</ShaderDescriptionCard>
		</div>
	</div>
	<div class="shared-content-container">
		<div class="content-cell {bg1}">
			<AspectRatio ratio={1} class="size-full bg-black">
				<HoverGrid />
			</AspectRatio>
		</div>
		<div class="content-cell {bg2}">
			<AspectRatio ratio={1} class="size-full">
				<Circles />
			</AspectRatio>
		</div>
	</div>
	<div class="header {bg2}" id="circles">
		<div class="div5 description-cell">
			<ShaderDescriptionCard>
				<h3>
					Like with <a href="#meta-balls">Meta Balls</a>, this shader resulted from working with a
					circle renderer. Discovering this interesting effect that resembles a lense flare is a
					precursor to the meta balls shader.
				</h3>
			</ShaderDescriptionCard>
		</div>
		<div class="div6 title-cell">
			<h1>
				<!-- <a href="/demos/shaders/circles"> -->
				Circles
				<!-- </a> -->
			</h1>
		</div>
	</div>
</div>

<style lang="postcss">
	:root {
		--gap: 0rem;
		@screen sm {
			--gap: 1rem;
		}
		@screen lg {
			--gap: 2rem;
		}
		--neg-gap: calc(var(--gap) * -1);
	}
	.grouping {
		@apply max-w-7xl min-w-64 mx-auto p-4
    flex flex-col 
    gap-[var(--gap)];

		& * {
			@apply rounded-xl;
		}
	}

	.header {
		@apply flex flex-wrap justify-between p-4
		min-w-64
		z-10
		transition-all;
		&:hover {
			box-shadow: 0 0 10px 10px hsl(var(--accent));
		}
	}

	.shared-content-container {
		@apply relative flex 
    flex-col sm:flex-row 
    justify-between
    gap-[var(--gap)];
		& .content-cell {
			@apply w-full sm:w-[49%] 
       min-w-64
       rounded-xl p-4;
		}
		& :first-child {
			@apply translate-y-[calc(var(--neg-gap)-1rem)];
		}
		& :last-child {
			@apply translate-y-[calc(var(--gap)+1rem)];
		}
	}

	.title-cell {
		@apply center-container px-0 sm:px-8 
		font-jersey15 text-accent-2 italic;
	}

	.description-cell {
		@apply font-jersey15;
	}
</style>
