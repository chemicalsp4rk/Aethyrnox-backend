import querystring from "querystring";

export default async function handler(req, res) {
  const code = req.query.code || null;
  const redirect_uri = process.env.REDIRECT_URI;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  const basic = Buffer.from(client_id + ":" + client_secret).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Authorization": "Basic " + basic,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: querystring.stringify({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code"
    })
  });

  const data = await response.json();

  if (data.access_token) {
    const frontend_uri = process.env.FRONTEND_URI;
    res.redirect(`${frontend_uri}?access_token=${data.access_token}`);
  } else {
    res.status(400).json({ error: "Invalid token response", data });
  }
}