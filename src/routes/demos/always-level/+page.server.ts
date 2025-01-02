import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	const userAgent = request.headers.get('user-agent') || '';
	const isIosSafari =
		/iPhone|iPad|iPod/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
	console.table({
		userAgent,
		isIosSafari
	});

	return {
		isIosSafari
	};
};
