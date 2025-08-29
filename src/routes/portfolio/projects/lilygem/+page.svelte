<script lang="ts">
	import DemoCard from '$lib/components/DemoCard.svelte';
	import lilygemImg from '$lib/assets/images/LilyGem-dashboard.png?enhanced';
	import AboutCard from '$lib/components/AboutCard.svelte';
</script>

<div class="about max-w-3xl mx-auto my-4 p-4 flex flex-col gap-8 font-jersey15NOT">
	<h1 class="mx-auto gradient-text" style="font-family: 'shhh';">About: this, that, etc...</h1>
	<AboutCard id="lilygem" title="LilyGem">
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
	</AboutCard>
</div>
