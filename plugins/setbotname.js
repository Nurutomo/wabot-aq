// NurNurz
let handler = async (m, { conn, text }) => {
   if (!text) throw `Masukan Nama Baru Untuk Bot`
     try {
        await conn.updateProfileName(text)
        conn.reply(m.chat, 'Sukses Mengganti Nama Bot', m)
     } catch (e) {
       console.log(e)
       throw `Error`
     }
}
handler.help = ['setbotname']
handler.tags = ['owner']
handler.command = /^(setbotname)$/i
handler.owner = true

module.exports = handler
