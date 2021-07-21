const { curry } = require('ramda')
const {
    mapOverSelector,
    toCheerio,
    loadHTML,
    getText,
} = require('../../../utils')

const getPlayerTransfers = curry(async (urls, playerId) => {
    const url = urls.playerTransfers(playerId)
    const html = await loadHTML(url)
    const $ = toCheerio(html)

    return mapOverSelector($, ' .zeile-transfer', ($ele) => {
        const season = getText($ele, 'td:nth-of-type(1)')
        const date = getText($ele, 'td:nth-of-type(2)')

        const left = getText($ele, 'td:nth-of-type(5) a')
        const joined = getText($ele, 'td:nth-of-type(8) a')

        const marketValue = getText($ele, 'td:nth-of-type(9)')
        const fee = getText($ele, 'td:nth-of-type(10)')

        return {
            season,
            date,
            left,
            joined,
            marketValue,
            fee,
        }
    })
})

module.exports = {
    getPlayerTransfers,
}
