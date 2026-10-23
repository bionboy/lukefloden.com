<script lang="ts">
	import * as Tooltip from '#lib/components/ui/tooltip/index.js';
	import type { Snippet } from 'svelte';

	interface props {
		title: string;
		href: string;
		svgProps?: object;
		children: Snippet;
	}
	let { title, href, svgProps, children }: props = $props();

	const closeDelayMs = 200;
	let open = $state(false);
	let closeTimer: ReturnType<typeof setTimeout> | undefined;

	const setOpen = (next: boolean) => {
		clearTimeout(closeTimer);
		if (next) open = true;
		else closeTimer = setTimeout(() => (open = false), closeDelayMs);
	};
</script>

<Tooltip.Provider>
	<Tooltip.Root delayDuration={0} bind:open={() => open, setOpen}>
		<!-- tabindex={-1} -->
		<Tooltip.Trigger
			class="transition-transform
			hover:scale-110 hover:-rotate-12
			focus-within:scale-110 focus-within:-rotate-12
		"
		>
			<a {href} target="_blank" rel="noopener noreferrer" tabindex={-1}>
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
</Tooltip.Provider>
