import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }) => {
	middlewareUnderConstruction(url);
};
// }) satisfies LayoutServerLoad;

function middlewareUnderConstruction(url: URL) {
	const isUnderConstruction = true;
	if (isUnderConstruction && url.pathname !== '/under-construction') {
		throw redirect(307, '/under-construction');
	}
}
