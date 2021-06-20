//Made by Anshul
//Tq to Nuru for always helping :)
const axios = require('axios')
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
        await webpGifFile(savedFilename)
            .then(async (rest) => {
                await axios({
                    method: "GET",
                    url: rest.result,
                    responseType: "stream",
                }).then(({ data }) => {
                    const saved = data.pipe(
                        fs.createWriteStream(`./tmp/${filename}-hasil.gif`)
                    )
                    saved.on("finish", () => {
                        conn.sendMessage(
                            m.chat,
                            fs.readFileSync(`./tmp/${filename}-hasil.gif`),
                            MessageType.video, {
                            mimetype: Mimetype.gif,
                            caption: `*DARK-BOT*`,
                            quoted: m,
                        }
                        )
                        if (fs.existsSync(savedFilename)) fs.unlinkSync(savedFilename)
                        if (fs.existsSync(`./tmp/${filename}-hasil.gif`)) fs.unlinkSync(`./tmp/${filename}-hasil.gif`)
                    })
                })
            })
            .catch((e) => {
                console.log(e)
                m.reply(global.error)
                if (fs.existsSync(savedFilename)) fs.unlinkSync(savedFilename)
            })
    } else throw `send a gif sticker then reply with a caption ${usedPrefix}togif`
}

handler.command = /^(togif)$/i
handler.tags = ['sticker']
handler.limit = true
module.exports = handler

const getRandom = () => {
    return `${Math.floor(Math.random() * 10000)}`
}

function webpGifFile(path) {
    return new Promise(async (resolve, reject) => {
        const bodyForm = new FormData()
        bodyForm.append('new-image-url', '')
        bodyForm.append('new-image', fs.createReadStream(path))
        await axios({
            method: 'post',
            url: 'https://ezgif.com/webp-to-mp4',
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
            const datagot = {
                file: file,
                token: token,
                convert: convert
            }
            bodyFormThen.append('file', datagot.file)
            bodyFormThen.append('token', datagot.token)
            bodyFormThen.append('convert', datagot.convert)
            await axios({
                method: 'post',
                url: 'https://ezgif.com/webp-to-mp4/' + datagot.file,
                data: bodyFormThen,
                headers: {
                    'Content-Type': `multipart/form-data boundary=${bodyFormThen._boundary}`
                }
            }).then(({ data }) => {
                const $ = cheerio.load(data)
                const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
                resolve({
                    status: true,
                    message: "Mr Anshul",
                    result: result
                })
            }).catch(reject)
        }).catch(reject)
    })
}
// by M AFDHAN
