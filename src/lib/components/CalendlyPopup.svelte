<script lang="ts">
	import { cn } from '$lib/utils.js';
	import Button from './ui/button/button.svelte';

	interface CalendlyPopupProps {
		/** The Calendly URL to open in the popup */
		url: string;
		/** The text to display in the clickable trigger */
		text: string;
		/** Optional CSS class to apply to the trigger element */
		class?: string;
	}

	let { url, text, class: className = '' }: CalendlyPopupProps = $props();

	const handleClick = (event: Event) => {
		event.preventDefault();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const wind = window as any;

		if (typeof wind.Calendly === 'undefined') {
			console.warn('Calendly widget is not loaded yet');
			return;
		}

		wind.Calendly.initPopupWidget({ url });
	};
</script>

<svelte:head>
	<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
	<script
		src="https://assets.calendly.com/assets/external/widget.js"
		type="text/javascript"
		async
	></script>
</svelte:head>

<Button
	onclick={handleClick}
	variant="outline"
	class={cn('text-accent-2 outline outline-accent-2 -outline-offset-1', className)}
>
	<p class="gradient-text">{text}</p>
</Button>
