let handler = async (m, { conn, args }) => {

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image/.test(mime)) {
      let img = await conn.downloadM(q)
      if (!img) throw 'Foto tidak ditemukan!'
     await conn.updateProfilePicture(m.chat, img)
    m.reply('Sukses Mengganti Foto Profile Group!')
	}
    }
handler.help = ['setpp']
handler.command = /^(setpp)$/i
handler.group = true
handler.admin = true

module.exports = handler
