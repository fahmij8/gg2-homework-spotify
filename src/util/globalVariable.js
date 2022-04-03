export const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
export const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
export const LOGIN_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=playlist-modify-private`;
export const API_URL = "https://api.spotify.com/v1";
