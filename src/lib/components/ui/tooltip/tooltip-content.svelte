<script lang="ts">
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import { cn, flyAndScale } from '#lib/utils.js';

	let {
		class: className,
		sideOffset = 4,
		children,
		...restProps
	}: TooltipPrimitive.ContentProps = $props();
</script>

<TooltipPrimitive.Content {sideOffset} forceMount {...restProps}>
	{#snippet child({ wrapperProps, props, open })}
		{#if open}
			<div {...wrapperProps}>
				<div
					{...props}
					data-slot="tooltip-content"
					class={cn(
						'bg-popover text-popover-foreground z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md',
						className
					)}
					transition:flyAndScale={{ y: 8, duration: 150 }}
				>
					{@render children?.()}
				</div>
			</div>
		{/if}
	{/snippet}
</TooltipPrimitive.Content>
