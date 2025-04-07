import { redirect, type Handle } from '@sveltejs/kit';
// import { dev } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
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
