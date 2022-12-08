export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5000/api/v1'
		: 'http://localhost:5000/api/v1';
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
