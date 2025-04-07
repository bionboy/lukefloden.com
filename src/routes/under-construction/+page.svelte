<script lang="ts">
	import type { PageData } from './$types';
	import Parallax from '../demos/internal/parallax/Parallax.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="home">
	<Parallax title="Under Construction!">
		{#snippet foregroundContent()}
			<div class="icon">👷‍♀️</div>
		{/snippet}
		{#snippet midgroundContent()}
			<div class="icon">🚧</div>
		{/snippet}
		{#snippet backgroundContent()}
			<div class="icon">🏗</div>
		{/snippet}
	</Parallax>
</div>

<style>
	.home {
		align-content: center;
		height: 100dvh;
	}
	.icon {
		font-size: 5rem;
	}
</style>
