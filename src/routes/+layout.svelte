<script lang="ts">
	import '../app.pcss';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { ModeWatcher } from 'mode-watcher';
	import SiteHeader from './SiteHeader.svelte';
	import { onNavigate } from '$app/navigation';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

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
	<SiteHeader headerStyle="rounded" />
	<!-- <SiteHeader headerStyle="default" /> -->
	<!-- <SiteHeader headerStyle={Math.random() > 0.5 ? 'rounded' : 'default'} /> -->
	{@render children()}
</div>

<style lang="postcss">
</style>
