<script lang="ts">
	import '../app.pcss';
	import type { Snippet } from 'svelte';
	import SiteHeader from './SiteHeader.svelte';
	import { onNavigate } from '$app/navigation';
	import { ModeWatcher } from '$lib/theme';
	import SiteHeaderNew from './SiteHeaderNew.svelte';

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
	<!-- <SiteHeader /> -->
	<SiteHeaderNew />
	<!-- <SiteHeader headerStyle={Math.random() > 0.5 ? 'rounded' : 'default'} /> -->
	{@render children()}
</div>

<style lang="postcss">
</style>
