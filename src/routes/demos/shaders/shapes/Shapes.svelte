<script lang="ts">
	import { SvaderErrorBoundary } from '$lib/components/SvaderErrorBoundary';
	import shaderShapes from '$lib/assets/shaders/shapes.frag?raw';

	let mouse: [number, number] = $state([-1, -1]);
</script>

<div class="size-full">
	<SvaderErrorBoundary
		code={shaderShapes}
		parameters={[
			{ name: 'u_resolution', value: 'resolution' },
			{ name: 'u_mouse', type: 'vec2', value: mouse },
			{ name: 'u_time', value: 'time' }
		]}
	>
		<div class="fallback">WebGL not supported in this environment.</div>
	</SvaderErrorBoundary>
</div>
