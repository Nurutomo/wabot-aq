let handler = m => m

handler.all = async function (m) {
    if (m.chat.endsWith('broadcast')) return
    if (db.data.chats[m.chat].isBanned) return
    if (db.data.users[m.sender].banned) return
    if (m.isBaileys) return
    let msgs = db.data.msgs
    if (!(m.text in msgs)) return
    let _m = conn.serializeM(JSON.parse(JSON.stringify(msgs[m.text]), (_, v) => {
        if (
            v !== null &&
            typeof v === 'object' &&
            'type' in v &&
            v.type === 'Buffer' &&
            'data' in v &&
            Array.isArray(v.data)) {
            return Buffer.from(v.data)
        }
        return v
    }))
    await _m.copyNForward(m.chat, true)
}

module.exports = handler