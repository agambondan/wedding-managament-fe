import axios from 'axios';

export const AxiosInstance = axios.create({
	withCredentials: true,
	headers: {
		Accept: 'application/json, text/plain, */*',
		'Content-Type': 'application/json',
		'Accept-Language': 'en-US,en',
	},
});

export const HttpRequest = (request) => {
	const defaultHeaders = {
		Accept: 'application/json, text/plain, */*',
		'Content-Type': 'application/json',
		'Accept-Language': 'en-US,en',
	};
	if (request.headers === undefined) {
		request.headers = defaultHeaders;
	} else {
		Object.keys(defaultHeaders).map((key) => {
			request.headers[key] = defaultHeaders[key];
		});
	}
	if (request.method === undefined) {
		request.method = 'GET';
	}
	return axios({
		method: request.method,
		url: request.url,
		data: request.data,
		headers: request.headers,
		withCredentials: true,
	});
};

export const AuthService = (request) => {
	request.url = `${process.env.NEXT_PUBLIC_ENDPOINT_AUTH}/` + request.url;
	return HttpRequest(request);
};

export const MasterService = (request) => {
	request.url = `${process.env.NEXT_PUBLIC_ENDPOINT_MASTER}/` + request.url;
	return HttpRequest(request);
};

export const UserService = (request) => {
	request.url = `${process.env.NEXT_PUBLIC_ENDPOINT_USERS}/` + request.url;
	return HttpRequest(request);
};
