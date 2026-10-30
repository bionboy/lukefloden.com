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
	data-slot="card-header"
	class={cn('flex flex-col p-6 pb-0 [&>:not([hidden])~:not([hidden])]:mt-1.5', className)}
	{...restProps}
>
	{@render children?.()}
</div>
