export default function handler(req, res) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.REDIRECT_URI;
  const scopes = "user-top-read";

  const auth_url = "https://accounts.spotify.com/authorize" +
    "?response_type=code" +
    "&client_id=" + encodeURIComponent(client_id) +
    "&scope=" + encodeURIComponent(scopes) +
    "&redirect_uri=" + encodeURIComponent(redirect_uri);

  res.redirect(auth_url);
}