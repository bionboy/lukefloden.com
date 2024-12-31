import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { dev } from '$app/environment';

export const load: LayoutServerLoad = async ({ url }) => {
	middlewareUnderConstruction(url);
};
// }) satisfies LayoutServerLoad;

function middlewareUnderConstruction(url: URL) {
	// const isUnderConstruction = !dev;
	const isUnderConstruction = false;
	if (isUnderConstruction && url.pathname !== '/under-construction') {
		throw redirect(307, '/under-construction');
	}
}
