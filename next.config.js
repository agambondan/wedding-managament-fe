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
	require: 'tinymce/tinymce',
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

// const withPWA = require("next-pwa");

// module.exports = withPWA({
//     pwa: {
//         dest: "public",
//         register: true,
//         skipWaiting: true,
//         disable: process.env.NODE_ENV === "development",
//     },
//     async redirects() {
//         return [
//             {
//                 source: '/',
//                 destination: '/client/login',
//                 permanent: true,
//             },
//         ]
//     },
//     require: ("tinymce/tinymce"),
//     reactStrictMode: false, // false for not render twice
//     swcMinify: false,
//     // env: {
//     //     IP: process.env.NEXT_PUBLIC_IP,
//     //     NEXT_PUBLIC_ENDPOINT_MASTER: `${process.env.NEXT_PUBLIC_IP}/master`,
//     //     ENDPOINT_USERS: `${process.env.NEXT_PUBLIC_IP}/users`,
//     //     ENDPOINT_AUTH: `${process.env.NEXT_PUBLIC_IP}/auth`,
//     // },
// })
