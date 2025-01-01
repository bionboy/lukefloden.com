import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
	plugins: [
		sveltekit(),
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
