<script lang="ts">
	import AspectRatio from '$lib/components/ui/aspect-ratio/aspect-ratio.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import type { Component, Snippet } from 'svelte';
	import { ExternalLink } from 'lucide-svelte';

	export interface DemoTag {
		name: string;
		twColor?: string;
		icon?: Component;
		variant?: string;
		href?: string;
	}

	let props: {
		title?: string;
		description?: string;
		route?: string;
		tags?: DemoTag[];
		children?: Snippet;
	} = $props();
	// $inspect(props.tags);
</script>

<a href={props.route}>
	<Card.Root
		class="
		shadow-md shadow-border
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
			{#if props.tags}
				<Card.Footer class="gap-2 justify-end">
					{#each props.tags as tag}
						<Badge
							class={`bg-${tag.twColor} hover:bg-${tag.twColor} hover:brightness-90`}
							href={tag.href}
							variant={tag.variant ?? 'default'}
						>
							{tag.name}
							{#if tag.icon}
								<!-- <icon size="1rem" class="ml-1"></icon> -->
								<svelte:component this={tag.icon} size="1rem" class="ml-1"></svelte:component>
							{/if}
						</Badge>
					{/each}
				</Card.Footer>
			{/if}
		</AspectRatio>
	</Card.Root>
</a>
