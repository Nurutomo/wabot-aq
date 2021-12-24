module.exports = {
    async all(m) {
        let chat = db.data.chats[m.chat]
        let user = db.data.users[m.sender]
        if (m.chat.endsWith('broadcast') || chat.isBanned || !chat.getmsg || user.banned || m.isBaileys) return
        let msgs = db.data.msgs
        if (!(m.text in msgs)) return
        if (msgs[m.text].locked) if (!isROwner) return m.reply('Dikunci!')
        let _m = this.serializeM(JSON.parse(JSON.stringify(msgs[m.text]), (_, v) => {
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
}