<script lang="ts">
	import Nav from '$lib/Nav.svelte';
	import type { PageData } from './$types';
	import Parallax from './demos/parallax/Parallax.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="home">
	<Nav
		locations={[
			{ route: '/', name: 'Home' },
			{ route: '/demos', name: 'Demos' }
		]}
	/>
	<Parallax title="💫🌟✨ Welcome ✨🌟💫" />
</div>

<style>
	.home {
		height: 100vh;
	}
</style>
