<script lang="ts">
	import Parallax from '../portfolio/demos/parallax/Parallax.svelte';
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
