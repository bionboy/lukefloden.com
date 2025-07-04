<script lang="ts">
	import '../app.pcss';
	import type { Snippet } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { ModeWatcher } from '$lib/theme';
	import SiteHeader from './SiteHeader.svelte';
	import { Tooltip } from 'bits-ui';

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
<Tooltip.Provider>
	<div class="relative flex flex-col">
		<SiteHeader />
		{@render children()}
	</div>
</Tooltip.Provider>

<style lang="postcss">
</style>
