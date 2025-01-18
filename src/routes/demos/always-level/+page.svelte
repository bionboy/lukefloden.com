<script lang="ts">
	import DeviceOrientationPermissionRequester from './DeviceOrientationPermissionRequester.svelte';
	import AlwaysLevel from './AlwaysLevel.svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<div class="bg-accent text-accent-2">
	<div class="centered">
		<DeviceOrientationPermissionRequester isIosSafari={data.isIosSafari} />
	</div>
	<div class="centered" style:height="100dvh">
		<AlwaysLevel />
	</div>
</div>

<style>
	.centered {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
