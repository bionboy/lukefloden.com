<script>
	let { children, afterContent = undefined, class: className = '' } = $props();
</script>

<div
	class="hero center-container overflow-clip {afterContent ? 'absolute' : 'fixed'}
 {className}
"
>
	{@render children()}
</div>

<!-- ! Not using an if block around this because it breaks view transitions! -->
<div class="hero-after">
	{@render afterContent?.()}
</div>

<style lang="postcss">
	/* Additional component-specific styles can go here if needed */

	:root {
		--hero-offset: -4rem;
		--hero-height: calc(100dvh - var(--hero-offset));
		--after-hero-offset: calc(100dvh + var(--hero-offset) + -2rem);
	}

	.hero {
		top: var(--hero-offset);
		height: var(--hero-height);
		width: 100vw;
	}

	.hero-after {
		margin-top: var(--after-hero-offset);
	}
</style>
