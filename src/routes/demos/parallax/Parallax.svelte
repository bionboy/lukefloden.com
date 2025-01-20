<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createPositions } from './islandPositions.svelte';
	import Cloud from '$lib/components/Cloud.svelte';
	import { mode } from 'mode-watcher';
	import { Star } from 'lucide-svelte';

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

	let scroll = $state({ x: 0, y: 0 });
	let mouse = $state({ x: 0, y: 0 });
	let hero = $state({
		width: 0,
		height: 0,
		offset: {
			x: 0,
			y: 0
		}
	});

	let islandPositions = $derived([
		createPositions(hero.width, hero.height, 5),
		createPositions(hero.width, hero.height, 10),
		createPositions(hero.width, hero.height, 20)
	]);

	function getShift(scale: number = 1) {
		let input = { x: 0, y: 0 };

		if (moveWithMouse) {
			if (mouse.x !== 0) input.x = mouse.x - hero.width / 2;
			if (mouse.y !== 0) input.y = mouse.y - hero.height / 2;
		}

		if (moveWithScroll) {
			input.x += scroll.x;
			input.y += scroll.y;
		}

		return {
			x: input.x * scale + 'px',
			y: input.y * scale + 'px'
		};
	}

	const getRandomRotation = () => {
		const rotationRange = 90;
		const rotation = (Math.random() - 0.5) * rotationRange;
		return rotation + 'deg';
	};

	let parallaxShift = $derived(getShift());

	let defaultIslandContent = $derived($mode === 'light' ? cloud : star);
</script>

<svelte:window bind:scrollY={scroll.y} bind:scrollX={scroll.x} />

<div
	class="hero"
	class:light-background={includeBackground && $mode === 'light'}
	class:dark-background={includeBackground && $mode === 'dark'}
	role="presentation"
	onmousemove={(event: MouseEvent) => {
		// mouse = { x: event.clientX, y: event.clientY };
		mouse = { x: event.layerX, y: event.layerY };
		// mouse = { x: event.screenX, y: event.screenY };
	}}
	bind:clientWidth={hero.width}
	bind:clientHeight={hero.height}
	style:--x-shift={parallaxShift.x}
	style:--y-shift={parallaxShift.y}
>
	<div class="parallax">
		{#each islandPositions[2] as coords}
			{@render island('background', coords[0], coords[1], backgroundContent)}
		{/each}
		<div class="blur-panel background"></div>
		{#each islandPositions[1] as coords}
			{@render island('midground', coords[0], coords[1], midgroundContent)}
		{/each}
		<div class="blur-panel midground"></div>
		{#each islandPositions[0] as coords}
			{@render island('foreground', coords[0], coords[1], foregroundContent)}
		{/each}
		<div class="blur-panel foreground"></div>
	</div>
	<div class="hero-content">
		{#if titleContent}
			{@render titleContent()}
		{:else}
			<h1 class="hero-title">{title}</h1>
		{/if}
	</div>
</div>

{#snippet island(level: string = 'foreground', x: number = 0, y: number = 0, content?: Snippet)}
	<div class="island {level}" style="left:{x}px; top:{y}px;">
		{@render (content ?? defaultIslandContent)()}
	</div>
{/snippet}

{#snippet cloud()}
	<Cloud />
{/snippet}

{#snippet star()}
	<div class="rotate-0" style:--tw-rotate={getRandomRotation()}>
		<Star size="3rem" class="stroke-yellow-400 fill-yellow-400"></Star>
	</div>
{/snippet}

<style lang="postcss">
	.hero {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: clip;
		height: 100%;
		&.light-background {
			background-image: linear-gradient(
				to bottom right in hsl,
				hsl(180, 100%, 55%),
				hsl(215, 100%, 74%)
			);
		}
		&.dark-background {
			@apply bg-black;
		}
	}

	.hero-content {
		position: relative;
		text-align: center;

		display: flex;
		justify-content: center;
		align-items: center;

		@apply pointer-events-none;

		/* 
		 	TODO: 3d tilting card effect
			https://www.youtube.com/watch?v=Z-3tPXf9a7M
		*/
		/* transform: rotate3d(0.1, 0.1, 0, calc(var(--asdf-shift, 0) * 0.1)); */
	}

	.hero-title {
		font-size: 4rem;
		/* color: hsl(180, 20%, 30%); */
	}

	.parallax {
		@apply absolute size-full;
	}

	.blur-panel {
		@apply absolute size-full;
		&.background {
			@apply backdrop-blur-[1px];
		}
		&.midground {
			@apply backdrop-blur-[1px];
		}
		&.foreground {
		}
	}

	.island {
		--shift-scale: 1;
		--size-scale: 1;
		--blur-amount: 0px;
		--opacity: 1;

		position: absolute;

		/* 
			shift inner content to center of coordinates 
			then translate based on input
		*/
		transform: translate(-50%, -50%)
			translate(
				calc(var(--x-shift) * var(--shift-scale)),
				calc(var(--y-shift) * var(--shift-scale))
			)
			scale(var(--size-scale));

		opacity: var(--opacity);

		/* ! Blur on every element is bad for performance */
		/* TODO: instead, add a blur "panel" just in front of each layer */
		/* filter: blur(var(--blur-amount)); */

		&.foreground {
			--shift-scale: 0.8;
			--size-scale: 1;
			--opacity: 0.9;
		}
		&.midground {
			--shift-scale: 0.5;
			--size-scale: 0.7;
			--opacity: 0.9;
		}
		&.background {
			--shift-scale: 0.2;
			--size-scale: 0.5;
			--opacity: 0.8;
		}
	}
</style>
