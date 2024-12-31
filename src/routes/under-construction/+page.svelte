<script lang="ts">
	import type { PageData } from './$types';
	import Parallax from '../demos/parallax/Parallax.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="home">
	<Parallax
		title="Under Construction!"
		foregroundContent="👷‍♀️"
		midgroundContent="🚧"
		backgroundContent="🏗️"
		fullscreen
	/>
</div>

<style>
	.home {
		align-content: center;
		height: 100vh;
	}
</style>
