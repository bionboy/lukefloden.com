<script lang="ts">
	import DemosDisplay from './DemosDisplay.svelte';
	import DemoContainer from './DemoContainer.svelte';
	import Parallax from './Parallax.svelte';
</script>

<div>
	<DemosDisplay>
		<DemoContainer title="Moving with the mouse and when you scroll">
			<Parallax title="scroll or mouse me" />
		</DemoContainer>
		<DemoContainer title="Scrolling only 😈">
			<Parallax moveWithMouse={false} title="scroll me" />
		</DemoContainer>
		<DemoContainer title="I only react to the mouse ¯\_(ツ)_/¯">
			<Parallax moveWithScroll={false} title="mouse me" />
		</DemoContainer>
	</DemosDisplay>
</div>

<style>
</style>
