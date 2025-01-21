<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	interface props {
		title: string;
		href: string;
		svgProps?: object;
		children: Snippet;
	}
	let { title, href, svgProps, children }: props = $props();
</script>

<Tooltip.Root openDelay={300}>
	<Tooltip.Trigger>
		<a {href}>
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
