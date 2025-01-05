<script lang="ts">
	import '../app.pcss';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Header from '$lib/components/Header.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<Header />
{@render children()}
