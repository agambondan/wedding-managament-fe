export default function handler(req, res) {
	const { mapUrl } = req.query;

	if (!mapUrl) {
		return res.status(400).json({ error: 'Map URL is required' });
	}

	try {
		const url = new URL(mapUrl);
		const pathnameParts = url.pathname.split('/');
		const placeId = pathnameParts[pathnameParts.length - 1];
		const queryParams = url.searchParams;

		const lat = queryParams.get('3d');
		const lng = queryParams.get('4d');

		const embedUrl = `https://www.google.com/maps/embed?pb=${encodeURIComponent(
			`!1m14!1m8!1m3!1d15866.4486971425!2d${lng}!3d${lat}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${placeId}!5e0!3m2!1sid!2sid!4v1720282817941!5m2!1sid!2sid`
		)}`;

		res.status(200).json({ embedUrl });
	} catch (error) {
		console.error('Error parsing map URL:', error);
		res.status(500).json({ error: 'Failed to parse the map URL' });
	}
}
