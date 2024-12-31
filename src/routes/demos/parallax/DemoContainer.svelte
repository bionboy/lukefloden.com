<script lang="ts">
	import type { Snippet } from 'svelte';
	// const { title = '', children }: { children: Snippet; title: string } = $props();
	const { children, title = '' } = $props();
</script>

<div class="demo-container">
	{#if title}
		<h2>{title}</h2>
	{/if}
	<div class="demo-content">
		{@render children()}
	</div>
</div>

<style>
	.demo-container {
		flex: 1;
		min-width: 400px;
		max-height: 800px;
		text-align: center;
	}

	h2 {
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
