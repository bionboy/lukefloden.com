<script lang="ts">
	let mouse = $state({ x: 0, y: 0 });
	let hero = $state({ width: 0, height: 0 });

	let positions = $derived([createPositions(5), createPositions(5), createPositions(5)]);

	function createPositions(amount: number) {
		let result: number[][] = [];
		for (let j = 0; j < amount; j++) {
			result[j] = [(Math.random() - 0.5) * hero.width, (Math.random() - 0.5) * hero.height];
		}
		return result;
	}

	function calcShift(scale: number = 100) {
		const offsetX = hero.width / 2;
		const offsetY = hero.height / 2;

		const mouseX = mouse.x / hero.width - 0.5;
		const mouseY = mouse.y / hero.height - 0.5;

		let tX = offsetX + mouseX * scale;
		let tY = offsetY + mouseY * (scale * 0.3);

		return `${tX}px, ${tY}px`;
	}
</script>

{#snippet island(level: string = 'fore', x: number = 0, y: number = 0, content: string)}
	<div class="island parallax-{level}ground" style="left:{x}px; top:{y}px;">{content}</div>
{/snippet}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
	class="hero"
	onmousemove={(event) =>
		(mouse = {
			x: event.clientX - hero.width / 2,
			y: event.clientY - hero.height / 2
		})}
	bind:clientWidth={hero.width}
	bind:clientHeight={hero.height}
	style:--parallax-shift={calcShift(500)}
	style:--parallax-shift-midground={calcShift(300)}
	style:--parallax-shift-background={calcShift(100)}
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
		overflow: clip;

		width: 100vw;
		height: 100vh;
		min-height: 300px;
		max-height: 1000px;

		background-color: hsl(0, 0%, 27%);

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-content {
		position: relative;
		text-align: center;
	}

	.hero-title {
		font-size: 3rem;
	}

	.island {
		padding: 5px;
		width: fit-content;
		background-color: hsl(180, 20%, 49%);
		color: hsl(0, 0%, 88%);
		border-radius: 1rem;

		display: flex;
		justify-content: center;
		align-items: center;

		position: absolute;
		/* position: fixed; */
		/* overflow: hidden; */
		/* translate: 50%, 50%; */
		/* left: 100px; */

		/* transform: translate3d(var(--position, '0,0,0')); */
		/* transform: translate(var(--parallax-x-shift, '0px'), var(--parallax-y-shift, '0px')); */
		/* transform: translate(var(--parallax-shift, '0px, 0px')); */
	}

	.parallax-foreground {
		opacity: 0.9;
		transform: translate(var(--parallax-shift, '0px, 0px'));

		/* z-index: 3; */
	}
	.parallax-midground {
		opacity: 0.7;
		transform: translate(var(--parallax-shift-midground, '0px, 0px'));
		/* z-index: 2; */
	}
	.parallax-background {
		opacity: 0.5;
		transform: translate(var(--parallax-shift-background, '0px, 0px'));
		/* z-index: 1; */
	}
</style>
