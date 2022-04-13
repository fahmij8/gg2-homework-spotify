import {API_URL} from './globalVariable';
import store from 'store';

export const fetchAPI = (uri, body, method) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const accessToken = store.getState().account.accessToken;
    const tokenType = store.getState().account.tokenType;
    const auth = `${tokenType} ${accessToken}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': auth,
    };

    try {
      const response = await fetch(`${API_URL}${uri}`, {
        headers,
        method: method || 'GET',
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await response.json();
      console.log(data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
