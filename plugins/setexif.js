const path = require('path')
const fs = require('fs')

const loc = path.join(__dirname, '../lib/exif.json')
let handler = async (m, { usedPrefix, command, args }) => {
    let tek = args.join` `
    let teks = tek.split('|')
    let stek1 = teks[0]
    let stek2 = teks[1]
    if (stek1 && stek2) {
        fs.writeFile(loc, JSON.stringify({
            spackname: `${teks[0]}`,
            sauthor: `${teks[1]}`,
        }, null, 4), function (err) {
            if (err) throw err;
            console.log('Replaced!');
            m.reply(`Sukses mengganti exif
            
*Packname*: ${stek1}
*Author*: ${stek2}
    `)
        });
        global.packname = stek1
        global.author = stek2
    } else {
        m.reply(`Format salah ${usedPrefix + command} <packname>|<owner>`)
    }

}

//st4rz

handler.help = ['set'].map(v => v + 'exif <packname>|<owner>')
handler.tags = ['owner']
handler.command = /^setexif$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
