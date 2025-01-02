<script lang="ts">
	// let cubeElement: HTMLDivElement;
	let { cubeElement = $bindable() }: { cubeElement: HTMLDivElement } = $props();

	/**
	 * Request permission for iOS Safari to access device orientation.
	 * Requires user interaction to trigger.
	 * @param callback
	 */
</script>

<!-- <div bind:this={cubeElement} class="cube"> -->
<div bind:this={cubeElement} class="cube">
	<div class="face front">Front</div>
	<div class="face back">Back</div>
	<div class="face left">Left</div>
	<div class="face right">Right</div>
	<div class="face top">Top</div>
	<div class="face bottom">Bottom</div>
</div>

<style>
	.cube {
		width: 100px;
		height: 100px;
		position: relative;
		transform-style: preserve-3d;
		transform: rotateX(0deg) rotateY(0deg);
	}
	.face {
		position: absolute;
		width: 100px;
		height: 100px;
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid #ccc;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
	}
	.front {
		transform: translateZ(50px);
	}
	.back {
		transform: rotateY(180deg) translateZ(50px);
	}
	.left {
		transform: rotateY(-90deg) translateZ(50px);
	}
	.right {
		transform: rotateY(90deg) translateZ(50px);
	}
	.top {
		transform: rotateX(90deg) translateZ(50px);
	}
	.bottom {
		transform: rotateX(-90deg) translateZ(50px);
	}
</style>
