const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

(async function () {

    try {

        const base = 'https://www.cermati.com/artikel';
        const mainHTML = await request(base);
        const $ = cheerio.load(mainHTML);

        const links = $('.article-list-item').map((index, section) => {
            const $button = $(section).find('a').replaceWith('/artikel')
            let url = $button.attr('href')
            return base + url.replace("/artikel", "");
        }).get();

        let batchArray = []
        await Promise.all(links.map(async (link) => {
            try {
                

                const expertHtml = await request(link);
                const $ = cheerio.load(expertHtml);

                const title = $('.post-title');
                const names = title.map((i, post) => {
                    return $(post).text();
                }).get();

                const author = $('.author-name');
                const nameAurhor = author.map((i, post) => {
                    return $(post).text().trim();
                }).get();

                const postDate = $('.post-date');
                const dateTime = postDate.map((i, post) => {
                    return $(post).text().trim()
                }).get();

                // console.log($('.panel-items-list'))
                const links1 = $('.panel-items-list').map((index, section) => {
                    const $button = $(section).find('li > a')
                    let url1 = $button.attr('href')
                    
                    const $buttun2 = $(section).find('li > a > h5').text()
                    
                    let data = {
                        url: base + url1.replace("/artikel", ""),
                        title: $buttun2
                    }
                    return data 
                }).get();
                
                batchArray.push({
                    url: link,
                    title: names[0],
                    author: nameAurhor[0],
                    postDate: dateTime[0],
                    relatedArticles: links1
                    
                })
            }catch (e){

            }
        }));

        fs.writeFile("output.json", JSON.stringify(batchArray,null,4), function(err){
            console.log("File Succesfully Created");
        })

    }catch (e) {
        console.log('our error', e);
    }

})();