<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { type Events, type Props, buttonVariants } from './index.js';
	import { cn } from '$lib/utils.js';

	type $$Props = Props;
	type $$Events = Events;

	const {
		class: className,
		variant = 'default',
		size = 'default',
		builders = [],
		...restProps
	}: $$Props = $props();

	// @ts-expect-error - Type compatibility issue with clsx/tailwind-variants
	const computedClass = $derived(cn(buttonVariants({ variant, size, className })));
</script>

<!-- @ts-expect-error - Complex type unions from bits-ui -->
<ButtonPrimitive.Root
	{builders}
	class={computedClass}
	type="button"
	{...restProps}
>
	<slot />
</ButtonPrimitive.Root>
