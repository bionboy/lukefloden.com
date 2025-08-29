<script lang="ts">
	import Parallax from './Parallax.svelte';
	import * as Card from '$lib/components/ui/card';
</script>

<div class="demos-display">
	<Card.Root>
		<Card.Content class="h-[50vh] rounded-xl">
			<Parallax title="scroll or mouse me" />
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Content class="h-[50vh] rounded-xl">
			<Parallax moveWithMouse={false} title="scroll me" />
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Content class="h-[50vh] rounded-xl">
			<Parallax moveWithScroll={false} title="mouse me" />
		</Card.Content>
	</Card.Root>
</div>

<style>
	.demos-display {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;

		gap: 20px;

		margin: 1rem;
		padding: 0.5rem;
	}
</style>
