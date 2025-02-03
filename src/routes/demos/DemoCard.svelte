<script lang="ts">
	import AspectRatio from '$lib/components/ui/aspect-ratio/aspect-ratio.svelte';
	import * as Card from '$lib/components/ui/card/';
	import type { Snippet } from 'svelte';

	let props: {
		title?: string;
		description?: string;
		route?: string;
		children?: Snippet;
		footer?: Snippet;
	} = $props();
</script>

<a href={props.route}>
	<Card.Root
		class="
		drop-shadow-xl
		transition-transform hover:scale-105 
		overflow-clip
	"
	>
		<AspectRatio ratio={1} class="flex flex-col">
			<Card.Header>
				{#if props.title}
					<Card.Title>{props.title}</Card.Title>
				{/if}
				{#if props.description}
					<Card.Description>{props.description}</Card.Description>
				{/if}
			</Card.Header>
			<Card.Content class="flex-grow min-h-0 min-w-0 p-0 m-6 overflow-clip rounded">
				{@render props.children?.()}
			</Card.Content>
			{#if props.footer}
				<Card.Footer class="gap-2 justify-end">
					{@render props.footer?.()}
				</Card.Footer>
			{/if}
		</AspectRatio>
	</Card.Root>
</a>
