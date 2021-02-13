let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

function post(url, formdata) {
    return fetch(url, {
        method: 'POST',
        headers: {
            accept: "*/*",
            'accept-language': "en-US,en;q=0.9",
            'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: new URLSearchParams(Object.entries(formdata))
    })
}
const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
function yt(url, index, type, bitrate, server = 'id4') {
    return new Promise((resolve, reject) => {
        if (ytIdRegex.test(url)) {
            let ytId = ytIdRegex.exec(url)
            url = 'https://youtu.be/' + ytId[1]
            post(`https://www.y2mate.com/mates/${server}/analyze/ajax`, {
                url,
                q_auto: 0,
                ajax: 1
            })
                .then(res => res.json())
                .then(res => {
                    let { document } = (new JSDOM(res.result)).window
                    yaha = document.querySelectorAll('td')
                    filesize = yaha[yaha.length - index].innerHTML
                    id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ['', '']
                    thumb = document.querySelector('img').src
                    title = document.querySelector('b').innerHTML

                    post(`https://www.y2mate.com/mates/${server}/convert`, {
                        type: 'youtube',
                        _id: id[1],
                        v_id: ytId[1],
                        ajax: '1',
                        token: '',
                        ftype: type,
                        fquality: bitrate
                    })
                        .then(res => res.json())
                        .then(res => {
                            let KB = parseFloat(filesize) * (1000 * /MB$/.test(filesize))
                            resolve({
                                dl_link: /<a.+?href="(.+?)"/.exec(res.result)[1],
                                thumb,
                                title,
                                filesizeF: filesize,
                                filesize: KB
                            })
                        }).catch(reject)
                }).catch(reject)
        } else reject('URL INVALID')
    })
}

module.exports = {
  yt,
  yta(url, server = 'id4') { return yt(url, 10, 'mp3', '128', server) },
  ytv(url, server = 'id4') { return yt(url, 23, 'mp4', '360', server) },
  servers: ['id4', 'en60']
}
