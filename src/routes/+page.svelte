<script lang="ts">
	import type { PageData } from './$types';
	import Parallax from './demos/parallax/Parallax.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="home">
	<Parallax>
		{#snippet titleContent()}
			<div class="title">
				<h1>Welcome to my site...</h1>
				<h1>things are in flux right now...</h1>
				<h1>but that's ok...</h1>
			</div>
		{/snippet}
	</Parallax>
</div>

<style lang="postcss">
	.home {
		position: absolute;
		width: 100vw;
		height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.title > h1 {
		margin: 0px;

		text-align: left;
		font-family: 'Instrument Serif', cursive;
		font-size: 3rem;
		font-weight: 400;
		line-height: 4rem;
		color: hsl(240, 100%, 70%);
		text-shadow: 0 0 30px;
	}
</style>
