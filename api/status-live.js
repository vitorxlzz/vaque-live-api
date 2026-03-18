export default async function handler(req, res) {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  const userLogin = "vaquerei";

  try {
    const tokenResponse = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
      { method: "POST" }
    );

    const tokenData = await tokenResponse.json();

    const streamResponse = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${userLogin}`,
      {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const streamData = await streamResponse.json();

    res.status(200).json({
      online: streamData.data.length > 0
    });

  } catch (err) {
    res.status(500).json({ error: "Erro" });
  }
} 
