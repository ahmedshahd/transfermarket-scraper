const { curry } = require('ramda')
const {
    mapOverSelector,
    toCheerio,
    loadHTML,
    getText,
    loadDocument,
    mapElements,
} = require('../../../utils')

const parseTransfer = (element) => {
    const season = getText('td:nth-of-type(1)', element)
    const date = getText('td:nth-of-type(2)', element)

    const left = getText('td:nth-of-type(5) a', element)
    const joined = getText('td:nth-of-type(8) a', element)

    const marketValue = getText('td:nth-of-type(9)', element)
    const fee = getText('td:nth-of-type(10)', element)

    return {
        season,
        date,
        left,
        joined,
        marketValue,
        fee,
    }
}

const getPlayerTransfers = curry(async (urls, playerId) => {
    const url = urls.playerTransfers(playerId)
    const document = await loadDocument(url)

    return mapElements(parseTransfer, '.zeile-transfer', document)
})

module.exports = {
    getPlayerTransfers,
}
