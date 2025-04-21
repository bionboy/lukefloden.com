<script lang="ts">
	import * as Card from '$lib/components/ui/card/';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<Card.Root class="max-w-xl mx-auto bg-accent-2/30">
	<Card.Content class="">
		{@render children()}
	</Card.Content>
</Card.Root>
