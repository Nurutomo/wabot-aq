const { MessageType } = require("@adiwajshing/baileys");
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [packname, ...author] = text.split`|`;
    author = (author || []).join`|`;
    let quot = `Reply sticker!`
    if (!m.quoted) throw quot
    if (!/stickerMessage/.test(m.quoted.mtype)) throw quot
    let img = await m.quoted.download();
    const buffer = await createSticker(img, {
      type: StickerTypes.CROPPED,
      pack: packname || global.packname,
      author: author || global.author,
      id: owner[0],
    });
    await conn.sendMessage(m.chat, buffer, MessageType.sticker, {
      quoted: m,
      mimetype: "image/webp",
    });
};
handler.help = ["wm <packname>|<author>"];
handler.tags = ["sticker"];
handler.command = /^wm$/i;

module.exports = handler;
