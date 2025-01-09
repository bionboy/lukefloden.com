<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils.js';

	export type NavLocations = { route: string; name: string }[];

	const defaultLocations = [
		{ route: '/', name: 'Home' },
		{ route: '/demos', name: 'Demos' }
		// { route: '/about', name: 'About' },
		// { route: '/contact', name: 'Contact' },
		// { route: '/1', name: 'About' },
		// { route: '/2', name: 'Contact' },
		// { route: '/3', name: 'About' },
		// { route: '/4', name: 'Contact' }
	];

	let { locations = defaultLocations }: { locations?: NavLocations } = $props();

	// This is the excepted way to use props that use keywords in Svelte (https://svelte.dev/docs/svelte/legacy-export-let#Renaming-props)
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<nav class={cn('w-full flex justify-center items-center gap-4 lg:gap-6', className)}>
	{#each locations as { name, route } (route)}
		<a href={route} class:active={route === $page.route.id}>
			{name}
		</a>
	{/each}
</nav>

<style lang="postcss">
	a {
		@apply text-sm font-medium 
		text-muted-foreground
		transition-all duration-500 ease-in;
	}
	a.active {
		@apply text-primary scale-125;
	}
	a:hover {
		@apply text-primary;
		animation: float 1s infinite ease-in-out;
	}

	@keyframes float {
		0% {
			transform: translateY(0px) scale(1.25);
		}
		50% {
			transform: translateY(-2px) scale(1.25);
		}
		100% {
			transform: translateY(0px) scale(1.25);
		}
	}
</style>
