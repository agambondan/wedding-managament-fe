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

// Load environment variables early
require('dotenv').config();
require('dotenv').config({
	path: `.env.${process.env.NEXT_PUBLIC_ENV}`,
});

// Define Next.js configuration with conditional PWA
const isDev = process.env.NODE_ENV === 'development'; // Check for development mode

const nextConfig = withPWA({
	// Redirect configuration
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
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'berita.99.co',
				port: '',
				pathname: '/wp-content/uploads/**',
			},
		],
		domains: ['berita.99.co'],
	},
	// Disable PWA in development mode
	pwa: {
		disable: isDev, // Set disable based on development environment
	},
});

module.exports = nextConfig;
