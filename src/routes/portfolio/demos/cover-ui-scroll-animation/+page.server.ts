import type { PageServerLoad } from './$types';
import { shuffleAlbums } from './Album';

export const load: PageServerLoad = () => {
	return {
		albums: shuffleAlbums()
	};
};
