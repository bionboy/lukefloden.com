<script lang="ts">
	import { toggleMode, mode } from 'mode-watcher';
	import { Moon, Sun } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils';

	const iconTailwind = 'icon size-[1.5rem] transition-all duration-500 absolute rotate-0';
</script>

<Button on:click={toggleMode} variant="outline" size="icon" class="overflow-clip relative">
	<!-- TODO(@bionboy, 2025-01-13): See if I can get rid of this strange syntax 
			after upgrading the shad ui svelte port.
			Or if I need to fix my tailwind config
		-->
	<Sun class={cn(iconTailwind, $mode === 'dark' && '-rotate-90 translate-y-10')} />
	<Moon class={cn(iconTailwind, $mode === 'light' && 'rotate-90 translate-y-10')} />
	<span class="sr-only">Toggle theme</span>
</Button>

<style lang="postcss">
	.icon {
		@apply transition-all;
	}
	.icon:hover {
		@apply animate-spin duration-100 ease-linear;
	}
</style>
