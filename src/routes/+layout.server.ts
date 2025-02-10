import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
// import { dev } from '$app/environment';

export const load: LayoutServerLoad = async ({ url }) => {
	middlewareRedirctFromBaseURL(url);
	middlewareUnderConstruction(url);
};

function middlewareUnderConstruction(url: URL) {
	// const isUnderConstruction = !dev;
	const isUnderConstruction = false;
	if (isUnderConstruction && url.pathname !== '/under-construction') {
		throw redirect(307, '/under-construction');
	}
}

function middlewareRedirctFromBaseURL(url: URL) {
	if (url.pathname === '/') {
		throw redirect(302, '/home');
	}
}
