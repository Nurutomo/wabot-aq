let handler = async (m, { usedPrefix, command }) => {
    let which = command.replace(/(daftar|list)/i, '')
    let msgs = db.data.msgs
    let split = Object.entries(msgs).map(([nama, isi]) => { return { nama, ...isi } })
    let fltr
    if (/all/i.test(command)) fltr = split
    if (/audio/i.test(command)) fltr = split
        .filter(v => v.message.audioMessage)
        .filter(m => m.message.audioMessage.ptt == false)
    if (/doc/i.test(command)) fltr = split.filter(v => v.message.documentMessage)
    if (/vn/i.test(command)) fltr = split
        .filter(v => v.message.audioMessage)
        .filter(m => m.message.audioMessage.ptt == true)
    if (/video/i.test(command)) fltr = split
        .filter(v => v.message.videoMessage && !v.message.videoMessage.gifPlayback)
    if (/gif/i.test(command)) fltr = split
        .filter(v => v.message.videoMessage)
        .filter(m => m.message.videoMessage.gifPlayback)
    if (/stic?ker/i.test(command)) fltr = split.filter(v => v.message.stickerMessage)
    if (/msg/i.test(command)) fltr = split.filter(v => v.message.conversation)
    if (/img/i.test(command)) fltr = split.filter(v => v.message.imageMessage)
    let list = fltr.map(v => `├ ${v.nama} ${v.locked ? '(🔒)' : ''}`).join('\n')
    if (db.data.chats[m.chat].getmsg) return m.reply(`
┌「 *Daftar Pesan* 」
${list}
└────

Akses dengan mengetik nama
`.trim())
    else return conn.sendButton(m.chat, `
┌「 *Daftar Pesan* 」
${list}
└────

Akses dengan:
*${usedPrefix}get${which}* <nama>

Jika Getmsg diaktifkan maka tidak perlu lagi mengetik *${usedPrefix}get${which}*
`.trim(), '© wabot-aq', 'Aktifkan', '.1 getmsg', m)
}
handler.help = ['all', 'doc', 'vn', 'msg', 'video', 'gif', 'audio', 'img', 'sticker'].map(v => 'list' + v)
handler.tags = ['database']
handler.command = /^(daftar|list)(vn|msg|video|audio|img|stic?ker|gif)$/

module.exports = handler
