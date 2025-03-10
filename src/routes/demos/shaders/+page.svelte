<script lang="ts">
	import { WebGlShader } from 'svader';
	import shaderMetaballs from '$lib/assets/shaders/meta-balls.frag?raw';
	import DemoCard from '../DemoCard.svelte';

	// init it out of frame
	let mouseOverMetaballs: [number, number] = $state([-1, -1]);

	function getNormalizedMouseCoords(event: MouseEvent): [number, number] {
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const x = (event.clientX - rect.left) / rect.width;
		const y = (event.clientY - rect.top) / rect.height;
		// shader expects origin to be bottom left not top left, hence 1 - y
		return [x, 1 - y];
	}
</script>

<div class="gallery">
	<DemoCard
		title="Meta Balls"
		description="A simple shader for metaballs"
		tags={['GLSL', 'WebGL']}
		route="demos/shaders/meta-balls"
		github=""
	>
		<div
			class="size-full dark:invert"
			role="presentation"
			onmousemove={(event) => (mouseOverMetaballs = getNormalizedMouseCoords(event))}
			onmouseleave={() => (mouseOverMetaballs = [-1, -1])}
			onblur={() => (mouseOverMetaballs = [-1, -1])}
		>
			<WebGlShader
				code={shaderMetaballs}
				parameters={[
					{ name: 'u_resolution', value: 'resolution' },
					{ name: 'u_mouse', type: 'vec2', value: mouseOverMetaballs },
					{ name: 'u_time', value: 'time' }
				]}
			>
				<div class="fallback">WebGL not supported in this environment.</div>
			</WebGlShader>
		</div>
	</DemoCard>
</div>

<style lang="postcss">
	.gallery {
		@apply grid gap-4 m-5;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
</style>
