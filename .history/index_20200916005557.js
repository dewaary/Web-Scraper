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
        gzip: true,
    });

    let $ = cheerio.load(response)
    let title = $('h1[class="post-title"]').text()
    let author = $('span[class="author-name"]').text().trim()
    let postingDate = $('span[class="post-date"]').text().trim()
    let relatedArticles = $('div[class="side-list-panel"]').text().trim()

    articles.push({
        title,
        author,
        postingDate,
        relatedArticles,
    });

})()