import { axiosClient, setAxiosAccessToken } from '../../../api/axiosClient.js';

function unwrap(response) {
  return response.data;
}

export function normalizeApiError(error) {
  const statusCode = error?.response?.status;
  const payload = error?.response?.data;

  return {
    statusCode,
    message: payload?.message || error?.message || 'Something went wrong',
    errors: payload?.errors || [],
  };
}

export async function login(payload) {
  return unwrap(await axiosClient.post('/auth/login', payload));
}

export async function register(payload) {
  return unwrap(await axiosClient.post('/auth/register', payload));
}

export async function logout() {
  return unwrap(await axiosClient.post('/auth/logout'));
}

export async function refreshAccessToken() {
  const response = unwrap(await axiosClient.post('/auth/refresh-token'));
  const token = response?.data?.accessToken || null;
  setAxiosAccessToken(token);
  return response;
}

export async function getCurrentUser() {
  return unwrap(await axiosClient.get('/auth/me'));
}
