<script lang="ts">
	import * as Card from '$lib/components/ui/card/';

	// import type { PageData } from './$types';
	import MetaBalls from './MetaBalls.svelte';

	// let { data }: { data: PageData } = $props();
</script>

<div class="max-w-3xl mx-auto my-4 p-4 flex flex-col gap-8">
	<div class="flex justify-around">
		<h1 class="font-jersey15">Meta Balls</h1>
		<Card.Root class="max-w-3xl">
			<Card.Content>
				<p>
					Meta Balls is a demo of meta balls. It is a demo of meta balls. It is a demo of meta
					balls. It is a demo of meta balls. It is a demo of meta balls. It is a demo of meta balls.
					It is a demo of meta balls. It is a demo of meta balls. It is a demo of meta balls. It is
					a demo of meta balls. It is a demo of meta balls. It is a demo of meta balls. It is a demo
					of meta balls. It is a demo of meta balls.
				</p>
			</Card.Content>
		</Card.Root>
	</div>
	<div class="rounded-xl bg-accent p-4 m-4">
		<!-- <div class="flex flex-col justify-around debug "> -->
		<div class="asdf debug">
			<!-- <AspectRatio ratio={1} class="debug-2 size-fulll "> -->
			<MetaBalls />
			<!-- </AspectRatio> -->
		</div>
	</div>
</div>

<style lang="postcss">
	.asdf {
		@apply flex;
		/* --xxx: min(100vh, 100vw); */
		/* height: var(--xxx); */
		max-height: 100vh;
	}
</style>
