<script lang="ts">
	import Nav from './Nav.svelte';
	import { cn } from '$lib/utils.js';
</script>

<div
	class={cn(
		// TODO(@bionboy, 2025-01-05): don't hide on smaller screens for now until we have a mobile design that will take its place
		// 'hidden',
		'md:flex flex-col'
	)}
>
	<div class="border-b">
		<div class="flex h-16 items-center px-4">
			<Nav />
		</div>
	</div>
</div>
