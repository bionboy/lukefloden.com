import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

Sentry.init({
	dsn: 'https://ead58b658c75eea8948071d7e491ec9c@o4509607124205568.ingest.us.sentry.io/4509607127744512',
	environment: dev ? 'development' : env.VERCEL_ENV || 'production',
	tracesSampleRate: 1
});

const siteHandle: Handle = async ({ event, resolve }) => {
	const url: URL = event.url;

	middlewareUnderConstruction(url);

	return resolve(event);
};

function middlewareUnderConstruction(url: URL) {
	// const isUnderConstruction = !dev;
	const isUnderConstruction = false;
	if (isUnderConstruction && url.pathname !== '/under-construction') {
		throw redirect(307, '/under-construction');
	}
}

export const handle: Handle = sequence(Sentry.sentryHandle(), siteHandle);
export const handleError = Sentry.handleErrorWithSentry();
