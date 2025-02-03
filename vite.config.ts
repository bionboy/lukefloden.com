import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [
		sveltekit(),
		enhancedImages(),
		basicSsl({
			/** name of certification */
			// name: 'test',
			/** custom trust domains */
			// domains: ['*.custom.com'],
			/** custom certification directory */
			// certDir: '/Users/.../.devServer/cert'
		})
	]
});
