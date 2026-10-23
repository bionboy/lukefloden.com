<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '#lib/utils.js';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div
	class={cn('flex flex-col p-6 pb-0 [&>:not([hidden])~:not([hidden])]:mt-1.5', className)}
	{...$$restProps}
>
	<slot />
</div>
