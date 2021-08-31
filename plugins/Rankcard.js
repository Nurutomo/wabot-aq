let levelling = require('../lib/levelling')
let fetch = require('node-fetch')
let fs = require('fs')

let handler  = async (m, { conn, text }) => {
	
	

let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
let name = conn.getName(m.sender)
try {
  } catch (e) {

  } finally {
let res = `http://hardianto-chan.herokuapp.com/api/rankcard?profile=https://i.ibb.co/1s8T3sY/48f7ce63c7aa.jpg&name=${name}&bg=https://i.ibb.co/4YBNyvP/images-76.jpg&needxp=${max}&curxp=${exp}&level=${level}&logorank=https://i.ibb.co/Wn9cvnv/FABLED.png`
let caption = `
*❏ Your Profile!:*
*❏ Name:* ${name}
*❏ Role :* ${role}
*❏ Level:* ${level}
*❏ Exp :* ${exp} --> ${max}
*❏ limit:* ${limit}
`
conn.sendFile(m.chat, res, 'test.jpg', caption, m, false)
} 
    
    }
handler.help = ['rank']
handler.tags = ['info']
handler.command = /^(rank|rankcard)$/i

handler.register = true
handler.fail = null

module.exports = handler
