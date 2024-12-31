<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { PageData } from './$types';
	import Parallax from './parallax/Parallax.svelte';
	let { data }: { data: PageData } = $props();
</script>

{#snippet artwork(title: string, art: Snippet)}
	<div class="artwork-container">
		{#if title}
			<h2>{title}</h2>
		{/if}
		<div class="artwork-content">
			{@render art()}
		</div>
	</div>
	<style>
		.artwork-container {
			aspect-ratio: 1 / 1;
			display: flex;
			flex-direction: column;
			overflow: clip;

			background-color: hsl(240, 100%, 80%);
			border-radius: 2rem;

			text-align: center;
		}

		h2 {
			color: #333;
			margin: 10px;
		}

		.artwork-content {
			flex: 1;
		}
	</style>
{/snippet}

{#snippet parallax()}
	<Parallax title="hi!" />
{/snippet}

<div class="gallery">
	{@render artwork('Parallax Hero', parallax)}
	{#each { length: 3 } as _, index}
		<div></div>
		<!-- {@render artwork(index.toString(), parallax)} -->
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
