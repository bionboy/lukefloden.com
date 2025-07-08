<script lang="ts">
	import { getNormalizedMouseCoords } from '../helpers';
	import { SvaderErrorBoundary } from '$lib/components/SvaderErrorBoundary';
	import shaderCode from '$lib/assets/shaders/circles.frag?raw';

	let mouse: [number, number] = $state([-1, -1]);
</script>

<div
	class="size-full"
	role="presentation"
	onmousemove={(event) => (mouse = getNormalizedMouseCoords(event))}
	onmouseleave={() => (mouse = [-1, -1])}
	onblur={() => (mouse = [-1, -1])}
>
	<SvaderErrorBoundary
		code={shaderCode}
		parameters={[
			{ name: 'u_resolution', value: 'resolution' },
			{ name: 'u_mouse', type: 'vec2', value: mouse },
			{ name: 'u_time', value: 'time' }
		]}
	>
		<div class="fallback">WebGL not supported in this environment.</div>
	</SvaderErrorBoundary>
</div>
