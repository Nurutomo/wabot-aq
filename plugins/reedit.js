const puppeteer = require("puppeteer")


let handler = async (m, {
    conn,
    args
}) => {
    try {
        if (!args[0]) throw 'Uhm...url nya mana?'
        console.log(args[0])
        reedit(args[0])
		.then(async(res) => {
        caption = JSON.stringify(res.data)/
        await conn.sendFile(m.chat, res.thumb, 'redt.jpeg', caption, m)
        await conn.sendFile(m.chat, res.videoUrl, 'redt.mp4', res.tittle, m) 
		})
    } catch (e) {
        throw e
    }
}
handler.help = ['reedit'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ree(dit)?(dl)?)$/i



async function reedit(link) {
	try {
    let result;
    const URL = 'https://redditsave.com/'
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    await page.goto(URL, {
            delay: 500
        })
        .then(async () => {
            await page.type("#url", `${link}`);
            await page.waitForSelector("#download");
            await page.click('#download', {
                delay: 500
            });
            await page.waitForSelector('body > div.container > div:nth-child(3) > div.col-md-8.col-md-offset-2.card > h2')
            let tittle = await (await (await page.$('body > div.container > div:nth-child(3) > div.col-md-8.col-md-offset-2.card > h2')).getProperty('innerHTML')).jsonValue();
            await page.waitForSelector('body > div.container > div:nth-child(3) > div.col-md-8.col-md-offset-2.card > div:nth-child(3) > img')
            let thumbail = await page.$eval('body > div.container > div:nth-child(3) > div.col-md-8.col-md-offset-2.card > div:nth-child(3)> img[src]', node => node.src)
            let videoUrl = await page.$eval('body > div.container > div:nth-child(3) > div.col-md-8.col-md-offset-2.card > div:nth-child(4) > table:nth-child(4) > tbody > tr > td:nth-child(1) > div > a', async (element) => {
                return element.getAttribute("href")
            })
            const data = await page.evaluate(() => {
                const dataObject = {};
                const tbody = document.querySelector('table tbody');

                for (const row of tbody.rows) {
                    if (!row.querySelector('td')) continue;

                    const [keyCell, valueCell] = row.cells;
                    dataObject[keyCell.innerText] = valueCell.innerText;
                }
                return dataObject;
            });
            result = {
                videoUrl: videoUrl,
                tittle: tittle.trim,
                thumb: thumbail,
                data: data
            }
        })
    console.log(result)
    return result

	} catch(e) {
		throw e
	}
}



module.exports = handler