import { LOGIN_USER_URL, LOGOUT_USER_URL } from 'constant/endpoints';
import { postRequest } from './HttpRequests';

/**
 * The logInUser function logs in a user by sending a POST request with the username and encrypted password, and stores
 * the user data in the local storage.
 * @param username - The username parameter is the username entered by the user for logging in.
 * @param password - The password parameter is the user's password that they entered during the login process.
 * @returns the status code of the response if the login is successful, or the status code of the error request if there
 * is an error.
 */
export async function logInUser(username, password) {
  try {
    const response = await postRequest(LOGIN_USER_URL, {
      name: username,
      password: encryptPassword(password)
    });

    localStorage.setItem('user', JSON.stringify(response.data));
    return response;
  } catch (error) {
    return error.request;
  }
}

function encryptPassword(password) {
  // TODO: Get public key from server

  // TODO: Encrypt password with public key using RSA

  // TODO: Return encrypted password
  return password;
}

export async function getCurrentUser() {
  return new Promise((resolve, _) =>
    setTimeout(() => resolve(JSON.parse(localStorage.getItem('user'))), 300)
  );
}

export async function logOutUser() {
  const response = await postRequest(LOGOUT_USER_URL, {});
  localStorage.removeItem('user');
  return response.status;
}
