<script lang="ts">
	import ResumeDialog from './ResumeDialog.svelte';
	import { SocialLinks } from '$lib/components/SocialLinks';
	import AboutCard from '$lib/components/AboutCard.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import TorcLogo from '$lib/components/SocialLinks/torc-logo.svelte';
	import CalendlyPopup from '$lib/components/CalendlyPopup.svelte';

	let showResumeOnLoad = $state(false);

	// This will run only on client-side after hydration
	// $effect is not needed because we only care about the initial load
	if (browser) {
		showResumeOnLoad = $page.url.searchParams.has('resume');
	}
</script>

<svelte:head>
	<title>About Me</title>
</svelte:head>

<div class="about max-w-3xl mx-auto my-4 p-4 flex flex-col gap-8 font-jersey15NOT">
	<h1 class="mx-auto gradient-text" style="font-family: 'shhh';">About: this, that, etc...</h1>
	<AboutCard id="me" title="Me">
		{#snippet topRightContent()}
			<CalendlyPopup url="https://calendly.com/luke-floden/30min" text="Let's Chat!" />
		{/snippet}
		<p id="nostalgia">
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
	<AboutCard
		id="career"
		title="Career"
		subtitle="Product/Full-Stack Engineer with 5 YOE leading teams in healthcare/climate-tech startups"
	>
		{#snippet topRightContent()}
			<ResumeDialog open={showResumeOnLoad} />
		{/snippet}

		<p>
			My real passion is in honing a consistent and thoughtful user experience. From the design,
			implementation, performance aspects; whatever it takes to make the experience feel
			frictionless.
		</p>

		<p>
			I work well with tradeoffs, and I am not afraid to make tough decisions. I've worked with
			startups for most of my career, acting not only as a developer, but taking on product
			ownership and project management responsibilities.
		</p>

		<p>
			I've worked on delivering all aspects of a product. From balancing design and feasibility, to
			architecting new features, and managing team resources.
		</p>
	</AboutCard>
	<!-- <AboutCard title="this site"></AboutCard> -->
	<AboutCard id="working-on" title="What I'm working on">
		<h3>This Site</h3>
		<!-- TODO: add a popup that shows an image of my old site on hover or click of "last iteration" -->
		<p>
			I started working on this site because my <strong>last iteration</strong> was years ago and
			nothing really more than a "linktree" or virtual business card. Not really something that
			reflects my sentiments <a href="#nostalgia">above</a>.
		</p>
		<p>
			I've used this as an opportunity to finally dive into new tools, frameworks, utilities, and
			concepts that I previously was not able to (<em>ie. in a commercial environment</em>). Some of
			those being (but not exhaustive):
		</p>
		<ul>
			<li>
				<a href="/portfolio#shaders">Shaders</a>: GLSL,
				<a href="https://thebookofshaders.com/">the book of shaders</a>, Svader
			</li>
			<li>Svelte 5, SvelteKit</li>
			<li>OKLCH color space</li>
			<li>Shadcn UI (<em>Svelte specific version</em>)</li>
			<li>...</li>
		</ul>
		<h3>LilyGem</h3>
		<p>
			<a href="https://lilygem.vercel.app/">
				<strong>LilyGem</strong>
			</a>
			is a personal finance companion that goes beyond simple currency conversion. I built this as a
			real-world application to solve the problem of tracking international transfers and understanding
			exchange rate patterns over time.
		</p>
		<p>
			Check out the <a href="/portfolio/projects/lilygem">project page</a> for more details.
		</p>
		<!-- TODO -->
		<!-- <h3>Shaders</h3> -->
	</AboutCard>
	<AboutCard id="torc">
		{#snippet titleContent()}
			Looking for work? Community?
			<br />
			Are you in "tech"?
		{/snippet}
		{#snippet topRightContent()}
			<div class="my-2">
				<TorcLogo />
			</div>
		{/snippet}
		<p>
			Torc has been a great community and resource for my career. I've met some great people there,
			<a href="https://platform.torc.dev/#/r/SZ3zpvZ8/cp">Check it out!</a>
		</p>
	</AboutCard>
</div>

<style lang="postcss">
</style>
