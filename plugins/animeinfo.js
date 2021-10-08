let fetch = require('node-fetch')
let cheerio = require('cheerio')
let handler = async(m, { conn, text }) => {
  if (!text) throw `Masukkan query!`
  let res = await fetch(global.API('https://api.jikan.moe', '/v3/search/anime', { q: text }))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  let { title, members, synopsis, episodes, url, rated, score, image_url, type, start_date, end_date, mal_id } = json.results[0]
  //Scrape Genre MAL by DwiR
  var genAnim = []
  await fetch(`https://myanimelist.net/anime/${mal_id}`, { method: 'get' }).then(res => res.text()).then(res => { const $ = cheerio.load(res);$('div[class="spaceit_pad"]').each((a, b) => { $(b).each(function(c, d) { $(d).find("a").each(function(e, f) { if ($(f).attr("href").startsWith('/anime/genre/')) { genAnim.push($(f).text()) } }) }) }) })
let animeingfo = `✨️ *Title:* ${title}
🎆️ *Episodes:* ${episodes}
🎗️ *Genre:* ${genAnim.join(", ")}
➡️ *Start date:* ${start_date}
🔚 *End date:* ${end_date}
💬 *Show Type:* ${type}
💌️ *Rating:* ${rated}
❤️ *Score:* ${score}
👥 *Members:* ${members}
💚️ *Synopsis:* ${synopsis}
🌐️ *URL*: ${url}`
  conn.sendFile(m.chat, image_url, '', animeingfo, m)
}
handler.help = ['anime <judul>']
handler.tags = ['internet']
handler.command = /^(anime|animeinfo)$/i
//maapin fatur :<
module.exports = handler
