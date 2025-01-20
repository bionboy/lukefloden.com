<script lang="ts">
	import DeviceOrientationPermissionRequester from './DeviceOrientationPermissionRequester.svelte';
	import AlwaysLevel from './AlwaysLevel.svelte';
	import type { PageData } from './$types';
	import { setDocumentBodyTailwind } from '$lib/setBackground';

	let { data }: { data: PageData } = $props();

	setDocumentBodyTailwind('bg-accent');
</script>

<div class="always-level bg-accent text-accent-2">
	<div class="centered mt-16">
		<DeviceOrientationPermissionRequester isIosSafari={data.isIosSafari} />
	</div>
	<div class="centered" style:height="100dvh">
		<AlwaysLevel />
	</div>
</div>

<style lang="postcss">
	.always-level {
		position: absolute;
		width: 100vw;
		height: 100dvh;
		display: flex;
		flex-direction: column;
	}
	.centered {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
