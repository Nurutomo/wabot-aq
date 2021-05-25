let handler = async (m, { conn, args, command }) => {
    if (/all/g.test(command)) {
        for (const jid of conn.chats.all().filter(v => v.jid.endsWith('g.us') && !v.archive).map(v => v.jid)) {
            const sayonara = (await conn.groupMetadata(jid)).id
            await conn.groupLeave(sayonara)
        }
    } else {
        if (args[0] && !args[0].endsWith("g.us")) return m.reply("Invalid jid!")
        const groupMetadata = await conn.groupMetadata(args.length ? args[0].trim() : m.chat)
        await conn.groupLeave(groupMetadata.id)
    }
}
handler.help = ['leave']
handler.tags = ['owner']
handler.owner = true
handler.group = true
handler.command = /^(leave)(all)?$/i

module.exports = handler