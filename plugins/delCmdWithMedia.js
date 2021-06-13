module.exports = Object.assign(async function handler(m, { text }) {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
    if (!hash) throw `Tidak ada hash`
    delete global.DATABASE._data.sticker[hash]
    m.reply(`Done!`)
}, {
    help: ['cmd'].map(v => 'del' + v + ' <text>'),
    tags: ['database'],
    command: ['delcmd']
})
