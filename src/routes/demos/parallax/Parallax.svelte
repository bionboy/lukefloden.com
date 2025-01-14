<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createPositions } from './islandPositions.svelte';
	import Cloud from '$lib/components/Cloud.svelte';

	type Props = {
		title?: string;
		titleContent?: Snippet;
		foregroundContent?: Snippet;
		midgroundContent?: Snippet;
		backgroundContent?: Snippet;
		includeBackground?: boolean;
		moveWithScroll?: boolean;
		moveWithMouse?: boolean;
	};

	const {
		title = 'Parallax',
		titleContent,
		foregroundContent,
		midgroundContent,
		backgroundContent,
		includeBackground = true,
		moveWithScroll = true,
		moveWithMouse = true
	}: Props = $props();

	let scrollY = $state(0);
	let mouse = $state({ x: 0, y: 0 });
	let hero = $state({ width: 0, height: 0 });

	let positions = $derived([
		createPositions(hero.width, hero.height, 5),
		createPositions(hero.width, hero.height, 10),
		createPositions(hero.width, hero.height, 30)
	]);

	function getShift(scale: number = 1) {
		// const offsetX = 0;
		// const offsetY = 0;
		const offsetX = -hero.width / 2;
		const offsetY = -hero.height / 2;

		const x = moveWithMouse ? mouse.x : 0;
		const y = (moveWithMouse ? mouse.y : 0) + (moveWithScroll ? scrollY : 0);
		const tx = offsetX + x * scale;
		const ty = offsetY + y * scale;

		return { x: tx + 'px', y: ty + 'px' };
	}

	let parallaxShift = $derived(getShift());
</script>

<svelte:window bind:scrollY />

<div
	class="hero"
	class:with-background={includeBackground}
	role="presentation"
	onmousemove={(event) => (mouse = { x: event.clientX, y: event.clientY })}
	bind:clientWidth={hero.width}
	bind:clientHeight={hero.height}
	style:--x-shift={parallaxShift.x}
	style:--y-shift={parallaxShift.y}
>
	<div class="parallax">
		{#each positions[2] as coords}
			{@render island('back', coords[0], coords[1], backgroundContent)}
		{/each}
		{#each positions[1] as coords}
			{@render island('mid', coords[0], coords[1], midgroundContent)}
		{/each}
		{#each positions[0] as coords}
			{@render island('fore', coords[0], coords[1], foregroundContent)}
		{/each}
	</div>
	<div class="hero-content">
		{#if titleContent}
			{@render titleContent()}
		{:else}
			<h1 class="hero-title">{title}</h1>
		{/if}
	</div>
</div>

{#snippet island(level: string = 'fore', x: number = 0, y: number = 0, content?: Snippet)}
	<div class="island parallax-{level}ground" style="left:{x}px; top:{y}px;">
		{@render (content ?? cloud)()}
	</div>
{/snippet}

{#snippet cloud()}
	<Cloud />
{/snippet}

<style>
	.hero {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: clip;
		height: 100%;
		&.with-background {
			background-image: linear-gradient(
				to bottom right in hsl,
				hsl(180, 100%, 55%),
				hsl(215, 100%, 74%)
			);
		}
	}

	.hero-content {
		position: relative;
		text-align: center;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.hero-title {
		font-size: 4rem;
		color: hsl(180, 20%, 30%);
	}

	.parallax {
		position: relative;
	}

	.island {
		--shift-scale: 1;
		--size-scale: 1;
		--blur-amount: 0px;
		--opacity: 1;

		position: absolute;

		padding: 10px 20px;
		font-size: 2rem;
		width: fit-content;

		transform: translate(
				calc(var(--x-shift) * var(--shift-scale)),
				calc(var(--y-shift) * var(--shift-scale))
			)
			scale(var(--size-scale));
		filter: blur(var(--blur-amount));
		opacity: var(--opacity);
	}

	.parallax-foreground {
		--shift-scale: 0.8;
	}
	.parallax-midground {
		--shift-scale: 0.5;
		--size-scale: 0.7;
		--blur-amount: 1px;
		--opacity: 0.9;
	}
	.parallax-background {
		--shift-scale: 0.2;
		--size-scale: 0.5;
		--blur-amount: 2px;
		--opacity: 0.7;
	}
</style>
