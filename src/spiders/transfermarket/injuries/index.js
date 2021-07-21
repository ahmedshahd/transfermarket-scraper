const { curry, applySpec } = require('ramda')
const { mapElements, getText, getAlt, loadDocument } = require('../../../utils')

const parsePlayerInjury = applySpec({
    season: getText('td:nth-of-type(1)'),
    injurey: getText('td:nth-of-type(2)'),
    fromDate: getText('td:nth-of-type(3)'),
    untilDate: getText('td:nth-of-type(4)'),
    gameMissed: getText('td:nth-of-type(6)'),
    clubs: mapElements(getAlt('img'), 'td:nth-of-type(6) a'),
})

const getPlayerInjuries = mapElements(
    parsePlayerInjury,
    '#yw1 > table > tbody > tr'
)

module.exports = {
    getPlayerInjuries,
}
