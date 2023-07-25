const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const LOGIN_USER_URL = `${BASE_URL}/user/login`;
export const LOGOUT_USER_URL = `${BASE_URL}/user/logout`;
export const GET_USER_URL = `${BASE_URL}/user/current`;
export const ONLINE_CBFT_URL = `${BASE_URL}/online/cbft`;
export const CREATE_ONLINE_CBFT_URL = `${ONLINE_CBFT_URL}/create`;
export const UPDATE_ONLINE_CBFT_URL = `${ONLINE_CBFT_URL}/update`;
export const GET_ALL_ONLINE_CBFT_URL = `${ONLINE_CBFT_URL}/all`;
