<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const categories = [
		{ name: 'Internal', path: '/demos/internal' },
		{ name: 'External', path: '/demos/external' },
		{ name: 'Shaders', path: '/demos/shaders' }
	];

	let currentPath = $state('');
	let activeCategory = $derived(currentPath === '/demos' ? '/demos/internal' : currentPath);

	onMount(() => {
		currentPath = $page.url.pathname;
	});

	$effect(() => {
		currentPath = $page.url.pathname;
	});
</script>

<nav class="selector-container">
	<ul>
		{#each categories as category}
			<li>
				<a
					href={category.path}
					class="category-link"
					class:active={activeCategory.startsWith(category.path)}
				>
					{category.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="postcss">
	.selector-container {
		@apply w-full flex justify-center mb-6;

		@apply sticky top-14 z-10 pb-4;
		/* backdrop-filter: blur(8px); */
		background: linear-gradient(
			to bottom,
			rgba(var(--background-rgb), 0.8) 0%,
			rgba(var(--background-rgb), 0.6) 60%,
			rgba(var(--background-rgb), 0) 100%
		);
	}

	ul {
		@apply flex gap-4 p-2 rounded-lg;
		@apply bg-opacity-25 backdrop-blur-md;
		@apply dark:bg-background/30;
	}

	.category-link {
		@apply px-4 py-2 rounded-md font-medium transition-all duration-200;
		@apply hover:bg-accent/10;
	}

	.active {
		@apply bg-accent text-accent-2 font-bold;
		@apply hover:bg-accent/90;
	}
</style>
