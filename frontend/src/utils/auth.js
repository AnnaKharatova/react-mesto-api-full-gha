//export const BASE_URL = 'https://api.mesto.express.nomoredomains.monster';
export const BASE_URL = 'http://localhost:3000';

const checkResponse = (res) => {
  if (res.ok) {return res.json()}
    return Promise.reject(res.status);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  }).then(checkResponse)
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  }).then(checkResponse)
    .then((data) => {
    localStorage.getItem('jwt', data.token)
    return data;
  })
};

export const checkToken = () => {
  const token = localStorage.getItem('jwt')
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then(checkResponse)
};
  