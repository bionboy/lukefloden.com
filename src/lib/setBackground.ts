import { onMount } from 'svelte';

export function setDocumentBodyTailwind(twClass: string) {
	onMount(() => {
		const bodyClasses = document.body.classList;
		bodyClasses.add(twClass);

		// reset after navigating away from the current page
		return () => bodyClasses.remove(twClass);
	});
}
