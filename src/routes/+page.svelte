<script lang="ts">
	import { mode } from 'mode-watcher';
	import type { PageData } from './$types';
	import Parallax from './demos/parallax/Parallax.svelte';
	import { Star } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	const getRandomRotation = () => {
		const rotationRange = 90;
		const rotation = (Math.random() - 0.5) * rotationRange;
		return rotation + 'deg';
	};
</script>

{#snippet titleContent()}
	<div class="title">
		<h1>Welcome to my site...</h1>
		<h1>things are in flux right now...</h1>
		<h1>but that's ok...</h1>
	</div>
{/snippet}

{#snippet star()}
	<div class="rotate-0" style:--tw-rotate={getRandomRotation()}>
		<Star size="3rem" class="stroke-yellow-400 fill-yellow-400"></Star>
	</div>
{/snippet}

<div class="home">
	{#if $mode === 'dark'}
		<Parallax
			{titleContent}
			foregroundContent={star}
			midgroundContent={star}
			backgroundContent={star}
			includeBackground={false}
		></Parallax>
	{:else}
		<Parallax {titleContent}></Parallax>
	{/if}
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
