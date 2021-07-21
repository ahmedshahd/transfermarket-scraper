const { curry } = require('ramda')
const { mapElements, getText, getAlt, loadDocument } = require('../../../utils')

const parsePlayerInjury = (element) => {
    const season = getText('td:nth-of-type(1)', element)
    const injurey = getText('td:nth-of-type(2)', element)

    const fromDate = getText('td:nth-of-type(3)', element)
    const untilDate = getText('td:nth-of-type(4)', element)

    const gameMissed = getText('td:nth-of-type(6)', element)
    const clubs = mapElements(getAlt('img'), 'td:nth-of-type(6) a', element)

    return {
        season,
        injurey,
        fromDate,
        untilDate,
        gameMissed,
        clubs,
    }
}

const getPlayerInjuries = curry(async (urls, playerId) => {
    const url = urls.playerInjuries(playerId)
    const document = await loadDocument(url)

    return mapElements(parsePlayerInjury, '#yw1 > table > tbody > tr', document)
})

module.exports = {
    getPlayerInjuries,
}
