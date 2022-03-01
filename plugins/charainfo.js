const { Character } = require("@shineiichijo/marika");

let handler = async (m, { conn, text }) => {
  if (!text) throw `Masukkan query!`;
  const client = new Character();
  let chara;
  try {
    chara = await client.searchCharacter(text);
  } catch (error) {
    throw `Invalid query!`;
  }
  let Text = `💬 *Name:* ${chara.data[0].name}\n`;
  if (chara.data[0].nicknames.length > 0)
    Text += `💭 *Nicknames:* ${chara.data[0].nicknames.join(", ")}\n`;
  Text += `🤍 *Favorites*: ${chara.data[0].favorites}\n💙 *About: ${chara.data[0].about}\n🔗 *Link*: ${chara.data[0].url}`;
  conn.sendFile(m.chat, chara.data[0].images.jpg.image_url, "", Text, m);
};
handler.help = ["character <nama>"];
handler.tags = ["internet"];
handler.command = /^(chara|character)$/i;
module.exports = handler;
