<script lang="ts">
	//  import Sun from "svelte-radix/Sun.svelte";
	//  import Moon from "svelte-radix/Moon.svelte";

	import { resetMode, setMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} size="icon">
			<!-- TODO(@bionboy, 2025-01-08): Add Sun and Moon components -->
			<!-- <Sun -->
			<div class="icon rotate-0 scale-100 dark:-rotate-90 dark:scale-0"></div>
			<!-- <Moon -->
			<div
				class="icon absolute rotate-90 scale-0 dark:rotate-0
				dark:scale-100"
			></div>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item on:click={() => setMode('light')}>Light</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => setMode('dark')}>Dark</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<style lang="postcss">
	.icon {
		@apply size-[1.2rem] transition-all;
	}
</style>
