<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils.js';

	export type NavLocations = { route: string; name: string }[];

	const defaultLocations = [
		{ route: '/home', name: 'Home' },
		{ route: '/about', name: 'About' },
		{ route: '/demos', name: 'Demos' },
		{ route: '/demos/shaders', name: 'Shaders' }
	];

	let { locations = defaultLocations }: { locations?: NavLocations } = $props();
</script>

<nav class={cn('flex justify-center items-center gap-2 sm:gap-4 lg:gap-6')}>
	{#each locations as { name, route } (route)}
		{@const active = $page.route.id === route}
		<div class="nav-item" class:active>
			<a href={route} class="no-underline">
				<!-- ? IDK why i need this 'link-content' div, i couldn't get animations working on the a element again ¯\_(ツ)_/¯  -->
				<div class="link-content">{name}</div>
			</a>
		</div>
	{/each}
</nav>

<style lang="postcss">
	.nav-item {
		@apply transition-transform duration-150 ease-in;

		a {
			@apply text-sm font-medium 
			text-muted-foreground;
		}

		&.active {
			@apply scale-125;
			a {
				@apply text-primary;
				.link-content {
					animation: floating 3s infinite ease-in-out;
				}
			}
		}

		&:hover,
		&:focus-within {
			@apply scale-125;

			a {
				@apply text-primary;
				.link-content {
					animation-name: wiggle;
					animation-fill-mode: forwards;
					animation-duration: 0.5s;
					animation-iteration-count: 1;
					animation-timing-function: linear(
						0,
						0.739 6.1%,
						0.912 8.8%,
						0.954 10.1%,
						0.967 11.4%,
						0.954 12.7%,
						0.916 14%,
						0.751 16.9%,
						-0.304 29%,
						-0.446 31.8%,
						-0.511 34.5%,
						-0.517 35.7%,
						-0.509 37%,
						-0.455 39.6%,
						0.035 51.2%,
						0.126 54.4%,
						0.171 57.5%,
						0.178 59.9%,
						0.164 62.5%,
						0.025 72.8%,
						-0.017 78.2%,
						-0.023 82.8%,
						-0.004 93%,
						0
					);
				}
			}
		}
	}

	@keyframes floating {
		0% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-3px);
		}
	}

	@keyframes wiggle {
		from {
			transform: translateY(0px);
		}
		to {
			transform: translateY(3px);
		}
	}
</style>
