let handler = async (m, { command, usedPrefix, text }) => {
    let which = command.replace(/get/i, '')
    if (!text) throw `Gunakan *${usedPrefix}list${which}* untuk melihat list nya`
    let msgs = global.db.data.msgs
    if (!text in msgs) throw `'${text}' tidak terdaftar di list pesan`
    delete msgs[text]
    m.reply(`Berhasil menghapus pesan di list pesan dengan nama '${text}'`)
}
handler.help = ['vn', 'msg', 'video', 'gif', 'audio', 'img', 'sticker'].map(v => 'del' + v + ' <teks>')
handler.tags = ['database']
handler.command = /^(-|del)(vn|msg|video|audio|img|stic?ker|gif)$/

module.exports = handler
