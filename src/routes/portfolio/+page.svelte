<script lang="ts">
	import ProjectsSection from './projects/ProjectsSection.svelte';
	import ShadersSection from './shaders/ShadersSection.svelte';
	import DemosSection from './demos/DemosSection.svelte';
</script>

<div class="max-w-7xl mx-auto">
	<h1 id="projects">Projects</h1>
	<ProjectsSection />
	<h1 id="demos">Demos</h1>
	<DemosSection />
	<h1 id="shaders">Shaders</h1>
	<ShadersSection />
</div>

<style lang="postcss">
	h1 {
		@apply leading-tight text-muted-foreground rounded-xl p-4;
	}
</style>
