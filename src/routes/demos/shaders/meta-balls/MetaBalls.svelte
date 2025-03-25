<script lang="ts">
	import { getNormalizedMouseCoords } from '../helpers';
	import { WebGlShader } from 'svader';
	import shaderMetaballs from '$lib/assets/shaders/meta-balls.frag?raw';

	let mouseOverMetaballs: [number, number] = $state([-1, -1]);
</script>

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
