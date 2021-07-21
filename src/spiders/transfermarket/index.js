const { scrapeFn } = require('../../utils')
const { getPlayerInjuries } = require('./injuries')
const { getPlayerTransfers } = require('./transfers')
const { getCompetitionPlayers } = require('./players')

const getUrls = (baseurl) => ({
    playerInjuries: (id) => `${baseurl}/ddd/verletzungen/spieler/${id}`,
    playerTransfers: (id) => `${baseurl}/ddd/transfers/spieler/${id}`,
    competitionPlayers: (id, page) =>
        `${baseurl}/d/scorerliste/wettbewerb/${id}/saison_id/ges/plus//d/0/page/${page}`,
})

const createTransfermarket = ({ baseurl }) => {
    const urls = getUrls(baseurl)

    return {
        player: {
            injuries: scrapeFn(urls.playerInjuries, getPlayerInjuries),
            transfers: scrapeFn(urls.playerTransfers, getPlayerTransfers),
            listByCompetition: scrapeFn(
                urls.competitionPlayers,
                getCompetitionPlayers
            ),
        },
    }
}

module.exports = {
    createTransfermarket,
}
