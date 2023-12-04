// https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=rvf4cmjfunyns7rhquhkt76773yseu&redirect_uri=http://localhost:3000&scope=chat%3Aedit%20chat%3Aread&state=c3ab8aa609ea11e793ae92361f002671

const WebSocket = require("ws");
require("dotenv").config();

const TWITCH_WEBSOCKET_URL = "wss://irc-ws.chat.twitch.tv:443";
const twitchUsername = process.env.TWITCH_USER;
const twitchOAuth = `oauth:${process.env.TWITCH_TOKEN}`;
const channelName = "h2p_gucio";

const ws = new WebSocket(TWITCH_WEBSOCKET_URL);

ws.on("open", () => {
  console.log("Connecting...");

  ws.send(`PASS ${twitchOAuth}`);
  ws.send(`NICK ${twitchUsername}`);
  ws.send(`JOIN #${channelName}`);

  ws.send(`PRIVMSG #${channelName} :polonczono sie pozdro witamCieKolezanko`);

  setInterval(
    () => ws.send(`PRIVMSG #${channelName} :!kondom peepoSnowball`),
    1000 * 60 * 4
  );
});

ws.on("message", (message) => {
  const msg = message.toString();
  console.log(msg);
});

ws.on("close", () => {
  console.log("WebSocket connection closed.");
});
