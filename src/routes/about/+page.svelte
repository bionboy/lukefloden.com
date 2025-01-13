<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="bg-secondary m-8 p-4 font-jersey15">
	<h2>Me</h2>
	<h2>This Site</h2>
</div>

<style lang="postcss">
</style>
