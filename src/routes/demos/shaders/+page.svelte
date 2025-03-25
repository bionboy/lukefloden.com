<script lang="ts">
	import * as Card from '$lib/components/ui/card/';
	import MetaBalls from '../shaders/meta-balls/MetaBalls.svelte';
	import AspectRatio from '$lib/components/ui/aspect-ratio/aspect-ratio.svelte';
	import Shapes from '../shaders/shapes/Shapes.svelte';
	import HoverGrid from './hover-grid/HoverGrid.svelte';

	const bg1 = 'bg-slate-200 dark:bg-slate-800';
	const bg2 = 'bg-stone-200 dark:bg-stone-700';
</script>

<div class="grouping">
	<div class="header {bg1}">
		<div class="title-cell">
			<h1>
				<a href="/demos/shaders/meta-balls"> Meta Balls </a>
			</h1>
		</div>
		<div class="description-cell">
			<Card.Root class="max-w-3xl mx-auto my-2">
				<Card.Content>
					<p>
						Meta Balls is a demo of meta balls. It is a demo of meta balls. It is a demo of meta
						balls. It is a demo of meta balls. It is a demo of meta balls.
					</p>
				</Card.Content>
			</Card.Root>
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
	<div class="header {bg2}">
		<div class="div5 description-cell">
			<p>
				Shapes is a demo of shapes. It is a demo of shapes. It is a demo of shapes. It is a demo
			</p>
		</div>
		<div class="div6 title-cell">
			<h1>
				<a href="/demos/shaders/shapes"> Shapes </a>
			</h1>
		</div>
	</div>
</div>
<div class="grouping mt-4">
	<div class="header {bg1}">
		<div class="title-cell">
			<h1>
				<a href="/demos/shaders/meta-balls"> Hover Grid </a>
			</h1>
		</div>
		<div class="description-cell">
			<Card.Root class="max-w-3xl mx-auto my-2">
				<Card.Content>
					<p>Hover Grid is a demo....... BLAAAHHHHHH</p>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
	<div class="shared-content-container">
		<div class="content-cell {bg1}">
			<AspectRatio ratio={1} class="size-full">
				<HoverGrid />
			</AspectRatio>
		</div>
		<div class="content-cell {bg2}">
			<AspectRatio ratio={1} class="size-full">
				<Shapes />
			</AspectRatio>
		</div>
	</div>
	<div class="header {bg2}">
		<div class="div5 description-cell">
			<p>
				Shapes is a demo of shapes. It is a demo of shapes. It is a demo of shapes. It is a demo
			</p>
		</div>
		<div class="div6 title-cell">
			<h1>
				<a href="/demos/shaders/shapes"> Shapes </a>
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
		@apply center-container font-jersey15;
	}

	.description-cell {
	}
</style>
