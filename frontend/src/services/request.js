import axios from 'axios';

import { ACCESS_TOKEN, apiUrl, REFRESH_TOKEN } from '@/constants';

const request = axios.create({
	baseURL: `${apiUrl}`,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	xsrfCookieName: 'csrftoken',
	xsrfHeaderName: 'X-CSRFToken',
});

// before send request
request.interceptors.request.use(
	config => {
		let token;
		try {
			token = localStorage.getItem(ACCESS_TOKEN)
				? localStorage.getItem(ACCESS_TOKEN)
				: sessionStorage.getItem(ACCESS_TOKEN);
		} catch (e) {
			return new Error('No local storage');
		}
		if (token !== null) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		Promise.reject(error);
	},
);

// after send request
request.interceptors.response.use(
	({ data = {}, status }) => ({ ...data, status }),
	async error => {
		const { response } = error;
		if (!response) return Promise.reject(error);

		const { status, data } = response;
		const { config } = error;
		const originalRequest = config;

		// TRY TO GET NEW TOKEN AND RECALL API
		if (status === 401) {
			originalRequest._retry = true;
			localStorage.removeItem(ACCESS_TOKEN);
			// FORCE LOGOUT
			if (['logout', 'refresh'].some(el => config.url?.includes(el))) {
				return Promise.reject();
			}
			try {
				const rs = await request.post(`${apiUrl}/auth/refresh`, {
					refreshToken: localStorage.getItem(REFRESH_TOKEN),
				});
				const { accessToken } = rs.data;
				localStorage.setItem(ACCESS_TOKEN, accessToken);
				return request(originalRequest);
			} catch (_error) {
				return Promise.reject(_error);
			}
		}

		// HANDLE ERROR
		let message = 'Something went wrong';
		switch (status) {
			case 400:
				message = 'Data is invalid';
				break;
			case 403:
				message = 'You do not have permission to access this page';
				break;
			case 404:
				message = 'Page not found';
				break;
			case 500:
				message = 'Internal Server Error';
				break;
			default:
				break;
		}

		// eslint-disable-next-line prefer-promise-reject-errors
		return Promise.reject({ ...response, message });
	},
);

export default request;
