<script lang="ts">
	import type { Snippet } from 'svelte';
	const { children, title = '' }: { children: Snippet; title: string } = $props();
</script>

<div class="demo-container">
	{#if title}
		<h3>{title}</h3>
	{/if}
	<div class="demo-content">
		{@render children()}
	</div>
</div>

<style>
	.demo-container {
		flex: 1;
		min-width: 300px;
		max-height: 800px;
		text-align: center;
	}

	h3 {
		background-color: hsl(240, 100%, 80%);
		border-radius: 0.5rem;

		margin: 10px 0px;
		padding: 1rem;
		color: #222;
	}

	.demo-content {
		background-color: hsl(240, 100%, 80%);
		/* border: 2px solid pink; */
		padding: 10px;
		border-radius: 0.5rem;
		height: 50vh;
	}
</style>
