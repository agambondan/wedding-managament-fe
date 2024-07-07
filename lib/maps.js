export const GoogleMapEmbed = ({ lat, long }) => {
	const src = `https://maps.google.com/maps?q=${lat},${long}&hl=en&z=16&output=embed`;
	return (
		<div className='' style={{ width: '100%', height: '500px' }}>
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
