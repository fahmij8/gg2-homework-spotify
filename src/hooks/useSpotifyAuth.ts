import {useEffect} from 'react';
import {setAccessToken, setTokenType} from 'store/accountSlicer';
import {GlobalObject} from 'types';
import {useLocation} from 'react-router-dom';
import {useAppDispatch} from 'hooks';

export const useSpotifyAuth = (): void => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const urlParams: string[] = location.hash.substring(1).split('&');
    const params: GlobalObject = {};
    urlParams.forEach((param: string) => {
      const keyValue: string[] = param.split('=');
      params[keyValue[0]] = keyValue[1];
    });
    if (params.access_token && params.token_type && params.expires_in) {
      dispatch(setAccessToken(params.access_token));
      dispatch(setTokenType(params.token_type));
      localStorage.setItem('access_token', params.access_token);
      localStorage.setItem('token_type', params.token_type);
      localStorage.setItem(
        'expires_in',
        (new Date().getTime() + Number(params.expires_in) * 1000).toString(),
      );
    } else {
      if (localStorage.getItem('expires_in')) {
        const expiresIn = Number(localStorage.getItem('expires_in'));
        if (expiresIn > new Date().getTime()) {
          dispatch(setAccessToken(localStorage.getItem('access_token') as any));
          dispatch(setTokenType(localStorage.getItem('token_type') as any));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
