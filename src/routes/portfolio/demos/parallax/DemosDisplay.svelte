<script lang="ts">
	const { children } = $props();
</script>

<div class="demos-display">
	{@render children()}
</div>

<style>
	.demos-display {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;

		gap: 20px;

		margin: 1rem;
		padding: 0.5rem;
	}
</style>
