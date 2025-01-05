<script lang="ts">
	import { cn } from '$lib/utils.js';

	export type NavLocations = { route: string; name: string }[];

	const defaultLocations = [
		{ route: '/', name: 'Home' },
		{ route: '/demos', name: 'Demos' },
		{ route: '/about', name: 'About' },
		{ route: '/contact', name: 'Contact' }
	];

	let { locations = defaultLocations }: { locations?: NavLocations } = $props();

	// This is the excepted way to use props that use keywords in Svelte (https://svelte.dev/docs/svelte/legacy-export-let#Renaming-props)
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<nav class={cn('flex items-center space-x-4 lg:space-x-6', className)}>
	{#each locations as { name, route }}
		<a href={route}> {name} </a>
	{/each}
</nav>

<style lang="postcss">
	a {
		@apply text-muted-foreground hover:text-primary text-sm font-medium transition-colors;
	}
</style>
