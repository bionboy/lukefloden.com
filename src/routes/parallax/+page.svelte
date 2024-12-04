<script lang="ts">
	import { createPositions } from '../islandPositions.svelte';

	let mouse = $state({ x: 0, y: 0 });
	let hero = $state({ width: 0, height: 0 });

	let positions = $derived([
		createPositions(hero.width, hero.height, 5),
		createPositions(hero.width, hero.height, 10),
		createPositions(hero.width, hero.height, 20)
	]);

	function getShift(scale: number = 1) {
		// const offsetX = 0;
		// const offsetY = 0;
		const offsetX = -hero.width / 2;
		const offsetY = -hero.height / 2;

		const x = offsetX + mouse.x * scale;
		const y = offsetY + mouse.y * scale;

		return { x: x + 'px', y: y + 'px' };
	}

	let parallaxShift = $derived(getShift());
</script>

{#snippet island(level: string = 'fore', x: number = 0, y: number = 0, content: string)}
	<div class="island parallax-{level}ground" style="left:{x}px; top:{y}px;">{content}</div>
{/snippet}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
	class="hero"
	onmousemove={(event) => (mouse = { x: event.clientX, y: event.clientY })}
	bind:clientWidth={hero.width}
	bind:clientHeight={hero.height}
	style:--x-shift={parallaxShift.x}
	style:--y-shift={parallaxShift.y}
>
	<div class="parallax">
		{#each positions[2] as coords}
			{@render island('back', coords[0], coords[1], 'Background')}
		{/each}
		{#each positions[1] as coords}
			{@render island('mid', coords[0], coords[1], 'Midground')}
		{/each}
		{#each positions[0] as coords}
			{@render island('fore', coords[0], coords[1], 'Foreground')}
		{/each}
	</div>
	<div class="hero-content">
		<h1 class="hero-title">This is the Title</h1>
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: clip;
		height: 90vh;
		min-height: 300px;
		/* max-height: 1000px; */
		background-image: linear-gradient(
			to bottom right in hsl,
			hsl(180, 100%, 55%),
			hsl(215, 100%, 74%)
		);
	}

	.hero-content {
		position: relative;
		text-align: center;
	}

	.hero-title {
		/* font-size: 3rem; */
		font-size: 10vw;
		color: hsl(180, 20%, 30%);
	}

	.parallax {
		position: relative;
	}

	.island {
		padding: 10px;
		width: fit-content;
		background-color: hsl(180, 20%, 49%);
		color: hsl(0, 0%, 88%);
		border-radius: 1rem;

		position: absolute;
		/* display: flex; */
		/* justify-content: center; */
		/* align-items: center; */

		transform: translate(
				calc(var(--x-shift) * var(--shift-scale)),
				calc(var(--y-shift) * var(--shift-scale))
			)
			scale(var(--size-scale));
	}

	.parallax-foreground {
		--shift-scale: 1;
		--size-scale: 1;
		opacity: 0.9;
	}
	.parallax-midground {
		--shift-scale: 0.5;
		--size-scale: 0.7;
		opacity: 0.7;
	}
	.parallax-background {
		--shift-scale: 0.3;
		--size-scale: 0.5;
		opacity: 0.5;
	}
</style>
