require('dotenv').config({
	path: `.env.${process.env.NEXT_PUBLIC_ENV}`,
});

const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	runtimeCaching,
	buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = withPWA({
	// next config
	async redirects() {
		return [
			{
				source: '/',
				destination: '/client/login',
				permanent: true,
			},
		];
	},
	reactStrictMode: false, // false for not render twice
	swcMinify: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'berita.99.co',
				port: '',
				pathname: '/wp-content/uploads/**',
			},
		],
	},
	domains: ['berita.99.co'],
});

module.exports = nextConfig;
