<script lang="ts">
	import type { Snippet } from 'svelte';
	// const { title = '', children }: { children: Snippet; title: string } = $props();
	const { children, title = '' } = $props();
</script>

<div class="demo-container">
	{#if title}
		<h2>{title}</h2>
	{/if}
	{@render children()}
</div>

<style>
	.demo-container {
		padding: 10px;
		background-color: white;
		/* border: 5px solid pink; */
		border-radius: 1rem;

		text-align: center;
	}

	h2 {
		/* background-color: red; */
		/* color: green; */
		color: #222;
	}
</style>
