let handler  = async (m, { conn, text }) => {

        if (!text) throw 'masukkan nomor untuk dipindai'

        var exists = conn.isOnWhatsApp(text)
        if (exists) {
        await m.reply(`${text}\n*✅️ Orang Bernomor Menggunakan WhatsApp! ✅*`)
    })
    else throw `${text}\n*❌️ Orang Bernomor Tidak Menggunakan WhatsApp! ❌️*`
  }
}
handler.help = ['scan'].map(v => v + ' <tesks>')
handler.tags = ['tools']

handler.command = /^scan$/i

module.exports = handler
