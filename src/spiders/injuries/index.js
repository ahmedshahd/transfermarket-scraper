const {
    mapOverSelector,
    toCheerio,
    loadHTML,
    getText,
    getAttr,
} = require('../../utils')

function getPlayerInjuriesURL(id) {
    return `https://www.transfermarkt.com/ddd/verletzungen/spieler/${id}`
}

async function getPlayerInjuries(playerId) {
    const injureyUrl = getPlayerInjuriesURL(playerId)
    const html = await loadHTML(injureyUrl)
    const $ = toCheerio(html)

    return mapOverSelector($, '#yw1 > table > tbody > tr', ($ele) => {
        const season = getText($ele, 'td:nth-of-type(1)')
        const injurey = getText($ele, 'td:nth-of-type(2)')

        const fromDate = getText($ele, 'td:nth-of-type(3)')
        const untilDate = getText($ele, 'td:nth-of-type(4)')

        const gameMissed = getText($ele, 'td:nth-of-type(6)')
        const clubs = $ele
            .find('td:nth-of-type(6) a')
            .map((i, a) => getAttr($(a), 'img', 'alt'))
            .get()

        return {
            season,
            injurey,
            fromDate,
            untilDate,
            gameMissed,
            clubs,
        }
    })
}
module.exports = {
    getPlayerInjuries,
}

getPlayerInjuries(261988).then(console.log)
