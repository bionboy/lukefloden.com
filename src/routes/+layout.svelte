<script>
	let { children } = $props();
</script>

<nav>
	<a href="/parallax">parallax</a>
	<a href="/parallax/old/1">1</a>
	<a href="/parallax/old/2">2</a>
	<a href="/parallax/old/scroll">scroll</a>
</nav>
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
