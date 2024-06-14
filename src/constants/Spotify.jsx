import SpotifyWebApi from "spotify-web-api-js";

const CLIENT_ID = "91d037f7894441b2aab67c0acec6689d";
// const REDIRECT_URI = "https://spotify-playlist.coleamlong.com";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_URL = "https://accounts.spotify.com/authorize";
const SCOPES = [
    "user-top-read",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-read-private",
];

const spotifyApi = new SpotifyWebApi();

export { CLIENT_ID, REDIRECT_URI, AUTH_URL, SCOPES, spotifyApi };
