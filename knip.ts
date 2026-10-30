import type { KnipConfig } from 'knip';
import { svelte2tsx } from 'svelte2tsx';

export default {
	ignore: ['src/lib/resume-system/**'],
	compilers: {
		svelte: (source, filename) => svelte2tsx(source, { filename, isTsFile: true }).code
	}
} satisfies KnipConfig;
