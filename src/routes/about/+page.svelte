<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>About Me</title>
</svelte:head>

<div class="about bg-secondary m-8 p-4 font-jersey15">
	<h1>About: this, that, etc...</h1>
	<h2>Me</h2>
	<div>
		<p>Frontend Software Engineer, pursuing more impact on UX design</p>
		<p>
			Accomplished Full-Stack Software Engineer with a passion for enhancing user experiences and
			ambition to have greater UX/UI design impact. Blending technical solutions with design
			sensibility to create intuitive UI. Eager to leverage my Full-Stack experience to drive
			user-centric design solutions.
		</p>
		<p>TW I want the internet to feel like it did 10 years ago</p>
	</div>
	<h2>This Site</h2>
</div>

<style lang="postcss">
	p {
		/* font-size: large; */
		/* font-size: xx-large; */
		@apply font-thin text-xl;
	}
</style>
