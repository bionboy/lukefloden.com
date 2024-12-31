<script lang="ts">
	// let { locations }: { locations: [{ route: string; name: string }] } = $props();
	let { locations } = $props();
</script>

<nav>
	{#each locations as { name, route }}
		<a href={route}> {name} </a>
	{/each}
</nav>

<style>
	nav {
		/* position: fixed; */
		/* z-index: 3; */
		background-color: hsl(240, 100%, 80%);
		padding: 10px;
		display: flex;
		border-radius: 0.5rem;
		a {
			border-radius: 0.5rem;
			color: #222;
			padding: 5px;
			margin: 2px;
		}
	}
</style>
