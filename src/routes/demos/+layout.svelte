<script lang="ts">
	import Nav from '$lib/Nav.svelte';

	let { children } = $props();

	let locations = [
		{ route: '/', name: 'Home' },
		{ route: '/demos', name: 'Demos' },
		{ route: '/demos/parallax', name: 'Parallax Hero' },
		{ route: '/demos/always-level', name: 'Always Level' }
	];
</script>

<Nav {locations} />
<main>
	{@render children()}
</main>

<style>
</style>
