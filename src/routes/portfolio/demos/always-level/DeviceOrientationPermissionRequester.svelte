<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	let { isIosSafari } = $props();

	let orientationEventPermission = $state<'' | PermissionState>('');

	/**
	 * Request permission for iOS Safari to access device orientation.
	 * Requires user interaction to trigger.
	 * @param callback
	 */
	async function requestIosSafariDeviceOrientation() {
		const hasDOE = typeof DeviceOrientationEvent !== 'undefined';
		const canRequest =
			hasDOE && typeof (DeviceOrientationEvent as any).requestPermission === 'function';
		try {
			if (canRequest) {
				const state = await (DeviceOrientationEvent as any).requestPermission();
				orientationEventPermission = state as PermissionState;
				if (state !== 'granted') alert('Permission denied');
			} else {
				// On non-iOS Safari, explicit permission request is not required or unsupported
				alert('Device orientation permission request is not available in this browser.');
			}
		} catch (e) {
			console.error(e);
		}
	}
</script>

{#if isIosSafari && orientationEventPermission !== 'granted'}
	<Button onclick={requestIosSafariDeviceOrientation}>Request iOS Safari Device Orientation</Button>
{/if}
