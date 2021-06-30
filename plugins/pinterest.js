//Created by Villagerindo, Saya masih pemula hehe
const axios = require('axios')
let fetch = require('node-fetch')
const { MessageType } = require('@adiwajshing/baileys')
const fetchJson = async (url, options) => new Promise(async(resolve, reject) => {
  fetch(url, options)
      .then(response => response.json())
      .then(json => {
          resolve(json)
      })
      .catch((err) => {
          reject(err)
      })
})
const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}
let handler = async (m, { conn, args }) => {
	let text = args.join` `
	if (!text) return m.reply('Tidak ada teks untuk di cari')
    img = await fetchJson(`https://fdciabdul.tech/api/pinterest?keyword=${text}`, {method: 'get'})
    result = JSON.parse(JSON.stringify(img));
					dpa = result[Math.floor(Math.random() * result.length)];
					buff = await getBuffer(dpa)
                    if (!buff) return m.reply(`Foto ${text} tidak dapat ditemukan!`)
                    conn.sendMessage(m.chat, buff, MessageType.image, { caption: `Nih ${text}`, quoted: m })
} 
handler.help = ['pinterest'].map(v => v + ' <pencarian>')
handler.tags = ['internet']
handler.command = /^pinterest$/
handler.fail = null

module.exports = handler