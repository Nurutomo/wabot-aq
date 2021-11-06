const fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {
  let res 
  if (text) res = await fetch(
    global.API("https://wall.alphacoders.com/api2.0", "/get.php", {
      auth: "3e7756c85df54b78f934a284c11abe4e",
      method: "search",
      term: text,
    })
  )
    else res = await fetch(
    global.API("https://wall.alphacoders.com/api2.0", "/get.php", {
      auth: "3e7756c85df54b78f934a284c11abe4e",
      method: "latest",
    })
  )

  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.wallpapers) throw json
  let img = json.wallpapers[Math.floor(Math.random() * json.wallpapers.length)];
  await conn.sendFile(m.chat, img.url_image, text + `.${img.file_type}`, img.url_page, m);
};
handler.help = ["wallpaperq"];
handler.tags = ["tools"];
handler.command = /^wall(paper)?q?$/i;
handler.limit = true;

module.exports = handler;
