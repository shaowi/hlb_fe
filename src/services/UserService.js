import { LOGIN_USER_URL } from 'endpoints';
import { postRequest } from './HttpRequests';

export async function logInUser(username, password) {
  try {
    const response = await postRequest(LOGIN_USER_URL, {
      name: username,
      password: encryptPassword(password)
    });

    localStorage.setItem('user', JSON.stringify(response.data));
    return response.status;
  } catch (error) {
    return error.request.status;
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
    setTimeout(() => resolve(JSON.parse(localStorage.getItem('user'))), 1000)
  );
}
