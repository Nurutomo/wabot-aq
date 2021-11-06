let handler = async(m, { conn, command }) => {
  let isPublic = command === "public";
  let self = global.opts["self"]

  if(self === !isPublic) return m.reply(`Dah ${!isPublic ? "Self" : "Public"} dari tadi ${m.sender.split("@")[0] === global.owner[1] ? "Mbak" : "Bang"} :v`)

  global.opts["self"] = !isPublic

  conn.setStatus(`${!isPublic ? "Self Mode!" : "Public Mode"}`)

  conn.fakeReply(m.chat, `Berhasil ${!isPublic ? "Self" : "Public"} bot!`, "0@s.whatsapp.net", "🤖 Bot setting", "status@broadcast")
}

handler.help = ["self", "public"]
handler.tags = ["owner"]

handler.owner = true

handler.command = /^(self|public)/i

module.exports = handler
