import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from "vite-plugin-pwa";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	},
	plugins: [
		VitePWA({
			registerType: 'autoUpdate',
			manifest:{
				name: 'Parth Projects',
				short_name: 'ParthApp',
				theme_color: '#ffffff',
				icons: [{src: '/icon.png', sizes: '192x192', type: 'image/png'}]
			},
			strategies: 'generateSW',
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
				runtimeCaching: [
					{
						urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'assets-cache',
							expiration: { maxAgeSeconds: 60 * 60 * 24 * 7 }
						}
					},
					{
						urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
						handler: 'NetworkFirst',
						options: {
							cacheName: 'supabase-cache',
							expiration: { maxAgeSeconds: 60 * 60 }
						}
					}
				]
			}
		})
	]
};

export default config;