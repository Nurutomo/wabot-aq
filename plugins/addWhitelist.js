let handler = async (m, { usedPrefix, command, text, args }) => {
    if (!args || !['add', 'remove'].includes(args[0].toLowerCase())) throw `
*Usage:* ${usedPrefix + command} <add|remove> number,number,...,number
*Example:*
${usedPrefix + command} add 6281111111111,12345678901,0
${usedPrefix + command} remove 6281111111111,12345678901,0
`.trim()
    let type = args[0].toLowerCase() === 'add' ? true : false
    let teks = text.replace(args[0], '').trim()
    let users = teks.split(',').map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
    for (let who of users) {
        let user = global.DATABASE.data.users[who]
        if (!user) user = global.DATABASE.data.users[who] = {}
        user.whitelist = type
    }
    m.reply(`Done ${type ? 'add' : 'remove'} whitelist ${users.length} user(s)`)
}
handler.help = ['whitelist'].map(v => v + ' nomor,nomor')
handler.tags = ['owner']
handler.command = ['whitelist']
handler.owner = true

module.exports = handler
