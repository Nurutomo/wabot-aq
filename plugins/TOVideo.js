//Made by Anshul
//Tq to Nuru for always helping :)
const Axios = require('axios')
const { MessageType, Mimetype } = require('@adiwajshing/baileys')
const cheerio = require('cheerio')
const fs = require("fs");
const FormData = require('form-data')

let handler = async (m, { conn, args, usedPrefix }) => {
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) throw 'Reply sticker only!'
    const mediaData = m.quoted ? m.quoted.fakeObj : m
    const filename = getRandom()
    const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./tmp/${filename}`)
    
    await m.reply(global.wait)
    if (/webp/.test(m.quoted.mimetype)) {
        await webp2mp4File(savedFilename)
            .then(async (rest) => {
                await Axios({
                    method: "GET",
                    url: rest.result,
                    responseType: "stream",
                }).then(({ data }) => {
                    const saving = data.pipe(
                        fs.createWriteStream(`./tmp/${filename}-done.mp4`)
                    )
                    saving.on("finish", () => {
                        conn.sendMessage(
                            m.chat,
                            fs.readFileSync(`./tmp/${filename}-done.mp4`),
                            MessageType.video, {
                            mimetype: Mimetype.mp4,
                            caption: `*©DARK BOT*`,
                            quoted: m,
                        }
                        )
                        if (fs.existsSync(savedFilename)) fs.unlinkSync(savedFilename)
                        if (fs.existsSync(`./tmp/${filename}-done.mp4`)) fs.unlinkSync(`./tmp/${filename}-done.mp4`)
                    })
                })
            })
            .catch((e) => {
                console.log(e)
                balas(m.chat, '```Error```')
                if (fs.existsSync(savedFilename)) fs.unlinkSync(savedFilename)
            })
    } else throw `send the sticker then reply with a caption ${usedPrefix}tovideo`
}


handler.command = /^(tovid(eo)?)$/i
handler.tags = ['sticker']
handler.limit = true
module.exports = handler

const getRandom = () => {
    return `${Math.floor(Math.random() * 10000)}`
}

function webp2mp4File(path) {
    return new Promise(async (resolve, reject) => {
        const bodyForm = new FormData()
        bodyForm.append('new-image-url', '')
        bodyForm.append('new-image', fs.createReadStream(path))
        await Axios({
            method: 'post',
            url: 'https://s6.ezgif.com/webp-to-mp4',
            data: bodyForm,
            headers: {
                'Content-Type': `multipart/form-data boundary=${bodyForm._boundary}`
            }
        }).then(async ({ data }) => {
            const bodyFormThen = new FormData()
            const $ = cheerio.load(data)
            const file = $('input[name="file"]').attr('value')
            const token = $('input[name="token"]').attr('value')
            const convert = $('input[name="file"]').attr('value')
            const gotdata = {
                file: file,
                token: token,
                convert: convert
            }
            bodyFormThen.append('file', gotdata.file)
            bodyFormThen.append('token', gotdata.token)
            bodyFormThen.append('convert', gotdata.convert)
            await Axios({
                method: 'post',
                url: 'https://ezgif.com/webp-to-mp4/' + gotdata.file,
                data: bodyFormThen,
                headers: {
                    'Content-Type': `multipart/form-data boundary=${bodyFormThen._boundary}`
                }
            }).then(({ data }) => {
                const $ = cheerio.load(data)
                const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
                resolve({
                    status: true,
                    message: "Created By MRHRTZ",
                    result: result
                })
            }).catch(reject)
        }).catch(reject)
    })
}

// Thanks to https://github.com/ariffb25