<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Snippet } from 'svelte';

	let props: {
		title?: string;
		subtitle?: string;
		id?: string;
		children?: Snippet;
		titleContent?: Snippet;
		topRightContent?: Snippet;
	} = $props();
</script>

<Card.Root class="bg-secondary" id={props.id || props.title}>
	<Card.Header>
		<div class="flex justify-between items-center flex-wrap">
			<Card.Title tag="h2" class="gradient-text pb-2 leading-10 text-pretty">
				{#if props.titleContent}
					{@render props.titleContent()}
				{:else}
					{props.title}
				{/if}
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
