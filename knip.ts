import type { KnipConfig } from 'knip';
import { svelte2tsx } from 'svelte2tsx';

export default {
	entry: ['src/lib/components/ui/**/index.ts'],
	ignore: ['src/lib/resume-system/**'],
	ignoreIssues: {
		'src/routes/portfolio/demos/always-level/cube.svelte': ['files'],
		'src/routes/portfolio/demos/parallax/islandPositions.svelte.ts': ['exports']
	},
	compilers: {
		svelte: (source, filename) => svelte2tsx(source, { filename, isTsFile: true }).code
	}
} satisfies KnipConfig;
