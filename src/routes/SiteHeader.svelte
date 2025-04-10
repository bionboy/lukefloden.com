<!-- Inspiration for header: https://www.daisychainstudio.net/ (credit: https://twomuch.studio) -->

<script lang="ts">
	import { page } from '$app/stores';
	import Nav from '$lib/components/Nav.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';
	import { Star } from 'lucide-svelte';
	import type { Props as PageHeaderProps } from '$lib/components/PageHeader.svelte';

	let { headerStyle = 'rounded' }: PageHeaderProps = $props();

	const locations = [
		{ route: '/home', name: 'Home' },
		{
			route: '/about',
			name: 'About',
			subRoutes: [
				{ route: '#me', name: 'Me' },
				{ route: '#career', name: 'Career' },
				{ route: '#working-on', name: 'Working On' }
			]
		},
		{
			route: '/demos',
			defaultSubRoute: '/demos/shaders',
			name: 'Demos',
			subRoutes: [
				{ route: '/demos/shaders', name: 'Shaders' },
				{ route: '/demos/internal', name: 'Internal' },
				{ route: '/demos/external', name: 'External' }
			]
		}
	];

	const subRoutes = $derived(
		locations.find((location) => $page.route.id?.startsWith(location.route))?.subRoutes
	);

	const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<PageHeader {headerStyle}>
	<!-- creating container and using overflow clip on it so that "inset" doesn't mess with clipping the contents -->
	{#snippet left({ headerMinimized })}
		<Button
			onclick={scrollToTop}
			variant="link"
			size="icon"
			name="scroll to top"
			aria-label="scroll to top"
		>
			<Star
				size="2rem"
				class={cn(
					'transition-all duration-700',
					'fill-accent-light stroke-background text-accent-light stroke-1',
					'hover:duration-300 hover:-rotate-12 hover:scale-150',
					headerMinimized && 'stroke-background drop-shadow-glow stroke-2'
				)}
			></Star>
		</Button>
	{/snippet}
	{#snippet middle()}
		<Nav {locations} />
	{/snippet}
	{#snippet right()}
		<ThemeSwitcher class={[headerStyle === 'rounded' && 'rounded-full']} />
	{/snippet}
</PageHeader>
{#if subRoutes}
	<PageHeader id="sub-routes" {headerStyle} class="max-w-64 max-h-10 mx-auto !mt-0">
		{#snippet middle()}
			<Nav locations={subRoutes} />
		{/snippet}
	</PageHeader>
{/if}

<style lang="postcss">
	/* ! HACK: This is hardcoded to fit the sub-routes header so that the backdrop blur is not showing ontop of the next page that is being transitioned to */
	::view-transition-group(page-header-backdrop-sub-routes) {
		@apply backdrop-blur-none;
	}
</style>
