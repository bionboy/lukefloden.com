<script lang="ts">
	import '../app.pcss';
	import type { Snippet } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { ModeWatcher } from '$lib/theme';
	import SiteHeader25 from './SiteHeader25.svelte';

	let { children }: { children: Snippet } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<ModeWatcher />
<div class="relative flex flex-col">
	<SiteHeader25 />
	{@render children()}
</div>

<style lang="postcss">
</style>
