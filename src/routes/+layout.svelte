<script lang="ts">
	import Nav from '$lib/Nav.svelte';

	let { children } = $props();
</script>

<Nav></Nav>
<main>
	{@render children()}
</main>

<style>
	main {
		padding: 0px;
		margin: 0px;
		background-image: linear-gradient(
			to bottom right in hsl,
			hsl(100, 90%, 30%),
			hsl(100, 90%, 60%)
		);
		border: 3px solid hsl(100, 90%, 70%);
	}
</style>
