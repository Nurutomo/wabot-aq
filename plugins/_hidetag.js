const { MessageType } = require("@adiwajshing/baileys")
let handler = async (m, { conn, args }) => {
   let jumlah = args[0]
   if (jumlah && isNaN(jumlah)) return m.reply("Pake angka aja om :v");
   if (jumlah && Number(jumlah) > 50) return m.reply("Jumlah Kebanyakan :v\nMaksimal 50")
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
handler.help = ['htag <jumlah> <pesan> (limit)']
handler.tags = ['group']
handler.command = /^htag$/i
handler.limit = true
handler.admin = true
handler.group = true
module.exports = handler

// by M AFDHAN :v
