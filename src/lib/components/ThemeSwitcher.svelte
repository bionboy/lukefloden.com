<script lang="ts">
	import { mode, setMode, resetMode, type ColorThemeMode, ThemeMode } from '$lib/theme';
	import { Moon, Sun, SunMoon } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { ClassValue } from 'svelte/elements';

	const props: { class?: ClassValue } = $props();

	let selectedMode: ColorThemeMode = $state($mode ?? ThemeMode.SYSTEM);

	const rotateMode = () => {
		switch (selectedMode) {
			case ThemeMode.LIGHT:
				setMode((selectedMode = ThemeMode.DARK));
				break;
			case ThemeMode.DARK:
				selectedMode = ThemeMode.SYSTEM;
				resetMode();
				break;
			case ThemeMode.SYSTEM:
				setMode((selectedMode = ThemeMode.LIGHT));
				break;
			default:
				resetMode();
				break;
		}
	};
</script>

<Button
	on:click={rotateMode}
	variant="outline"
	size="icon"
	class={['relative overflow-clip', props.class]}
>
	<div class="icon" class:selected={selectedMode !== ThemeMode.LIGHT}><Sun /></div>
	<div class="icon" class:selected={selectedMode !== ThemeMode.DARK}><Moon /></div>
	<div class="icon" class:selected={selectedMode !== ThemeMode.SYSTEM}><SunMoon /></div>
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
