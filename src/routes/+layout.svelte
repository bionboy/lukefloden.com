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
	<SiteHeader />
	{@render children()}
</div>

<style>
	@import 'view-transition.pcss';
</style>
