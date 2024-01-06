import { BASE_URL } from '../utils/constants';

export const checkResponse = async (res) => {
  if (res.ok) {
    return res.json();
  } else {
    const error = await res.text();
    return Promise.reject(error);
  }
};

export const API = (url) => {
  return fetch(url)
    .then(res => checkResponse(res))
}

export const apiOrder = (burger) => {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: burger
    })
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    }
    return ('error' in res)
  })
};