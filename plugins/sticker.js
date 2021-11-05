const { MessageType } = require("@adiwajshing/baileys")
//const { sticker } = require("../lib/sticker")
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
let handler = async (m, { conn, args, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (/image/.test(mime)) {
    let img = await q.download();
    if (!img) throw `balas gambar dengan caption *${usedPrefix + command}*`;
    let out = img
    if (q.isAnimated) {
      out = await webp2mp4(img)
    }
    const buffer = await createSticker(out, {
      type: StickerTypes.CROPPED,
      pack: global.packname,
      author: global.author,
      id: owner[0],
      quality: 1,
    });
    await conn.sendMessage(m.chat, buffer, MessageType.sticker, {
      quoted: m,
      mimetype: "image/webp",
    });
  } else if (/video/.test(mime)) {
    if ((q.msg || q).seconds > 11) throw "Maksimal 10 detik!";
    let img = await q.download();
    if (!img) throw `balas video/gif dengan caption *${usedPrefix + command}*`;
    const buffer = await createSticker(img, {
      type: StickerTypes.CROPPED,
      pack: global.packname,
      author: global.author,
      id: owner[0],
      quality: 1,
    });
    await conn.sendMessage(m.chat, buffer, MessageType.sticker, {
      quoted: m,
      mimetype: "image/webp",
    });
  } else if (args[0]) {
    if (isUrl(args[0])) {
    const buffer = await createSticker(args[0], {
      type: StickerTypes.CROPPED,
      pack: global.packname,
      author: global.author,
      id: owner[0],
      quality: 1,
    });
    await conn.sendMessage(m.chat, await buffer, MessageType.sticker, {
      quoted: m,
      mimetype: "image/webp",
    });
    } else throw "URL tidak valid!";
  } else throw `Conversion failed`;
};
handler.help = ['stiker (caption|reply media)', 'stiker <url>', 'stikergif (caption|reply media)', 'stikergif <url>']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i

module.exports = handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
//fatur anjing
