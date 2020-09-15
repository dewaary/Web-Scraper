const request = require("request-promise")
const cheerio = require("cheerio")
const fs = require(fs)
const json2csv = require("json2csv").Parser;

const articles = "https://www.cermati.com/artikel"

(async() => {
    let artikelData = []
    const response = await request({
        uri: artikel,
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.5"
        },

    })

})()