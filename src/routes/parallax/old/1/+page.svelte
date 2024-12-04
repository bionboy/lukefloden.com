<script lang="ts">
	let mouse = $state({ x: 0, y: 0 });
	let ocean = $state({ width: 0, height: 0 });

	let onmousemove = (event: MouseEvent) => (mouse = { x: event.clientX, y: event.clientY });

	let calcPosition = (i: number, j: number) => {
		let offsetX = ocean.width / 2;
		let offsetY = ocean.height / 2;

		let mouseX = mouse.x / ocean.width - 0.5;
		let mouseY = mouse.y / ocean.height - 0.5;

		let tX = offsetX + mouseX * 50 * i * j;
		let tY = offsetY + mouseY * 50 * i * j;
		let tZ = j;

		return `${tX}px, ${tY}px, ${tZ}px`;
	};
</script>

<!-- <svelte:window bind:innerHeight={height} bind:innerWidth={width} /> -->

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="ocean" {onmousemove} bind:clientWidth={ocean.width} bind:clientHeight={ocean.height}>
	<!-- <p>mouse: ({m.x}, {m.y})</p> -->
	{#each [1, 2, 3, 4] as abc, i}
		{#each [1, 2, 3, 4] as def, j}
			<div class="island" style:--position={calcPosition(i, j)} style:opacity={1 - i * 0.1}>
				({abc}, {def})
			</div>
			<!-- style:transform={'translate3d('} -->
		{/each}
	{/each}
</div>

<style>
	.ocean {
		min-height: 300px;
		width: 100%;
		/* background-color: rebeccapurple; */
		background-color: skyblue;
	}

	.island {
		padding: 5px;
		width: fit-content;
		background-color: seashell;
		color: darkcyan;
		position: absolute;
		border-radius: 1rem;
		/* translate: 50%, 50%; */
		/* left: 100px; */

		transform: translate3d(var(--position, '0,0,0'));
	}
</style>
