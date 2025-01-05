<script lang="ts">
	import type { PageData } from './$types';
	import Parallax from './demos/parallax/Parallax.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="home">
	<Parallax>
		{#snippet titleContent()}
			<div class="title">
				<p>Welcome to my site...</p>
				<p>things are in flux right now...</p>
				<p>but that's ok...</p>
			</div>
		{/snippet}
	</Parallax>
</div>

<style>
	.home {
		display: flex;
		flex-direction: column;
		height: 100dvh;
	}

	.title > p {
		margin: 0px;

		text-align: left;
		font-family: cursive;
		font-size: 2rem;

		/* mix-blend-mode: difference;
		color: hsl(0, 0%, 0%);
		text-shadow:
			hsl(65, 60%, 65%) 0px 0px 10px,
			hsl(65, 60%, 65%) 0px 0px 30px; */

		/* color: hsl(0, 0%, 0%); */

		color: hsl(240, 100%, 70%);
		/* text-shadow: hsl(65, 60%, 65%) 0px 0px 10px; */
		text-shadow: 0 0 40px;
	}
</style>
