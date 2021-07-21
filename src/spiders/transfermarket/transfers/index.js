const { applySpec } = require('ramda')
const { getText, mapElements } = require('../../../utils')

const parseTransfer = applySpec({
    season: getText('td:nth-of-type(1)'),
    date: getText('td:nth-of-type(2)'),
    left: getText('td:nth-of-type(5) a'),
    joined: getText('td:nth-of-type(8) a'),
    marketValue: getText('td:nth-of-type(9)'),
    fee: getText('td:nth-of-type(10)'),
})

const getPlayerTransfers = mapElements(parseTransfer, '.zeile-transfer')

module.exports = {
    getPlayerTransfers,
}
