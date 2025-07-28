<script lang="ts">
	import { WebGlShader } from 'svader';

	interface Props {
		code: string;
		parameters?: Array<{
			name: string;
			type?: string;
			value: any;
		}>;
		forceAnimation?: boolean;
		children: import('svelte').Snippet;
	}

	let { code, parameters = [], forceAnimation, children }: Props = $props();
</script>

<svelte:boundary>
	<WebGlShader {code} {parameters} {forceAnimation}>
		{@render children()}
	</WebGlShader>

	{#snippet failed(error, reset)}
		<!--
			Render the original fallback content when an error occurs.
			This provides a consistent fallback experience for both
			WebGL-not-supported and runtime error scenarios.
		-->
		{@render children()}
	{/snippet}
</svelte:boundary>