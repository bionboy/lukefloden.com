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
				org: 'luke-floden',
				project: 'javascript-sveltekit',
				authToken: process.env.SENTRY_AUTH_TOKEN
			}
		}),
		sveltekit(),
		enhancedImages(),
		basicSsl({
			/** name of certification */
			// name: 'test',
			/** custom trust domains */
			// domains: ['*.custom.com'],
			/** custom certification directory */
			// certDir: '/Users/.../.devServer/cert'
		}),
		devtoolsJson()
	]
});
