<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import type { Snippet } from 'svelte';

	let props: {
		title?: string;
		description?: string;
		route?: string;
		children?: Snippet;
	} = $props();
</script>

<a href={props.route}>
	<Card.Root
		class="
		flex flex-col
		aspect-square shadow-md shadow-border
		transition-transform hover:scale-105 
	"
	>
		<Card.Header>
			{#if props.title}
				<Card.Title>{props.title}</Card.Title>
			{/if}
			{#if props.description}
				<Card.Description>{props.description}</Card.Description>
			{/if}
		</Card.Header>
		<Card.Content class="flex-grow">
			{@render props.children?.()}
		</Card.Content>
	</Card.Root>
</a>
