<script lang="ts">
	import Parallax from '$lib/parallax/Parallax.svelte';
</script>

<div>
	<Parallax title="Moving with the mouse and when you scroll"></Parallax>
	<Parallax title="I only react to the mouse ¯\_(ツ)_/¯" moveWithScroll={false} />
	<Parallax title="Scrolling only 😈" moveWithMouse={false} />
	<section class="etc">
		<p>putting some ...</p>
		<p>more content ...</p>
		<p>here ...</p>
		<p>to add to scrolling...</p>
	</section>
</div>

<style>
	.etc {
		height: 100vh;
		margin: 5px;
	}
</style>
