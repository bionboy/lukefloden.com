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
		subtitle="Front-end dev with an eye for design and a passion for UX"
	>
		{#snippet topRightContent()}
			<ResumeDialog open={showResumeOnLoad} />
		{/snippet}
		<p>
			Full-stack Dev with a passion for intuitive/accessible UX. Specializing in UI/UX design, web
			standards, accessibility, etc. I strive to build products that feel seamless—a good tool
			should feel like an extension of its user.
		</p>
		<p>
			My startup experience has honed my ability to work within constraints, prioritize effectively,
			and make a meaningful impact on product design and development. I've worked in the healthcare,
			construction, and audiovisual recording industries.
		</p>

		<ul>
			<li>5+ years with startups in the healthcare and sustainability sectors</li>
			<li>3+ years building web applications with React/Laravel</li>
			<li>Project lead of distributed teams and mentoring junior developers</li>
			<li>Typescript, React, SvelteKit, Laravel</li>
			<li>Sentry, Fly.io, Vercel, AWS, GCP</li>
		</ul>
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
				<a href="/portfolio/shaders">Shaders</a>: GLSL,
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
			The app features real-time currency conversion, historical rate analysis, transaction
			tracking, and a custom WebGL shader background that creates dynamic color gradients. It's
			designed to help users make informed decisions about when to exchange currencies based on
			historical trends.
		</p>
		<p>
			This project gave me hands-on experience with several technologies and concepts I wanted to
			explore in a production environment:
		</p>
		<ul>
			<li>
				<strong>Next.js 15</strong> with React 19 and the new Turbopack dev server
			</li>
			<li>
				<strong>Authentication</strong>: NextAuth v5 with Google OAuth and Supabase adapter
			</li>
			<li>
				<strong>Database</strong>: Supabase with Row Level Security (RLS)
			</li>
			<li>
				<strong>Overcoming API data limitations</strong>: Automated exchange rate fetching with cron
				jobs and smart caching for historical data
			</li>
			<li>
				<strong>Data Visualization</strong>: Interactive historical exchange rate charts using
				<a href="https://recharts.org/">Recharts</a>
			</li>
			<li>
				<strong>WebGL Shaders</strong>: Custom fragment shader background with noise-based color
				palettes
			</li>
			<li>
				<strong>Modern UI</strong>: Shadcn/UI components with glassmorphism effects
			</li>
			<li>
				<strong>Type Safety</strong>: Full TypeScript implementation with Zod schema validation
			</li>
			<li>
				<strong>State Management</strong>: TanStack Query for server state with optimistic updates
			</li>
		</ul>
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
