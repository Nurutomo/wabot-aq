module.exports = Object.assign(async function handler(m, { command }) {
    if (!m.quoted) throw 'Reply Pesan!'
    if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
    let sticker = global.DATABASE._data.sticker
    let hash = m.quoted.fileSha256.toString('hex')
    if (!(hash in sticker)) throw 'Hash not found in database'
    sticker[hash].locked = !/^un/i.test(command)
    m.reply('Done!')
}, {
    rowner: true,
    help: ['un', ''].map(v => v + 'lockcmd'),
    tags: ['database'],
    command: /^(un)?lockcmd$/i
})
