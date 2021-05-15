let handler = m => m
let debugMode = !1

handler.before = function (m) {
    let ok
    let isWin = !1
    let isTie = !1
    let isSurrender = !1
    let conn = this
    conn.game = conn.game ? conn.game : {}
    let room = Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING')
    if (room) {
        // m.reply(`[DEBUG]\n${parseInt(m.text)}`)
        if (!/^([1-9]|(me)?nyerah|surr?ender)$/i.test(m.text)) return
        isSurrender = !/^[1-9]$/.test(m.text)
        if (m.sender !== room.game.currentTurn) { // nek wayahku
            if (!isSurrender) return
        }
        if (debugMode) m.reply('[DEBUG]\n' + require('util').format({
            isSurrender,
            text: m.text
        }))
        if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
            m.reply({
                '-3': 'Game telah berakhir',
                '-2': 'Invalid',
                '-1': 'Posisi Invalid',
                0: 'Posisi Invalid',
            }[ok])
            return
        }
        if (m.sender === room.game.winner) isWin = true
        else if (room.game.board === 511) isTie = true
        let arr = room.game.render().map(v => {
            return {
                X: '❌',
                O: '⭕',
                1: '1️⃣',
                2: '2️⃣',
                3: '3️⃣',
                4: '4️⃣',
                5: '5️⃣',
                6: '6️⃣',
                7: '7️⃣',
                8: '8️⃣',
                9: '9️⃣',
            }[v]
        })
        if (isSurrender) {
            room.game._currentTurn = m.sender === room.game.playerX
            isWin = true
        }
        let str = `
Room ID: ${room.id}
${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

${isWin || isTie ? '' : `Menunggu @${room.game.currentTurn.split('@')[0]}`}
${isWin ? `@${(isSurrender ? room.game.currentTurn : room.game.winner).split('@')[0]} Menang!` : ''}
${isTie ? 'Game berakhir' : ''}
`.trim()
        if ((room.game._currentTurn ? room.o : room.x) !== m.chat)
            room[room.game._currentTurn ? 'o' : 'x'] = m.chat
        if (room.x !== room.o) m.reply(str, room.x, {
            contextInfo: {
                mentionedJid: conn.parseMention(str)
            }
        })
        m.reply(str, room.o, {
            contextInfo: {
                mentionedJid: conn.parseMention(str)
            }
        })
        if (isTie || isWin) {
            if (debugMode) m.reply('[DEBUG]\n' + require('util').format(room))
            delete conn.game[room.id]
        }
    }
}

module.exports = handler
