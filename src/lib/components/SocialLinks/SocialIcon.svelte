<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { Snippet } from 'svelte';

	interface props {
		title: string;
		href: string;
		svgProps?: object;
		children: Snippet;
	}
	let { title, href, svgProps, children }: props = $props();
</script>

<Tooltip.Root openDelay={0} closeDelay={200}>
	<!-- tabindex={-1} -->
	<Tooltip.Trigger
		class="transition-transform 
			hover:scale-110 hover:-rotate-12
			focus-within:scale-110 focus-within:-rotate-12
		"
		onclick={() => window.open(href)}
	>
		<!-- TODO: find out how to us a tag here, had to use onlick above so that focus still opens the tooltip -->
		<a {href} tabindex={-1}>
			<svg
				class={[`logo size-16`, title]}
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMidYMid"
				viewBox="0 0 256 256"
				width="256"
				height="256"
				{...svgProps}
			>
				{@render children()}
			</svg>
			<span class="sr-only">{title}</span>
		</a>
	</Tooltip.Trigger>
	<Tooltip.Content side="top">
		<p>{title}</p>
	</Tooltip.Content>
</Tooltip.Root>
