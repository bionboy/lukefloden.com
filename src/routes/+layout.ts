import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
// import type { LayoutLoad } from './$types';

injectSpeedInsights();
injectAnalytics({ mode: dev ? 'development' : 'production' });

// export const load = (async () => {
// 	return {};
// }) satisfies LayoutLoad;
