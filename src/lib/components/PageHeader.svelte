<!-- Inspiration for header: https://www.daisychainstudio.net/ (credit: https://twomuch.studio) -->

<script lang="ts">
	import type { Snippet } from 'svelte';

	type IslandSnippet = Snippet<[{ headerMinimized: boolean }]>;

	export interface Props {
		id?: string;
		class?: string;
		headerStyle?: 'default' | 'rounded';
		revealOnHover?: boolean;
		revealOnFocus?: boolean;
		hideOnScroll?: boolean;
		children?: Snippet;
		middle?: IslandSnippet;
		left?: IslandSnippet;
		right?: IslandSnippet;
	}

	let {
		id = 'main',
		headerStyle = 'rounded',
		class: className,
		revealOnHover = false,
		hideOnScroll = true,
		middle,
		left,
		right
	}: Props = $props();

	let hovering = $state(false);
	let headerHeight = $state(0);
	const scroll = $state({
		y: 0,
		yPrev: 0,
		up: false
	});
	// let headerMinimized: boolean = $derived( !hovering && !scroll.up && scroll.y > headerHeight * 2 - 1);
	let headerMinimized: boolean = $derived.by(() => {
		if (!hideOnScroll) return false;
		return !hovering && !scroll.up && scroll.y > headerHeight * 2 - 1;
	});

	const hoverTrue = () => (revealOnHover ? (hovering = true) : undefined);
	const hoverFalse = () => (hovering = false);

	const onscroll = () => {
		scroll.up = scrollY - scroll.yPrev < 0;
		scroll.yPrev = scrollY;
	};
</script>

<svelte:window bind:scrollY={scroll.y} {onscroll} />

<!-- creating container and using overflow clip on it so that "inset" doesn't mess with clipping the contents -->
<div class="header-container overflow-x-clip {className}">
	<div
		class={['site-header header-shape', className, headerStyle, { headerMinimized }]}
		role="navigation"
		bind:clientHeight={headerHeight}
		onmouseovercapture={hoverTrue}
		onmouseoutcapture={hoverFalse}
		onfocuscapture={hoverTrue}
		onblurcapture={hoverFalse}
		style:view-transition-name={`page-header-${id}`}
	>
		{#if left}
			<div class="island left" class:headerMinimized>
				{@render left({ headerMinimized })}
			</div>
		{/if}
		{#if middle}
			<div class="island middle" class:headerMinimized>
				{@render middle({ headerMinimized })}
			</div>
		{/if}
		{#if right}
			<div class="island right" class:headerMinimized>
				{@render right({ headerMinimized })}
			</div>
		{/if}
	</div>
	<div
		class={['backdrop header-shape', className, headerStyle, { headerMinimized }]}
		style:view-transition-name={`page-header-backdrop-${id}`}
	></div>

	<div class={['placeholder header-shape', className, headerStyle, { headerMinimized }]}></div>
	<!-- style:view-transition-name={`page-header-placeholder-${id}`} -->
</div>

<style lang="postcss">
	.header-shape {
		@apply w-screen h-16 mb-4;

		&.rounded {
			/* TODO(@bionboy, 2025-01-21): Fix the rounding algorithm to not have bad edges, use apple rounding */
			@apply w-auto 
        h-14
        inset-x-2
        /* inset-y-3  */
        my-2
        px-2 
        rounded-full;
		}
	}

	.site-header {
		@apply fixed
			z-30
			flex items-center justify-between;
	}

	.backdrop {
		@apply fixed
			z-20
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
		@apply mx-auto 
      transition-[transform,opacity] ease-in-out duration-500;
		&.headerMinimized {
			@apply -translate-y-full -scale-x-0 opacity-0;
		}
	}
</style>
