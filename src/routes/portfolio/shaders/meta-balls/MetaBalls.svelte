<script lang="ts">
	import { getNormalizedMouseCoords } from '../helpers';
	import { WebGlShader } from 'svader';
	import shaderCode from '$lib/assets/shaders/meta-balls.frag?raw';

	const defaultMouseCoords: [number, number] = [-1, -1];

	let mouse: [number, number] = $state(defaultMouseCoords);
</script>

<div
	class="size-full dark:invert"
	role="presentation"
	onmousemove={(event) => (mouse = getNormalizedMouseCoords(event))}
>
	<!-- * for now turn off reset of mouse coords to avoid performance issue when start of rendering mouse metaball -->
	<!-- onmouseleave={() => (mouse = defaultMouseCoords)} -->
	<!-- onblur={() => (mouse = defaultMouseCoords)} -->
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
