const { getPlayerInjuries } = require('./injuries')
const { getPlayerTransfers } = require('./transfers')
const { getCompetitionPlayers } = require('./players')

const createTransfermarket = (baseurl) => {
    const urls = {
        playerTransfers: (id) => `${baseurl}/ddd/transfers/spieler/${id}`,
        playerInjuries: (id) => `${baseurl}/ddd/verletzungen/spieler/${id}`,
        competitionPlayers: (id, page) =>
            `${baseurl}/d/scorerliste/wettbewerb/${id}/saison_id/ges/plus//d/0/page/${page}`,
    }

    return {
        getPlayerInjuries: getPlayerInjuries(urls),
        getPlayerTransfers: getPlayerTransfers(urls),
        getCompetitionPlayers: getCompetitionPlayers(urls),
    }
}

module.exports = {
    createTransfermarket,
}
