const { Anime } = require("@shineiichijo/marika");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    throw `Uhm.. teksnya mana?\n\nContoh:\n${usedPrefix + command} naruto`;
  const client = new Anime();
  let anime;
  try {
    anime = await client.searchAnime(text);
  } catch (error) {
    throw `Invalid query!`;
  }
  const i = anime.data[0];
  //Scrape Genre MAL by DwiR
  let res2 = await fetch(`https://myanimelist.net/anime/${i.mal_id}`);
  if (!res2.ok) throw await res2.text();
  let html = await res2.text();
  let { document } = new JSDOM(html).window;
  let genAnim = [...document.querySelectorAll('div[class="spaceit_pad"] > * a')]
    .map((el) => el.href)
    .filter((href) => href.startsWith("/anime/genre/"));
  let Text = `✨️ *Title:* ${i.title}\n🎆️ *Episodes:* ${
    i.episodes
  }\n🎗️ *Genres:* ${genAnim.join(", ")}\n➡️ *Start date:* ${
    i.aired.from
  }\n🔚 *End date:* ${i.aired.to}\n🍥 *Source:* ${i.source}\n💬 *Show Type:* ${
    i.type
  }\n💌️ *Rating:* ${i.rating}\n🤍 *Favorites*: ${i.favorites}\n❤️ *Score:* ${
    i.score
  }\n👥 *Members:* ${i.members}\n🏅 *Rank:* ${i.rank}\n🎏 *Popularity Rank:* ${
    i.popularity
  }\n`;
  Text += `📍 *Studios:*`;
  for (let k = 0; i < i.studios.length; k++) {
    Text += `\t${i.studios[k].name},`;
  }
  Text += `\n🎴 *Producers:*`;
  for (let k = 0; k < i.producers.length; k++) {
    Text += `\t${i.producers[k].name},`;
  }
  Text += `\n`;
  if (i.background !== null) Text += `🎋 *Background:* ${i.background}\n`;
  Text += `💚️ *Synopsis:* ${i.synopsis}\n🌐️ *URL*: ${i.url}`;
  conn.sendFile(m.chat, i.images.jpg.large_image_url, "", Text, m);
};
handler.help = ["anime <judul>"];
handler.tags = ["internet"];
handler.command = /^(anime|animeinfo)$/i;
module.exports = handler;
