import {faPencil, faMusic, faCheck} from '@fortawesome/free-solid-svg-icons';
import type {Toast} from 'react-hot-toast';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
export const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
export const LOGIN_URL =
  `https://accounts.spotify.com/authorize?` +
  `client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}` +
  `&scope=playlist-modify-private user-top-read streaming user-read-private ` +
  `user-read-email`;
export const API_URL = 'https://api.spotify.com/v1';
export const MENU = [
  {
    name: 'Track Selection',
    icon: faMusic,
  },
  {
    name: 'Playlist Details',
    icon: faPencil,
  },
  {
    name: 'Confirmation',
    icon: faCheck,
  },
];
export const CONFIG_NOTIFY: Partial<Toast> = {
  position: 'bottom-center',
  style: {
    background: '#333',
    color: '#fff',
  },
  duration: 5000,
};
