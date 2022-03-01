const { Manga } = require("@shineiichijo/marika");

let handler = async (m, { conn, text }) => {
  if (!text) throw `Masukkan query!`;
  const client = new Manga();
  let manga;
  try {
    manga = await client.searchManga(text);
  } catch (error) {
    throw `Invalid query!`;
  }
  const res = manga.data[0];
  let Text = `✨️ *Title:* ${res.title}\n🎆️ *Volumes:* ${res.volumes}\n🍥 *Chapters:* ${res.chapters}\n🎗️ *Genres:*`;
  for (let i = 0; i < res.genres.length; i++) {
    text += `\t${res.genres[i].name}`;
  }
  Text += `\n➡️ *Published on:* ${res.published.from}\n🔚 *Ended on:* ${res.published.to}\n🤍 *Favorites*: ${res.favorites}\n❤️ *Score:* ${res.scored}\n👥 *Members:* ${res.members}\n🏅 *Rank:* ${res.rank}\n🎏 *Popularity Rank:* ${res.popularity}\n✍ *Authors:*`;
  for (let i = 0; i < res.authors.length; i++) {
    Text += `\t${res.authors[i].name},`;
  }
  Text += `\n`;
  if (res.background !== null) Text += `🎋 *Background:* ${res.background}\n`;
  Text += `💚️ *Synopsis:* ${res.synopsis}\n🌐️ *URL*: ${res.url}`;
  conn.sendFile(m.chat, res.images.jpg.large_image_url, "", Text, m);
};
handler.help = ["manga <judul>"];
handler.tags = ["internet"];
handler.command = /^(manga)$/i;
module.exports = handler;
