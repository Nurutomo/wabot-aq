module.exports = Object.assign(async function handler(m, { text }) {
    if (!m.quoted) throw 'Reply Pesan!'
    if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
    if (!text) throw `Tidak ada teks`
    global.DATABASE._data.sticker[m.quoted.fileSha256.toString('hex')] = {
        text,
        mentionedJid: m.mentionedJid,
    }
    m.reply(`Done!`)
}, {
    help: ['cmd'].map(v => 'set' + v + ' <text>'),
    tags: ['database'],
    command: ['setcmd']
})
