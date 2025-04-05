<!-- Inspiration for header: https://www.daisychainstudio.net/ (credit: https://twomuch.studio) -->

<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';
	import { Star } from 'lucide-svelte';

	interface Props {
		headerStyle?: 'default' | 'rounded';
	}

	let { headerStyle = 'default' }: Props = $props();

	let hovering = $state(false);
	let headerHeight = $state(0);
	const scroll = $state({
		y: 0,
		yPrev: 0,
		up: false
	});
	let headerMinimized: boolean = $derived(
		!hovering && !scroll.up && scroll.y > headerHeight * 2 - 1
	);

	const hoverTrue = () => (hovering = true);
	const hoverFalse = () => (hovering = false);
	const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

	const onscroll = () => {
		scroll.up = scrollY - scroll.yPrev < 0;
		scroll.yPrev = scrollY;
	};
</script>

<svelte:window bind:scrollY={scroll.y} {onscroll} />

<!-- creating container and using overflow clip on it so that "inset" doesn't mess with clipping the contents -->
<div class="header-container overflow-x-clip">
	<div
		class={['site-header header-shape', headerStyle, { headerMinimized }]}
		role="navigation"
		bind:clientHeight={headerHeight}
		onmouseovercapture={hoverTrue}
		onmouseoutcapture={hoverFalse}
		onfocuscapture={hoverTrue}
		onblurcapture={hoverFalse}
	>
		<div class="island left" class:headerMinimized>
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
		</div>
		<div class="middle" class:headerMinimized>
			<Nav />
		</div>
		<div class="island right" class:headerMinimized>
			<ThemeSwitcher class={[headerStyle === 'rounded' && 'rounded-full']} />
		</div>
	</div>

	<div class={['backdrop header-shape', headerStyle, { headerMinimized }]}></div>

	<div class={['placeholder header-shape', headerStyle, { headerMinimized }]}></div>
</div>

<style lang="postcss">
	.header-shape {
		@apply w-screen h-16 mb-4;

		&.rounded {
			/* TODO(@bionboy, 2025-01-21): Fix the rounding algorithm to not have bad edges, use apple rounding */
			@apply w-auto h-16 inset-x-2 inset-y-3 px-2 mb-8 rounded-full;
		}
	}

	.site-header {
		view-transition-name: header;
		@apply fixed
			z-10
			flex items-center justify-between;
	}

	.backdrop {
		view-transition-name: header-backdrop;

		@apply fixed
			z-[9]
			bg-muted
			bg-opacity-50
			backdrop-blur-md
			shadow-lg;

		transition:
			transform 0.3s ease-in-out,
			opacity 0.3s ease-in-out;

		&.headerMinimized {
			@apply -translate-y-full opacity-0;
		}
	}

	.island {
		@apply p-2
			center-container
			transition-transform ease-in-out duration-500;
	}

	.left {
		&.headerMinimized {
			@apply scale-110 rotate-[20deg];
		}
	}
	.right {
		&.headerMinimized {
			@apply translate-x-20;
		}
	}

	.middle {
		@apply transition-[transform,opacity] ease-in-out duration-500;
		&.headerMinimized {
			@apply -translate-y-full -scale-x-0 opacity-0;
		}
	}
</style>
