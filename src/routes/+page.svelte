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
		position: absolute;
		width: 100vw;
		height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.title > p {
		margin: 0px;

		text-align: left;
		font-family: 'Instrument Serif', cursive;
		font-size: 3rem;
		color: hsl(240, 100%, 70%);
		text-shadow: 0 0 30px;
	}
</style>
