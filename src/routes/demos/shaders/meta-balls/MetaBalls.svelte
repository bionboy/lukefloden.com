<script lang="ts">
	import { getNormalizedMouseCoords } from '../helpers';
	import { WebGlShader } from 'svader';
	import shaderCode from '$lib/assets/shaders/meta-balls.frag?raw';

	let mouse: [number, number] = $state([-1, -1]);
</script>

<div
	class="size-full dark:invert"
	role="presentation"
	onmousemove={(event) => (mouse = getNormalizedMouseCoords(event))}
	onmouseleave={() => (mouse = [-1, -1])}
	onblur={() => (mouse = [-1, -1])}
>
	<WebGlShader
		code={shaderCode}
		parameters={[
			{ name: 'u_resolution', value: 'resolution' },
			{ name: 'u_mouse', type: 'vec2', value: mouse },
			{ name: 'u_time', value: 'time' }
		]}
		forceAnimation={true}
	>
		<div class="fallback">WebGL not supported in this environment.</div>
	</WebGlShader>
</div>
