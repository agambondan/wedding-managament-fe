import fetch from 'node-fetch';

export default async function handler(req, res) {
	const { shortLink } = req.query;

	if (!shortLink) {
		return res.status(400).json({ error: 'Short link is required' });
	}

	try {
		// Follow the redirect to get the full URL
		const response = await fetch(shortLink, { redirect: 'follow' });
		const fullUrl = response.url;
		// Extracting coordinates from the path
		const match = fullUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
		let lat, lng;

		if (match) {
			lat = match[1];
			lng = match[2];
		} else {
			return res.status(400).json({ error: 'Coordinates not found in the URL' });
		}

		res.status(200).json({ fullUrl, lat, lng });
	} catch (error) {
		console.error('Error resolving short link:', error);
		res.status(500).json({ error: 'Failed to resolve the short link' });
	}
}
