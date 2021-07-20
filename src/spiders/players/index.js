const {
    mapOverSelector,
    toCheerio,
    loadHTML,
    getText,
    getAttr,
} = require('../../utils')

const { createTransfermarket } = require('../../config')

const { getCompetitionURL } = createTransfermarket('http://localhost:5000')

async function getPlayerList(competitionId, page) {
    const url = getCompetitionURL(competitionId, page)
    console.log(url)
    const html = await loadHTML(url)
    const $ = toCheerio(html)

    const list = mapOverSelector($, '#yw1 > .items > tbody > tr', ($ele) => {
        const position = getText($ele, '.inline-table td:nth-of-type(1)')
        const name = getText($ele, '.spielprofil_tooltip')

        const id = getAttr($ele, '.spielprofil_tooltip', 'id')
        const nationatlity = getAttr($ele, '.flaggenrahmen', 'alt')

        const age = getText($ele, 'td:nth-child(5)')
        const appearances = getText($ele, 'td:nth-child(6)')
        const goals = getText($ele, 'td:nth-child(7)')
        const assists = getText($ele, 'td:nth-child(8)')

        return {
            id,
            age,
            name,
            goals,
            assists,
            position,
            appearances,
            nationatlity,
        }
    })

    if (page >= 5) return list // TMP: to test

    const nextPage = getText($('#yw2'), '.page.selected + .page')
    const nextPagePlayers = nextPage
        ? await getPlayerList(competitionId, nextPage)
        : []

    return list.concat(nextPagePlayers)
}
