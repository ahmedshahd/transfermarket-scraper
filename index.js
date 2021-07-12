const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
const scriptingResults = [
    {
        name: 'ahmed',
        position: 'winger',
        id: 54444,
        url: '/coro/profil/spieler/15790',
        nationatlity: 'egypt',
        games: 54,
        goals: 45,
        assists: 5,
    },
]
async function main() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto(
        'https://www.transfermarkt.com/indian-super-league/scorerliste/wettbewerb/IND1/plus//galerie/0?saison_id=ges&altersklasse=alle'
    )
    const html = await page.content()
    const $ = cheerio.load(html)
    const results = $('#yw1 > table > tbody > tr')
        .map((index, element) => {
            const name = $(element)
                .children()
                .find('.inline-table')
                .children()
                .find('td:nth-of-type(2)')
                .text()
            const position = $(element)
                .children()
                .find('.inline-table')
                .children()
                .find('td:nth-of-type(1)')
                .text()
            const id = $(element)
                .children()
                .find('.spielprofil_tooltip')
                .attr('id')
            const url = `https://www.transfermarkt.com${$(element)
                .children()
                .find('.spielprofil_tooltip')
                .attr('href')} `
            const nationatlity = $(element)
                .children()
                .find('.flaggenrahmen')
                .attr('alt')
            const age = $(element).children('td:nth-child(5)').text()
            const appearances = $(element).children('td:nth-child(6)').text()
            const goals = $(element).children('td:nth-child(7)').text()
            const assists = $(element).children('td:nth-child(8)').text()
            return {
                name,
                position,
                id,
                url,
                nationatlity,
                age,
                appearances,
                goals,
                assists,
            }
        })
        .get()

    console.log(results)
}

main()
