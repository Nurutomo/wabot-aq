// Bismillah  >\\<

const { MessageType } = require("@adiwajshing/baileys")
let handler = async (m, { conn, args }) => {
   let jumlah = args[0]
   if (jumlah && isNaN(jumlah)) return m.reply("Pake angka aja om :v");
   if (jumlah && Number(jumlah) > 7) return m.reply("Jumlah Kebanyakan :v\nMaksimal 7")
   if(!jumlah) jumlah = 5
   args.shift()
   let pesan = args.join(" ")
   if (!pesan) pesan = "Ngopi dulu bang :v"   
   let users = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
   for(let i = 0; i < jumlah; i++) {
        conn.sendMessage(m.chat, pesan, MessageType.extendedText, { 
          contextInfo: { 
            mentionedJid: users 
          } 
        })
     }
 }
handler.help = ['htag']
handler.tags = ['admin']
handler.command = /^htag$/i

handler.limit = false
handler.register = false
handler.admin = true
handler.group = true

module.exports = handler
