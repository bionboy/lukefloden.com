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
		<Button onclick={scrollToTop} variant="link" size="icon">
			<Star
				size="2rem"
				class={cn(
					'transition-all fill-yellow-400 hover:-rotate-12',
					headerMinimized && ' stroke-yellow-400'
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

<div class={['header-shape', headerStyle, { headerMinimized }]}></div>

<style lang="postcss">
	.header-shape {
		@apply w-screen h-16;
		&.rounded {
			/* TODO(@bionboy, 2025-01-21): Fix the rounding algorithm to not have bad edges, use apple rounding */
			@apply w-auto h-16 inset-x-2 inset-y-3 px-2 rounded-full;
		}
	}

	.site-header {
		@apply fixed
			z-10 
			flex items-center justify-between
      overflow-x-clip
			gap-4;

		/* Disables the view-transistion usage outside of this component */
		view-transition-name: header;
	}

	.backdrop {
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
			@apply scale-75 rotate-[25deg];
		}
	}
	.right {
		@apply translate-y-0;
		&.headerMinimized {
			@apply translate-x-full;
		}
	}

	.middle {
		@apply transition-transform ease-in-out duration-500;
		&.headerMinimized {
			@apply -translate-y-full scale-x-0;
		}
	}
</style>
