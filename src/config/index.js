const createTransfermarket = (baseurl) => {
    return {
        getCompetitionURL(id, page) {
            return `${baseurl}/d/scorerliste/wettbewerb/${id}/saison_id/ges/plus//d/0/page/${page}`
        },
    }
}

module.exports = {
    createTransfermarket,
}
