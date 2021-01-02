let handler = async (m, { conn, args }) => {
  let [ l, r ] = args.join` `.split`|`
  if (!l) l = ''
  if (!r) r = ''
  conn.reply(m.chat, l + readMore + r, m)
}
handler.command = /^(spoiler|hidetext|readmore|selengkapnya)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
