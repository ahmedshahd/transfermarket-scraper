const { applySpec } = require('ramda')
const { getText, getAttr, getAlt, mapElements } = require('../../../utils')

const parseCompetitionPlayer = applySpec({
    position: getText('.inline-table td:nth-of-type(1)'),
    name: getText('.spielprofil_tooltip'),

    id: getAttr('id', '.spielprofil_tooltip'),
    nationatlity: getAlt('.flaggenrahmen'),

    age: getText('td:nth-child(5)'),
    appearances: getText('td:nth-child(6)'),
    goals: getText('td:nth-child(7)'),
    assists: getText('td:nth-child(8)'),
})

const getCompetitionPlayers = mapElements(
    parseCompetitionPlayer,
    '#yw1 > .items > tbody > tr'
)

// if (page >= 5) return list // TMP: to test

// const nextPage = getText('.page.selected + .page', document)
// const nextPagePlayers = nextPage
//     ? await getCompetitionPlayers(urls, competitionId, nextPage)
//     : []

// return list.concat(nextPagePlayers)

module.exports = {
    getCompetitionPlayers,
}
