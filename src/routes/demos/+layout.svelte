<script lang="ts">
	import Nav from '$lib/Nav.svelte';

	let { children } = $props();

	let locations = [
		{ route: '/demos', name: 'Demos' },
		{ route: '/demos/parallax', name: 'Parallax Hero' }
	];
</script>

<Nav {locations} />
<main>
	{@render children()}
</main>

<style>
	main {
		/* padding: 0px; */
		/* margin: 0px; */
		/* position: relative; */
		/* background-image: linear-gradient(to bottom right in hsl, hsl(70, 90%, 30%), hsl(70, 90%, 60%)); */
		/* border: 3px solid hsl(100, 90%, 70%); */
	}
</style>
