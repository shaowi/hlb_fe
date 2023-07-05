import axios from 'axios';

const currentUser = localStorage.getItem('user');
const token = JSON.parse(currentUser)?.token;

export function getRequest(url) {
  return axios.get(url, {
    headers: {
      Authorization: token
    }
  });
}

export function postRequest(url, body) {
  return axios.post(url, body, {
    headers: {
      Authorization: token
    }
  });
}
