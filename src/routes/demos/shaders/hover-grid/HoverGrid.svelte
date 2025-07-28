<script lang="ts">
	import { SvaderErrorBoundary } from '$lib/components/SvaderErrorBoundary';
	import shaderHoverGrid from '$lib/assets/shaders/hover-grid.frag?raw';
	import { getNormalizedMouseCoords } from '../helpers';

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
		code={shaderHoverGrid}
		parameters={[
			{ name: 'u_resolution', value: 'resolution' },
			{ name: 'u_mouse', type: 'vec2', value: mouse },
			{ name: 'u_time', value: 'time' }
		]}
	>
		<div class="fallback">WebGL not supported in this environment.</div>
	</SvaderErrorBoundary>
</div>
