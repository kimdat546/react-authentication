import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ability from '../ability';

import { ACCESS_TOKEN, apiUrl, REFRESH_TOKEN } from '@/constants';
import api from '@/services/request';

const removeToken = () => {
	localStorage.removeItem(ACCESS_TOKEN);
	localStorage.removeItem(REFRESH_TOKEN);
};

export const fetchUserData = createAsyncThunk(
	'auth/fetchUserData',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const response = await api.get(`${apiUrl}/auth`);
			console.log(response, 'response');
			dispatch(pushUserData(response.user));
			return response;
		} catch (e) {
			localStorage.removeItem(ACCESS_TOKEN);
			return rejectWithValue('');
		}
	},
);

export const register = createAsyncThunk(
	'auth/register',
	async (payload, { dispatch, rejectWithValue }) => {
		try {
			const response = await api.post(`${apiUrl}/auth/register`, payload);
			localStorage.setItem(ACCESS_TOKEN, response.accessToken);
			// localStorage.setItem(REFRESH_TOKEN, data.refresh_token);
			dispatch(isAuthenticated(response.accessToken));
			return response;
		} catch (errors) {
			removeToken();
			return rejectWithValue(errors?.response?.data);
		}
	},
);

export const login = createAsyncThunk(
	'auth/login',
	async (payload, { dispatch, rejectWithValue }) => {
		try {
			const response = await api.post(`${apiUrl}/auth/login`, payload);
			localStorage.setItem(ACCESS_TOKEN, response.accessToken);
			// localStorage.setItem(REFRESH_TOKEN, data.refresh_token);
			dispatch(isAuthenticated(response.accessToken));
			return response;
		} catch (errors) {
			removeToken();
			return rejectWithValue(errors?.response?.data);
		}
	},
);

export const logout = createAsyncThunk('auth/logout', (_, { dispatch }) => {
	console.log("logout");
	dispatch(resetValues());
	localStorage.removeItem(ACCESS_TOKEN);

});

export const refreshToken = createAsyncThunk(
	'auth/refreshToken',
	async payload => {
		const { accessToken } = payload;
		localStorage.setItem(ACCESS_TOKEN, accessToken);
		return { accessToken };
	},
);

// Set ability for view page function
const setAbility = modules => {
	ability.update(
		modules.reduce(
			(result, { module, permission_type: permissions }) => [
				...result,
				...permissions.map(action => ({
					subject: module,
					action,
				})),
			],
			[],
		),
	);
};

const setLoading = loading => state => {
	state.loading = {
		...state.loading,
		...loading,
	};
};

const initialState = {
	isAuthenticated: localStorage.getItem(ACCESS_TOKEN) || null,
	loading: {},
	userData: {},
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		pushUserData: (state, action) => {
			console.log(action.payload, 'action.payload');
			state.userData = action.payload;
		},
		isAuthenticated: (state, action) => {
			state.isAuthenticated = action.payload;
		},
		resetValues: state => {
			state.userData = {};
			state.isAuthenticated = null;
		}
	},
	extraReducers: {
		[fetchUserData.pending]: state => setLoading({ user: true })(state),
		[fetchUserData.rejected]: state => setLoading({ user: false })(state),
		[fetchUserData.fulfilled]: state => setLoading({ user: false })(state),
		[login.pending]: state => setLoading({ auth: true })(state),
		[login.rejected]: state => setLoading({ auth: false })(state),
		[login.fulfilled]: state => setLoading({ auth: false })(state),
	}
});

export const { pushUserData, isAuthenticated, resetValues } = authSlice.actions;

export default authSlice.reducer;
