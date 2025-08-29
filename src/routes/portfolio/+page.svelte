<script lang="ts">
	import ProjectsSection from './projects/ProjectsSection.svelte';
	import ShadersSection from './shaders/ShadersSection.svelte';
	import DemosSection from './demos/DemosSection.svelte';
</script>

<div class="about max-w-7xl mx-auto my-4 p-4 flex flex-col gap-8 font-jersey15NOT">
	<h1 class="gradient-text" id="projects">Projects</h1>
	<ProjectsSection />
	<h1 class="gradient-text" id="demos">Demos</h1>
	<DemosSection />
	<h1 class="gradient-text" id="shaders">Shaders</h1>
	<ShadersSection />
</div>

<style lang="postcss">
	h1 {
		@apply leading-tight;
	}
</style>
