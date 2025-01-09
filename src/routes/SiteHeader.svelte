<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	let hovering = $state(false);
	const hoverTrue = () => (hovering = true);
	const hoverFalse = () => (hovering = false);

	let headerHeight = $state(0);
	let scrollY: number = $state(0);
	let headerMinimized: boolean = $derived(!hovering && scrollY > headerHeight * 4);
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
		<div class="size-10 bg-destructive rounded-xl transition-transform" class:headerMinimized></div>
	</div>
	<div class="ocean" class:headerMinimized>
		<Nav />
	</div>
	<div class="island right" class:headerMinimized>
		<ThemeSwitcher />
	</div>
</div>

<style lang="postcss">
	.site-header {
		@apply sticky z-10 top-0 w-screen h-16 
			flex items-center 
			gap-4;
	}

	.backdrop {
		@apply -z-[1] absolute size-full
			border-b 
      bg-background bg-opacity-20 backdrop-blur-sm
			shadow-lg
			opacity-100;
		transition:
			transform 0.3s ease-in-out,
			opacity 0.3s ease-in-out;
	}
	.backdrop.headerMinimized {
		@apply -translate-y-full opacity-0;
	}

	.island {
		@apply p-2 
			transition-transform ease-in-out duration-500;
	}
	.left {
	}
	.left.headerMinimized {
		@apply scale-75;
	}
	.right {
		@apply translate-y-0;
	}
	.right.headerMinimized {
		@apply translate-x-full;
	}
	.ocean {
		@apply size-full flex;
		@apply transition-transform ease-in-out duration-500;
	}
	.ocean.headerMinimized {
		@apply -translate-y-full scale-x-0;
	}
</style>
