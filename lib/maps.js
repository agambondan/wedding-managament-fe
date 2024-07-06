// import { useMemo } from 'react';

// export const MapIframe = ({ src }) => {
// 	return (
// 		<iframe
// 			src={src}
// 			width='600'
// 			height='400'
// 			frameBorder='0'
// 			style={{ border: 0 }}
// 			allowFullScreen
// 			aria-hidden='false'
// 			tabIndex='0'
// 		/>
// 	);
// };

// export const EmbededMap = ({ link }) => {
// 	const src = useMemo(() => link, [link]);

// 	return <MapIframe src={src} />;
// };

// export async function FindExpandedURL({ url }) {
// 	console.log(url);
// 	const response = await fetch(url, {
// 		method: 'GET',
// 		mode: 'cors',
// 		cache: 'no-cache',
// 		redirect: 'follow',
// 		referrerPolicy: 'no-referrer',
// 	}).catch((err) => {
// 		console.log(err.message);
// 	});
// 	console.log(response);
// 	return {
// 		url:
// 			response.headers.get('location') === null
// 				? response.url
// 				: response.headers.get('location'),
// 		server: response.headers.get('server'),
// 	};
// }

// export async function FindExpandedURL1({ url }) {
// 	axios.get(url).then((response) => {
// 		console.log(response);
// 	});
// }

export const GoogleMapEmbed = ({ lat, long }) => {
	const src = `https://maps.google.com/maps?q=${lat},${long}&hl=en&z=16&output=embed`;
	console.log(src);

	return (
		<div style={{ width: '100%', height: '500px' }}>
			<iframe
				frameBorder='0'
				scrolling='no'
				marginHeight='0'
				marginWidth='0'
				width='100%'
				height='100%'
				style={{ border: 0 }}
				allowFullScreen=''
				loading='lazy'
				src={src}
			></iframe>
		</div>
	);
};

export const GoogleMapEmbed1 = ({ lat, long }) => {
	let src = `https://maps.google.com/maps?q=${lat},${long}&hl=en&z=14&amp;output=embed`;
	console.log(src);
	return (
		<div style={{ width: '100%', height: '500px' }}>
			<iframe
				frameBorder='0'
				scrolling='no'
				marginHeight='0'
				marginWidth='0'
				width='100%'
				height='100%'
				style={{ border: 0 }}
				allowFullScreen=''
				loading='lazy'
				// src='https://maps.google.com/maps?q=-6.1826307,106.9476664&hl=en&z=14&amp;output=embed'
				src={src}
			></iframe>
		</div>
		// <iframe
		// 	width='300'
		// 	height='170'
		// 	frameBorder='0'
		// 	scrolling='no'
		// 	marginHeight='0'
		// 	marginWidth='0'
		// 	src={`https://maps.google.com/maps?q=${lat},${long}&hl=en&z=14&amp;output=embed`}
		// ></iframe>
		// <div style={{ width: '100%', height: '500px' }}>
		// 	<iframe
		// 		src={`https://maps.google.com/maps?q=${lat},${long}&hl=en&z=14&amp;output=embed`}
		// 		width='100%'
		// 		height='100%'
		// 		style={{ border: 0 }}
		// 		// allowFullScreen=''
		// 		loading='lazy'
		// 	></iframe>
		// </div>
	);
};
