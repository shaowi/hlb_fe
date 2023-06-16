export default function logInUser(username, password) {
  const encryptedPassword = encryptPassword(password);

  // TODO: Make a POST request with username and encrypted password to server

  // TODO: If response is successful, return true else return false
}

function encryptPassword(password) {
  // TODO: Get public key from server

  // TODO: Encrypt password with public key using RSA

  // TODO: Return encrypted password
  return password;
}
