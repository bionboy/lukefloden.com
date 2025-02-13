<script lang="ts">
	import { SocialLinks } from '$lib/components/SocialLinks';
	import type { PageData } from './$types';
	import AboutCard from './AboutCard.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>About Me</title>
</svelte:head>

<div class="about max-w-3xl mx-auto my-4 p-4 flex flex-col gap-8 font-jersey15NOT">
	<h1 class="mx-auto">About: this, that, etc...</h1>
	<AboutCard title="Me">
		<p>
			<strong>I want the internet to feel like it did 10 years ago.</strong>
			I am nostalgic for an era of the internet that I was too young to be apart of. Focused on actually
			connecting and sharing with each other. Fostering relationships and providing access to the tools
			and knowledge to grow. I want the internet to make our lives better; not to treat our attention
			as a resource.
		</p>
		<p>That being said.... here are my socials!</p>
		<div class="mt-8">
			<SocialLinks></SocialLinks>
		</div>
	</AboutCard>
	<AboutCard title="Career" subtitle="Front-end dev with an eye for design and a passion for UX">
		<p>
			I am a Front-end Developer with a passion for crafting intuitive and accessible user
			experiences. While my career has provided extensive full-stack experience, my passion lies in
			frontend development, specializing in UI/UX design, web standards, accessibility, and
			thoughtful architectural choices. I strive to build products that feel seamless—a good tool
			should feel like an extension of its user.
		</p>
		<p>
			My startup experience has honed my ability to work within constraints, prioritize effectively,
			and make a meaningful impact on product design and development. Having contributed to the
			healthcare, construction, and audiovisual recording industries, I bring versatile technical
			expertise and problem-solving skills.
		</p>
		<p>
			With a Master’s in Computer Engineering, I support product decisions with a deep technical
			knowledge, offering valuable insights into constraints, trade-offs, and possibilities.
		</p>
	</AboutCard>
	<!-- <AboutCard title="this site"></AboutCard> -->
</div>

<style lang="postcss">
</style>
