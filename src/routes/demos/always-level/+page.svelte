<script lang="ts">
	import Cube from './cube.svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let textElement: HTMLDivElement;
	let cubeElement: HTMLDivElement;

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
					if (permissionState === 'granted') {
						window.addEventListener('deviceorientation', handleDeviceOrientation);
					}
				})
				.catch(console.error);
		} else {
			window.addEventListener('deviceorientation', handleDeviceOrientation);
		}
	}

	function handleDeviceOrientation(event: DeviceOrientationEvent) {
		const alpha = event.alpha || 0;
		const beta = event.beta || 0;
		const gamma = event.gamma || 0;

		// If exactly upright (basically, non mobile devices)
		if (alpha === 0 && beta === 90 && gamma === 0) {
			return;
		}

		// This works if the device is flat on a table
		// const transform = `rotateZ(${alpha}deg)`;
		// This works if the device is held upright
		// const transform = `rotateX(${beta}deg) rotateY(${gamma}deg)`;
		// This combines both
		const transform = `rotateX(${beta}deg) rotateY(${gamma}deg) rotateZ(${alpha}deg)`;

		if (textElement) textElement.style.transform = transform;
		if (cubeElement) cubeElement.style.transform = transform;
	}
</script>

<svelte:window ondeviceorientation={handleDeviceOrientation} />

{#if data.isIosSafari}
	<div class="centered">
		<button onclick={requestIosSafariDeviceOrientation}
			>Request iOS Safari Device Orientation</button
		>
	</div>
{/if}

<div class="centered" style:height="90vh">
	<!-- <Cube bind:cubeElement /> -->
	<p class="leveled" bind:this={textElement}>Place your phone flat on a table please!</p>
</div>

<style>
	.centered {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button {
		margin: 10px;
	}

	.leveled {
		border: 3px dashed red;
	}
</style>
