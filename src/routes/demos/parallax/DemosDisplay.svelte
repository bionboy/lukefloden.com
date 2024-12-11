<script lang="ts">
	import type { Snippet } from 'svelte';
	const { children }: { children: Snippet } = $props();
</script>

<div class="demos-display">
	{@render children()}
</div>

<style>
	.demos-display {
		/* display: flex */
		display: grid;
		gap: 30px;

		margin: 1rem;
		padding: 0.5rem;

		/* background-color: cyan; */
		/* border: 5px solid cyan; */
		/* border-radius: 1rem; */
	}

	/* .demo-container { */
	.demos-display > * {
		padding: 10px;
		border: 5px solid pink;
		border-radius: 1rem;
		background-color: red;
	}

	/* .demos-display > section {
		border: 5px solid purple;
	} */
</style>
