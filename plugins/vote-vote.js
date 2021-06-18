let handler = async (m, { conn, usedPrefix, command }) => {
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) throw `_*tidak ada voting digrup ini!*_\n\n*${usedPrefix}mulaivote* - untuk memulai vote`
    let cekup = conn.vote[id][1]
    let cekde = conn.vote[id][2]
    let voter = cekup.concat(cekde)
    const wasVote = voter.includes(m.sender)
    if (wasVote) throw 'Kamu sudah vote!'
    if (/up/i.test(command)) {
        cekup.push(m.sender)
    } else if (/de/i.test(command)) {
        cekde.push(m.sender)
    }
    m.reply(`Done!\n\n*${usedPrefix}cekvote* - untuk mengecek vote`)

}
handler.help = ['vote']
handler.tags = ['vote']
handler.command = /^(up|de)?vote$/i
handler.group = true
module.exports = handler