<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Snippet } from 'svelte';

	let props: {
		title?: string;
		subtitle?: string;
		id?: string;
		children?: Snippet;
		topRightContent?: Snippet;
	} = $props();
</script>

<Card.Root class="bg-secondary">
	<Card.Header>
		<div class="flex justify-between items-center">
			<Card.Title tag="h2" class="gradient-text pb-2" id={props.id || props.title}>
				{props.title}
			</Card.Title>
			<div>
				{@render props.topRightContent?.()}
			</div>
		</div>
		{#if props.subtitle}
			<h4>{props.subtitle}</h4>
		{/if}
	</Card.Header>
	<Card.Content>
		{@render props.children?.()}
	</Card.Content>
</Card.Root>
