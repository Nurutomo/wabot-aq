let handler = m => m

handler.all = async function (m) {
    if (m.message && m.isBaileys && m.quoted && m.quoted.mtype === 'orderMessage' && !(m.quoted.token && m.quoted.orderId)) {
        m.reply('Bug Troli Detected\n\n' + require('util').format(m.key))
        // await this.clearMessage(m.chat, m.key)
        await this.modifyChat(m.chat, 'delete', {
            includeStarred: false
        }).catch(console.log)
    }
}

module.exports = handler