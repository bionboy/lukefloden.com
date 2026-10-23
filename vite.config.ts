import vercelAdapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sentrySvelteKit } from '@sentry/sveltekit';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { enhancedImages } from '@sveltejs/enhanced-img';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: process.env.SENTRY_ORG,
				project: process.env.SENTRY_PROJECT,
				authToken: process.env.SENTRY_AUTH_TOKEN
			}
		}),

		sveltekit({
			// Consult https://svelte.dev/docs/kit/integrations
			// for more information about preprocessors
			preprocess: vitePreprocess(),

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: vercelAdapter(),

			// @migration-task `typescript.config` is deprecated; configure TypeScript in tsconfig.json directly
			// @migration-task `typescript.config` is deprecated; configure TypeScript in tsconfig.json directly
			// @migration-task `typescript.config` is deprecated; configure TypeScript in tsconfig.json directly
			typescript: {
				config: (tsconfig) => {
					tsconfig.exclude.push('../src/lib/resume-system/**');
				}
			}
		}),
		enhancedImages(),
		basicSsl({}),
		/** name of certification */ // name: 'test',
		/** custom trust domains */ // domains: ['*.custom.com'],
		/** custom certification directory */ // certDir: '/Users/.../.devServer/cert'
		devtoolsJson()
	]
});
