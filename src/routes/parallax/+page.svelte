<script lang="ts">
	import DemosDisplay from './DemosDisplay.svelte';
	import DemoContainer from './DemoContainer.svelte';

	import Parallax from './Parallax.svelte';
</script>

<div>
	<DemosDisplay>
		<DemoContainer title="Moving with the mouse and when you scroll">
			<Parallax />
		</DemoContainer>
		<DemoContainer title="I only react to the mouse ¯\_(ツ)_/¯">
			<Parallax moveWithScroll={false} />
		</DemoContainer>
		<DemoContainer title="Scrolling only 😈">
			<Parallax moveWithMouse={false} />
		</DemoContainer>
	</DemosDisplay>
	<section class="etc">
		<p>putting some ...</p>
		<p>more content ...</p>
		<p>here ...</p>
		<p>to add to scrolling...</p>
	</section>
</div>

<style>
	.etc {
		height: 100vh;
		margin: 5px;
	}
</style>
