<script lang="ts">
	let textElement: HTMLDivElement;
	let cubeElement: HTMLDivElement;

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
		// if (cubeElement) cubeElement.style.transform = transform;
	}
</script>

<svelte:window ondeviceorientation={handleDeviceOrientation} />

<!-- <Cube bind:cubeElement /> -->
<p class="border-4 border-dashed border-accent-2 rounded-2xl p-2 m-4" bind:this={textElement}>
	Place your phone flat on a table please!
</p>

<style>
</style>
