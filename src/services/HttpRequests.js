import axios from 'axios';

const currentUser = localStorage.getItem('user');
const token = JSON.parse(currentUser)?.token;

/**
 * The function `getRequest` sends a GET request to a specified URL with optional parameters and an authorization token.
 * @param url - The `url` parameter is the endpoint URL where the GET request will be sent to. It should be a string
 * representing the URL of the API endpoint.
 * @param [params] - The `params` parameter is an object that contains query parameters to be appended to the URL. These
 * parameters are used to filter or sort the data being requested from the server.
 * @returns a promise that resolves to the result of the axios GET request.
 */
export function getRequest(url, params = {}) {
  return axios.get(url, {
    headers: {
      Authorization: token
    },
    params
  });
}

/**
 * The function `postRequest` sends a POST request to a specified URL with a given body and includes an authorization token
 * in the request headers.
 * @param url - The `url` parameter is the endpoint URL where the POST request will be sent to. It should be a string
 * representing the URL of the server or API endpoint.
 * @param body - The `body` parameter is the data that you want to send in the request body. It can be an object, array, or
 * any other valid JSON data. This data will be sent to the server as the payload of the POST request.
 * @returns a promise that will make a POST request to the specified URL with the provided body and headers.
 */
export function postRequest(url, body) {
  return axios.post(url, body, {
    headers: {
      Authorization: token
    }
  });
}
