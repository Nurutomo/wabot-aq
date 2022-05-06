//created by SafwanGanz
//gitHub.com/SafwanGanz
let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
let res = await fetch(`https://api-xcoders.xyz/api/tools/coinmarket?apikey=hP5VgEKEpL`)
let anu = await res.json()
if (!res.ok) throw '404 Error!'
if (/^.*bitcoin/i.test(m.text)) {
m.reply(`
*Name:* ${anu.result[0].name}
*Price:* ${anu.result[0].price}
*MarketCap:* ${anu.result[0].marketCap}
*Volume:* ${anu.result[0].volume}
*CirculatingSupply:* ${anu.result[0].circulatingSupply}
`)
}
if (/^.*ethereum/i.test(m.text)) {
m.reply(`
*Name:* ${anu.result[1].name}
*Price:* ${anu.result[1].price}
*MarketCap:* ${anu.result[1].marketCap}
*Volume:* ${anu.result[1].volume}
*CirculatingSupply:* ${anu.result[1].circulatingSupply}
`)
}
if (/^.*tether/i.test(m.text)) {
m.reply(`
*Name:* ${anu.result[2].name}
*Price:* ${anu.result[2].price}
*MarketCap:* ${anu.result[2].marketCap}
*Volume:* ${anu.result[2].volume}
*CirculatingSupply:* ${anu.result[2].circulatingSupply}
`)
}
if (/^.*bnb/i.test(m.text)) {
m.reply(`
*Name:* ${anu.result[3].name}
*Price:* ${anu.result[3].price}
*MarketCap:* ${anu.result[3].marketCap}
*Volume:* ${anu.result[3].volume}
*CirculatingSupply:* ${anu.result[3].circulatingSupply}
`)
}
if (/^.*usdcoin/i.test(m.text)) {
m.reply(`
*Name:* ${anu.result[4].name}
*Price:* ${anu.result[4].price}
*MarketCap:* ${anu.result[4].marketCap}
*Volume:* ${anu.result[4].volume}
*CirculatingSupply:* ${anu.result[4].circulatingSupply}
`)
}
if (/^.*xrp/i.test(m.text)) {
m.reply(`
*Name:* ${anu.result[5].name}
*Price:* ${anu.result[5].price}
*MarketCap:* ${anu.result[5].marketCap}
*Volume:* ${anu.result[5].volume}
*CirculatingSupply:* ${anu.result[5].circulatingSupply}
`)
}
if (/^.*cardano/i.test(m.text)) {
m.reply(`
*Name:* ${anu.result[6].name}
*Price:* ${anu.result[6].price}
*MarketCap:* ${anu.result[6].marketCap}
*Volume:* ${anu.result[6].volume}
*CirculatingSupply:* ${anu.result[6].circulatingSupply}
`)
}
if (/^.*solana/i.test(m.text)) {
m.reply(`
*Name:* ${anu.result[7].name}
*Price:* ${anu.result[7].price}
*MarketCap:* ${anu.result[7].marketCap}
*Volume:* ${anu.result[7].volume}
*CirculatingSupply:* ${anu.result[7].circulatingSupply}
`)
}
if (/^.*avalanche/i.test(m.text)) {
m.reply(`
*Name:* ${anu.result[8].name}
*Price:* ${anu.result[8].price}
*MarketCap:* ${anu.result[8].marketCap}
*Volume:* ${anu.result[8].volume}
*CirculatingSupply:* ${anu.result[8].circulatingSupply}
`)
}
if (/^.*terra/i.test(m.text)) {
m.reply(`
*Name:* ${anu.result[9].name}
*Price:* ${anu.result[9].price}
*MarketCap:* ${anu.result[9].marketCap}
*Volume:* ${anu.result[9].volume}
*CirculatingSupply:* ${anu.result[9].circulatingSupply}
`)
}
}
handler.command = /^bitcoin|ethereum|tether|bnb|usdcoin|xrp|cardano|solana|avalanche|terra$/i
module.exports = handler
