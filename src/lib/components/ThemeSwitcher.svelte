<script lang="ts">
	import { mode, toggleMode, resetMode, setMode } from 'mode-watcher';
	import { Moon, Sun, SunMoon } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	// TODO(@bionboy, 2025-01-17): Use the `Mode` type from the mode-watcher package somehow
	type colorThemeMode = 'light' | 'dark' | 'system';

	let selectedMode: colorThemeMode = $state($mode ?? 'system');

	const rotateMode = () => {
		switch (selectedMode) {
			case 'light':
				setMode((selectedMode = 'dark'));
				break;
			case 'dark':
				selectedMode = 'system';
				resetMode();
				break;
			case 'system':
				setMode((selectedMode = 'light'));
				break;
			default:
				resetMode();
				break;
		}
	};
</script>

<Button on:click={rotateMode} variant="outline" size="icon" class="relative overflow-clip">
	<div class="icon" class:selected={selectedMode !== 'light'}><Sun /></div>
	<div class="icon" class:selected={selectedMode !== 'dark'}><Moon /></div>
	<div class="icon" class:selected={selectedMode !== 'system'}><SunMoon /></div>
	<span class="sr-only">Rotate theme options</span>
</Button>

<style lang="postcss">
	.icon {
		@apply absolute size-full
		center-container
		transition-transform duration-700;
		&.selected {
			@apply rotate-90 translate-y-10;
		}
	}
</style>
