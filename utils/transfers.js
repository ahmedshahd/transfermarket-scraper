const {
    mapOverSelector,
    toCheerio,
    loadHTML,
    getText,
    getAttr,
} = require('./index')

function getPlayerTransferURL(id) {
    return `https://www.transfermarkt.com/ddd/transfers/spieler/${id}`
}

async function getPlayertransfers(playerId) {
    const injureyUrl = getPlayerInjuriesURL(playerId)
    const html = await loadHTML(injureyUrl)
    const $ = toCheerio(html)

    return mapOverSelector($, '#yw1 > table > tbody > tr', ($ele) => {
        const season = getText($ele, 'td:nth-of-type(1)')
        const date = getText($ele, 'td:nth-of-type(2)')

        const fromDate = getText($ele, 'td:nth-of-type(3)')
        const untilDate = getText($ele, 'td:nth-of-type(4)')

        const gameMissed = getText($ele, 'td:nth-of-type(6)')
        const clubs = $ele
            .find('td:nth-of-type(6) a')
            .map((i, a) => getAttr($(a), 'img', 'alt'))
            .get()

        return {
            season,
            date,
            fromDate,
            untilDate,
            gameMissed,
            clubs,
        }
    })
}

getPlayerInjuries(261988).then(console.log)
