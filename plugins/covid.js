let fetch = require('node-fetch')
let handler = async (m, { args, usedPrefix, command }) => {
    let res = await fetch(global.API('https://covid19.mathdro.id', '/api/countries/'+ (args[0] || '')))
    if (!res.ok) throw await res.text()
        let json = await res.json()
    if (!args[0]) throw `Contoh :\n${usedPrefix}${command} ID\n\n` + json.countries.map((v) => `${v.name} : ${v.iso2} / ${v.iso3}`).join('\n')
  if (json.confirmed) m.reply(`
Countries : ${args[0]}
Confirmed : ${json.confirmed.value}
Recovered : ${json.recovered.value}
Deaths : ${json.deaths.value}
Last Update : ${json.lastUpdate}
\n\n@Fatur`.trim())
  else throw json
}
handler.help = ['covid'].map(v => v + ' <negara>')
handler.tags = ['internet']
handler.command = /^(corona|covid|covid19)$/i
//susu
module.exports = handler
