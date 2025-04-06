<script lang="ts">
	import '../app.pcss';
	import type { Snippet } from 'svelte';
	import SiteHeader from './SiteHeader.svelte';
	import { onNavigate } from '$app/navigation';
	import { ModeWatcher } from '$lib/theme';
	import SiteHeader2 from './SiteHeader2.svelte';
	import SiteHeader3 from './SiteHeader3.svelte';
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
	<!-- <SiteHeader /> -->
	<!-- <SiteHeaderNew /> -->
	<SiteHeader25 />
	<!-- <SiteHeader headerStyle={Math.random() > 0.5 ? 'rounded' : 'default'} /> -->
	{@render children()}
</div>

<style lang="postcss">
</style>
