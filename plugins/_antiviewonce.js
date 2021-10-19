module.exports = {
    async before(m) {
        if (!db.data.chats[m.chat].viewonce) return
        let q = m.quoted ? m.quoted : m
        if (q.mtype == 'viewOnceMessage') {
            await this.copyNForward(m.chat, await this.loadMessage(m.chat, q.id), false, { readViewOnce: true })
        }
    }
}
