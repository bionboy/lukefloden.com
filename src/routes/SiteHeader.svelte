<!-- Inspiration for header: https://www.daisychainstudio.net/ (credit: https://twomuch.studio) -->

<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	let hovering = $state(false);
	const hoverTrue = () => (hovering = true);
	const hoverFalse = () => (hovering = false);

	let headerHeight = $state(0);
	let scrollY: number = $state(0);
	let headerMinimized: boolean = $derived(!hovering && scrollY > headerHeight * 1 - 1);

	const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<svelte:window bind:scrollY />

<div
	class="site-header"
	role="navigation"
	bind:clientHeight={headerHeight}
	onmouseovercapture={hoverTrue}
	onmouseoutcapture={hoverFalse}
	onfocuscapture={hoverTrue}
	onblurcapture={hoverFalse}
>
	<div class="backdrop" class:headerMinimized></div>
	<div class="island left" class:headerMinimized>
		<div
			class="size-10 bg-destructive rounded-full"
			onclick={scrollToTop}
			onkeydown={(e) => e.key === 'Enter' && scrollToTop()}
			role="button"
			tabindex="0"
			aria-label="Scroll to top"
		></div>
	</div>
	<div class="middle" class:headerMinimized>
		<Nav />
	</div>
	<div class="island right" class:headerMinimized>
		<ThemeSwitcher />
	</div>
</div>

<style lang="postcss">
	.site-header {
		@apply sticky z-10 top-0 w-screen h-16 
			flex items-center justify-between
      overflow-x-clip
			gap-4;
	}

	.backdrop {
		@apply -z-[1] absolute size-full
      bg-background bg-opacity-60 backdrop-blur-sm
			shadow-lg
			opacity-100;

		transition:
			transform 0.3s ease-in-out,
			opacity 0.3s ease-in-out;

		&.headerMinimized {
			@apply -translate-y-full opacity-0;
		}
	}

	.island {
		@apply p-2 
			transition-transform ease-in-out duration-500;
	}

	.left {
		&.headerMinimized {
			@apply scale-75;
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
