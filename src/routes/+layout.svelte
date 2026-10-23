<script lang="ts">
	import '../app.pcss';
	import type { Snippet } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { browser } from '$app/env';
	import { ModeWatcher } from '#lib/theme.js';
	import { trackVercelObservability } from '#lib/vercel-observability.svelte.js';
	import SiteHeader from './SiteHeader.svelte';

	let { children }: { children: Snippet } = $props();

	if (browser) trackVercelObservability();

	onNavigate((navigation) => {
		if (navigation.shallow && navigation.type === 'goto') return;
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
	<SiteHeader />
	{@render children()}
</div>

<style lang="postcss">
</style>
