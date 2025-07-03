<script lang="ts">
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils.js';

	interface CalendlyPopupProps {
		/** The Calendly URL to open in the popup */
		url: string;
		/** The text to display in the clickable trigger */
		text: string;
		/** Optional CSS class to apply to the trigger element */
		class?: string;
		/** Whether to render as a button or span element */
		as?: 'button' | 'span' | 'a';
	}

	let { url, text, class: className = '', as = 'button' }: CalendlyPopupProps = $props();

	let calendlyLoaded = $state(false);
	let calendlyElement = $state<HTMLElement | undefined>(undefined);

	onMount(() => {
		// Load Calendly CSS
		const cssLink = document.createElement('link');
		cssLink.href = 'https://assets.calendly.com/assets/external/widget.css';
		cssLink.rel = 'stylesheet';
		document.head.appendChild(cssLink);

		// Load Calendly JS
		const script = document.createElement('script');
		script.src = 'https://assets.calendly.com/assets/external/widget.js';
		script.type = 'text/javascript';
		script.async = true;
		script.onload = () => {
			calendlyLoaded = true;
		};
		document.head.appendChild(script);

		// Cleanup function
		return () => {
			// Remove the CSS link
			document.head.removeChild(cssLink);
			// Remove the script
			document.head.removeChild(script);
		};
	});

	const handleClick = (event: Event) => {
		event.preventDefault();

		if (!calendlyLoaded) {
			console.warn('Calendly widget is not loaded yet');
			return;
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if (typeof (window as any).Calendly !== 'undefined') {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).Calendly.initPopupWidget({ url });
		}
	};
</script>

{#if as === 'button'}
	<button
		bind:this={calendlyElement}
		onclick={handleClick}
		class={cn(
			'text-primary hover:text-primary/80 transition-colors duration-200 cursor-pointer',
			className
		)}
		disabled={!calendlyLoaded}
	>
		{text}
	</button>
{:else if as === 'a'}
	<a
		bind:this={calendlyElement}
		href="#"
		onclick={handleClick}
		class={cn(
			'text-primary hover:text-primary/80 transition-colors duration-200 cursor-pointer',
			className
		)}
	>
		{text}
	</a>
{:else}
	<span
		bind:this={calendlyElement}
		onclick={handleClick}
		class={cn(
			'text-primary hover:text-primary/80 transition-colors duration-200 cursor-pointer',
			className
		)}
		role="button"
		tabindex="0"
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				handleClick(e);
			}
		}}
	>
		{text}
	</span>
{/if}
