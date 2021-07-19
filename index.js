const {
    mapOverSelector,
    toCheerio,
    loadHTML,
    getText,
    getAttr,
} = require('./utils')

const getCompetitionURL = (id, page) =>
    `https://www.transfermarkt.com/d/scorerliste/wettbewerb/${id}/saison_id/ges/plus//d/0/page/${page}`

async function getPlayerList(competitionId, page) {
    const url = getCompetitionURL(competitionId, page)
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

    if (page >= 1) return list // TMP: to test

    const nextPage = getText($('#yw2'), '.page.selected + .page')
    const nextPagePlayers = nextPage
        ? await getPlayerList(competitionId, nextPage)
        : []

    return list.concat(nextPagePlayers)
}

async function main() {
    // const playersInd = await getPlayerList('IND1', 1)
    const playersAlg = await getPlayerList('ALG1', 1)

    console.log({
        // playersInd: playersInd[0],
        playersAlg: playersAlg.length,
    })
}

main()
