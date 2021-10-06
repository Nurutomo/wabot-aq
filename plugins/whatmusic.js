let FormData = require('form-data')
let axios = require('axios')

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
  if (!/video|audio/.test(mime)) throw `balas music yang ingin dicari dengan command *${usedPrefix + command}*`
 m.reply('Please wait....')
				const bodyForm = new FormData()
			        bodyForm.append('audio', await q.download(), 'music.mp3')
           			bodyForm.append('apikey', 'apivinz')
           			axios('https://api.zeks.me/api/searchmusic', {
                		method: 'POST',
                		headers: {
				"Content-Type": "multipart/form-data",
        			...bodyForm.getHeaders()
                		},
                		data: bodyForm
            			})
                		.then(({data}) =>{
				  m.reply(`*Data telah ditemukan*\n\n*Judul* : ${data.data.title}\n*Artis* : ${data.data.artists}\n*Genre* : ${data.data.genre}\n*Album* : ${data.data.album}\n*Tanggal rilis* : ${data.data.release_date}`)
				}).catch(() => {
				m.reply('Lagu tidak ditemukan...')
				})
				
}
handler.help = ['whatmusic', 'searchmusic']
handler.tags = ['main']

handler.command = ['whatmusic', 'searchmusic']

module.exports = handler
