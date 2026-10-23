<script lang="ts">
	import { type Props, buttonVariants } from './index.js';
	import { cn } from '#lib/utils.js';

	let {
		class: className,
		variant = 'default',
		size = 'default',
		children,
		...restProps
	}: Props = $props();
</script>

<button
	type="button"
	class={cn(buttonVariants({ variant, size }), className)}
	{...restProps}
>
	{@render children?.()}
</button>
