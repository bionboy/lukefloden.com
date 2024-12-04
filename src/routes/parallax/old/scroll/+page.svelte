<script lang="ts">
	let scroll = $state(0);
	let speed = 4;
</script>

<svelte:window bind:scrollY={scroll} />

<h1>{scroll}</h1>
<section>
	{@render box(2, 'teal')}
	{@render box(1, 'red')}
	{@render box(-1, 'green')}
</section>

{#snippet box(scrollSpeed: number = 1, color: string = 'grey')}
	<div
		class="box pin"
		style:transform="translate3d(0, {scroll * scrollSpeed}px, 0)"
		style:background={color}
	></div>
{/snippet}

<style>
	h1 {
		position: fixed;
		z-index: 10;
	}
	.box {
		--size: 300px;
		height: var(--size);
		width: var(--size);
		background: lightGrey;
		margin-bottom: 1rem;
	}

	/* .pin {
		position: fixed;
	} */
</style>
