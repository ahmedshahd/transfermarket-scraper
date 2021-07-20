const {
    mapOverSelector,
    toCheerio,
    loadHTML,
    getText,
    getAttr,
} = require('../../utils')

function getPlayerTransferURL(id) {
    return `https://www.transfermarkt.com/ddd/transfers/spieler/${id}`
}

async function getPlayertransfers(playerId) {
    const transferUrl = getPlayerTransferURL(playerId)
    const html = await loadHTML(transferUrl)
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
}

getPlayertransfers(222813).then(console.log)
console.log('here')
