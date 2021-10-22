let handler = async (m, { args, usedPrefix, command }) => {

if (!args[0]) throw 'link githubnya mana? contoh: https://github.com/Bintang73/botst4rz'
if (!args[1]) throw 'nama filenya mana? contoh: https://github.com/Bintang73/botst4rz st4rz'

if(!args[0].includes('github.com')) throw 'link salah!'

let url = `${args[0]}/archive/refs/heads/main.zip`

m.reply(`*Mohon tunggu, sedang mengirim repository..*`)
conn.sendFile( m.chat, url, `${args[1]}.zip`, null, m)

}
handler.help = ['gitclone']
handler.tags = ['download']
handler.command = /gitclone/i

handler.limit = true

module.exports = handler
