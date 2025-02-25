<script lang="ts">
	import AspectRatio from '$lib/components/ui/aspect-ratio/aspect-ratio.svelte';
	import * as Card from '$lib/components/ui/card/';
	import type { Snippet } from 'svelte';
	import { Badge, GithubBadge } from '$lib/components/ui/badge';

	let props: {
		title?: string;
		description?: string;
		tags?: string[];
		route?: string;
		children?: Snippet;
		footer?: Snippet;
		github?: string;
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
			<Card.Footer class="flex-row-reverse flex-wrap-reverse gap-2 justify-start">
				{#if props.github}
					<GithubBadge href={props.github} />
				{/if}
				{#if props.tags}
					{#each props.tags as tag}
						<Badge variant="secondary">{tag}</Badge>
					{/each}
				{/if}
			</Card.Footer>
		</AspectRatio>
	</Card.Root>
</a>
