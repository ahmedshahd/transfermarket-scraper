const { JSDOM } = require('jsdom')
const { curry, map } = require('ramda')
const {
    getText,
    getAttr,
    getAlt,
    mapElements,
    loadDocument,
} = require('../../../utils')

const parseCompetitionPlayer = (element) => {
    const position = getText('.inline-table td:nth-of-type(1)', element)
    const name = getText('.spielprofil_tooltip', element)

    const id = getAttr('id', '.spielprofil_tooltip', element)
    const nationatlity = getAlt('.flaggenrahmen', element)

    const age = getText('td:nth-child(5)', element)
    const appearances = getText('td:nth-child(6)', element)
    const goals = getText('td:nth-child(7)', element)
    const assists = getText('td:nth-child(8)', element)

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
}

const getCompetitionPlayers = curry(async (urls, competitionId, page) => {
    const url = urls.competitionPlayers(competitionId, page)
    const document = await loadDocument(url)

    const list = mapElements(
        parseCompetitionPlayer,
        '#yw1 > .items > tbody > tr',
        document
    )

    if (page >= 5) return list // TMP: to test

    const nextPage = getText('.page.selected + .page', document)
    const nextPagePlayers = nextPage
        ? await getCompetitionPlayers(urls, competitionId, nextPage)
        : []

    return list.concat(nextPagePlayers)
})

module.exports = {
    getCompetitionPlayers,
}
