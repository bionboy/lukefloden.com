<script lang="ts">
	import '../app.pcss';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { ModeWatcher } from 'mode-watcher';
	import SiteHeader from './SiteHeader.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<ModeWatcher />
<div class="relative flex flex-col">
	<SiteHeader />
	{@render children()}
</div>
