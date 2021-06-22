let handler = async (m, { conn, args }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	if (/image/.test(mime)) {
		let img = await q.download()
		if (!img) throw 'Foto tidak ditemukan!'
	  await conn.updateProfilePicture(m.chat, img)
	}
}
handler.help = ['setpp']
handler.command = ['setpp']
handler.group = true
handler.admin = true

module.exports = handler
