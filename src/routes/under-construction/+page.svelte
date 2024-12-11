<script lang="ts">
	import type { PageData } from './$types';
	import Parallax from '../demos/parallax/Parallax.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="home">
	<Parallax title="Under Construction!" />
</div>

<style>
	.home {
		height: 100vh;
		background-color: white;
		padding: 0px;
		margin: 0px;
	}
</style>
