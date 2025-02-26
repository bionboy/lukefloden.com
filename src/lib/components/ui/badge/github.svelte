<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ExternalLink } from 'lucide-svelte';
	import Badge from './badge.svelte';

	let { href, children }: { href: string; children?: Snippet } = $props();
</script>

<Badge variant="secondary" {href}>
	{#if children}
		{@render children?.()}
	{:else}
		GitHub
	{/if}
	<ExternalLink size="1rem" class="ml-1"></ExternalLink>
</Badge>
