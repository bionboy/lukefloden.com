<!-- Inspiration for header: https://www.daisychainstudio.net/ (credit: https://twomuch.studio) -->

<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';
	import { Star } from 'lucide-svelte';
	import type { Props as PageHeaderProps } from '$lib/components/PageHeader.svelte';

	let { headerStyle = 'rounded' }: PageHeaderProps = $props();

	const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<PageHeader {headerStyle} let:headerMinimized>
	<!-- creating container and using overflow clip on it so that "inset" doesn't mess with clipping the contents -->
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
</PageHeader>

<style lang="postcss">
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
