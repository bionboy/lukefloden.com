<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { PageData } from './$types';
	import Parallax from './parallax/Parallax.svelte';
	import AlwaysLevel from './always-level/AlwaysLevel.svelte';
	let { data }: { data: PageData } = $props();
</script>

{#snippet artwork(title: string, route: string, art: Snippet)}
	<div class="artwork-container">
		{#if title}
			<a href={route}>
				<h2>{title}</h2>
			</a>
		{/if}
		<div class="artwork-content">
			<a href={route}>
				{@render art()}
			</a>
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
			/* color: #333; */
			margin: 10px;
		}

		/* link style reset, only for content, so original HTML link styles remain :) */
		.artwork-content {
			flex: 1;

			> a {
				color: inherit;
				text-decoration: none;
			}
		}
	</style>
{/snippet}

{#snippet parallax()}
	<Parallax title="hi!" />
{/snippet}

{#snippet alwaysLevel()}
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
{/snippet}

<div class="gallery">
	{@render artwork('Parallax Hero', 'demos/parallax', parallax)}
	{@render artwork('Always Level', 'demos/always-level', alwaysLevel)}
	{#each { length: 3 } as _, index}
		<div></div>
		<!-- {@render artwork(index.toString(), index.toString(), parallax)} -->
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
