<script lang="ts">
	let { isIosSafari } = $props();

	let orientationEventPermission = $state('');

	/**
	 * Request permission for iOS Safari to access device orientation.
	 * Requires user interaction to trigger.
	 * @param callback
	 */
	function requestIosSafariDeviceOrientation() {
		if (
			typeof DeviceOrientationEvent !== 'undefined' &&
			// @ts-ignore
			typeof DeviceOrientationEvent.requestPermission === 'function'
		) {
			// @ts-ignore
			DeviceOrientationEvent.requestPermission()
				.then((permissionState: string) => {
					orientationEventPermission = permissionState;
					if (permissionState === 'granted') {
						// nothing to do, the event listener is already added in the svelte:window directive
					} else {
						alert('Permission denied');
					}
				})
				.catch(console.error);
		} else {
			alert('somehow this is not an iOS device but the useagent says it is....');
		}
	}
</script>

{#if isIosSafari && orientationEventPermission !== 'granted'}
	<button onclick={requestIosSafariDeviceOrientation}>Request iOS Safari Device Orientation</button>
{/if}

<style>
	button {
		margin: 10px;
	}
</style>
