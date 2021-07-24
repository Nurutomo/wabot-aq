let { promises: fs } = require('fs')
let { join } = require('path')
const tmp = join(__dirname, '../tmp')
async function handler(m) {
    let { braillefy } = require('img2braille')

    let q = m.quoted ? m.quoted : m
    if (!/^image/.test(q.mimetype)) throw 'Not an Image!'
    let filename = join(tmp, + new Date + '.png')
    await fs.writeFile(filename, await q.download())
    m.reply(await braillefy(filename, 30, {
        invert: false,
        dither: true
    }))
    await fs.unlink(filename)
}
handler.command = handler.help = ['tobraille']
handler.tags = ['tools']

module.exports = handler
