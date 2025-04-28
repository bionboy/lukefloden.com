<script lang="ts">
	interface Props {
		img: string;
		mask: string;
	}

	let { img, mask }: Props = $props();
	let width = $state('30px');
</script>

<div class="container">
	<div class="shader">
		<img class="base-img" src={img} alt="" {width} />
		<div class="shader-layer specular gradient-7">
			<img class="shader-layer mask" src={mask} alt="" {width} />
		</div>
	</div>
</div>

<style lang="postcss">
	.container {
		/* min-width: 512px; */
		/* min-height: 512px; */
		/* @apply debug; */
		/* background-color: transparent; */
	}

	.base-img {
		@apply size-full overflow-clip;
		overflow-clip-margin: content-box;
	}

	/* The Shader Stuff */
	.shader {
		position: relative;
		overflow: hidden;
		backface-visibility: hidden; /* Forces GPU */
		background-color: transparent;
	}

	.shader-layer {
		background: black;
		mix-blend-mode: multiply;
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		/* background-size: 100%; */
		background-position: center;
	}

	.specular {
		mix-blend-mode: color-dodge;
		background-attachment: fixed;
	}

	.mask {
		mix-blend-mode: multiply;
	}

	/* Gradient Definitions */
	.gradient-1 {
		background-image: linear-gradient(
			0deg,
			hsl(359, 60%, 40%),
			hsl(16, 60%, 45%),
			hsl(33, 60%, 50%),
			hsl(45, 60%, 55%),
			hsl(58, 60%, 60%),
			hsl(58, 60%, 65%),
			hsl(58, 60%, 70%),
			hsl(96, 60%, 65%),
			hsl(146, 60%, 60%),
			hsl(183, 60%, 55%),
			hsl(225, 60%, 50%),
			hsl(265, 60%, 45%),
			hsl(303, 60%, 40%)
		);
	}

	.gradient-2 {
		background-image: linear-gradient(
			0deg,
			hsl(0, 0%, 0%) 0%,
			hsl(0, 0%, 0%) 59.8%,
			hsl(221, 61%, 34%) 60%,
			hsl(197, 92%, 86%) 60.2%,
			hsl(0, 0%, 0%) 100%
		);
	}

	.gradient-3 {
		background-image: linear-gradient(
			0deg,
			hsl(0, 0%, 0%) 40%,
			hsl(195, 63%, 71%) 50%,
			hsl(261, 49%, 78%) 100%
		);
	}

	.gradient-4 {
		background-image: linear-gradient(
			25deg,
			hsl(0, 0%, 33%) 30%,
			hsl(138, 26%, 83%) 45%,
			hsl(77, 5%, 72%) 65%,
			hsl(0, 0%, 33%) 70%
		);
	}

	.gradient-5 {
		background-image: linear-gradient(
			0deg,
			hsl(0, 0%, 0%) 10%,
			hsl(67, 61%, 83%) 45%,
			hsl(0, 0%, 0%) 80%
		);
	}

	.gradient-6 {
		background-image: linear-gradient(
			0deg,
			hsl(0, 0%, 0%) 0%,
			hsl(50, 100%, 88%) 30%,
			hsl(50, 100%, 88%) 70%,
			hsl(0, 0%, 0%) 90%
		);
	}

	.gradient-7 {
		background-image: linear-gradient(
			30deg,
			hsl(30, 80%, 20%) 0%,
			hsl(30, 80%, 80%) 10%,
			hsl(30, 80%, 20%) 20%,
			hsl(30, 80%, 80%) 30%,
			hsl(30, 80%, 20%) 35%,
			hsl(30, 80%, 80%) 50%,
			hsl(30, 80%, 20%) 65%,
			hsl(30, 80%, 80%) 70%,
			hsl(30, 80%, 20%) 80%,
			hsl(30, 80%, 80%) 90%,
			hsl(30, 80%, 20%) 100%
		);
	}

	.gradient-deer {
		background-image: linear-gradient(
			-25deg,
			hsl(0, 0%, 0%) 30%,
			hsl(104, 26%, 83%) 45%,
			hsl(273, 22%, 25%) 65%,
			hsl(0, 0%, 0%) 70%
		);
	}
</style>
