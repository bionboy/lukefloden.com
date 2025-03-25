<script lang="ts">
	import * as Card from '$lib/components/ui/card/';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<Card.Root class="max-w-xl mx-auto my-2">
	<Card.Content>
		{@render children()}
	</Card.Content>
</Card.Root>
