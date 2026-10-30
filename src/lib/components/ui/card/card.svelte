<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '#lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	class={cn(
		'bg-card/50 text-card-foreground rounded-lg border shadow-sm',
		'backdrop-blur-sm',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
