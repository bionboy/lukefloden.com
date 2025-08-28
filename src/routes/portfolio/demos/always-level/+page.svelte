<script lang="ts">
	import { onMount } from 'svelte';
	import DeviceOrientationPermissionRequester from './DeviceOrientationPermissionRequester.svelte';
	import AlwaysLevel from './AlwaysLevel.svelte';
	import type { PageData } from './$types';
	import { setDocumentBodyTailwind } from '$lib/setBackground';
	import HeroPage from '$lib/components/HeroPage.svelte';

	let { data }: { data: PageData } = $props();

	onMount(() => setDocumentBodyTailwind('bg-accent'));
</script>

<HeroPage class="bg-accent flex-col">
	<div class="center-container flex-col" style:height="100dvh">
		<DeviceOrientationPermissionRequester isIosSafari={data.isIosSafari} />
		<AlwaysLevel />
	</div>
</HeroPage>

<style lang="postcss">
</style>
