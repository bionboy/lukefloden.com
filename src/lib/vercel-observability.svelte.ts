import { inject, pageview } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { page } from '$app/state';
import { dev } from '$app/env';

export function trackVercelObservability() {
	const basePath = import.meta.env.VITE_VERCEL_OBSERVABILITY_BASEPATH;
	const configString = import.meta.env.VITE_VERCEL_OBSERVABILITY_CLIENT_CONFIG;

	const speedInsights = injectSpeedInsights(
		{ route: page.route.id, framework: 'sveltekit', basePath },
		configString
	);
	inject(
		{
			mode: dev ? 'development' : 'production',
			disableAutoTrack: true,
			framework: 'sveltekit',
			basePath
		},
		configString
	);

	$effect(() => {
		const route = page.route.id;
		if (!route) return;
		speedInsights?.setRoute(route);
		pageview({ route, path: page.url.pathname });
	});
}
