import {API_URL} from './globalVariable';
import {store} from 'store';
import {GlobalObject} from 'types';
import {CONFIG_NOTIFY} from 'utils';
import toast from 'react-hot-toast';

export const fetchAPI = (
  uri: string,
  body?: GlobalObject,
  method?: 'POST' | 'GET',
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const accessToken = store.getState().account.accessToken;
    const tokenType = store.getState().account.tokenType;
    const auth = `${tokenType} ${accessToken}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': auth,
    };

    fetch(`${API_URL}${uri}`, {
      headers,
      method: method || 'GET',
      body: body ? JSON.stringify(body) : undefined,
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const notify = (message: string, type: 'success' | 'error') => {
  if (type === 'success') {
    toast.success(message, CONFIG_NOTIFY);
  } else if (type === 'error') {
    toast.error(message, CONFIG_NOTIFY);
  }
};

export const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};
