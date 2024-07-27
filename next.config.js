// Import required modules
const path = require('path');
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	runtimeCaching,
	buildExcludes: [/middleware-manifest.json$/],
});

// Define Next.js configuration with conditional PWA
const isDev = process.env.NEXT_PUBLIC_NODE_ENV === 'development'; // Check for development mode

const nextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/client/login',
				permanent: true,
			},
		];
	},
	reactStrictMode: false, // Set to false to avoid rendering twice in dev mode
	swcMinify: true,
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback = {
				fs: false,
				path: false,
				os: false,
			};
		}
		return config;
	},
};

module.exports = isDev ? nextConfig : withPWA(nextConfig);
