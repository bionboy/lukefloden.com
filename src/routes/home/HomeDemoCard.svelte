<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		children,
		onclick = undefined,
		bgOpaque = false,
		class: className = ''
	} = $props<{
		children?: Snippet;
		onclick?: (e: MouseEvent) => void;
		bgOpaque?: boolean;
		class?: string;
	}>();
</script>

{#if onclick}
	<button class="island demo-button {className}" class:opaque-bg={bgOpaque} {onclick}>
		{@render children?.()}
	</button>
{:else}
	<div class="island bg-card {className}" class:opaque-bg={bgOpaque}>
		{@render children?.()}
	</div>
{/if}

<style lang="postcss">
	.island {
		--bg-color: var(--accent);
		background-color: oklch(from hsl(var(--bg-color)) calc(l * 0.8) c h / 0.2);

		@apply backdrop-blur-sm 
		  outline outline-1 outline-accent 
			text-accent
		  p-4 rounded-xl;
	}

	.demo-button {
		@apply pointer-events-auto
			h-fit 
			text-accent
			hover:outline-accent-2
			hover:outline-2
			hover:text-accent-2
			active:outline-4;

		&:hover {
			--bg-color: var(--accent2);
		}
	}

	.opaque-bg {
		@apply bg-card;
	}
</style>
