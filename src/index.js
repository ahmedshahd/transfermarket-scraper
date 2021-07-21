const { createTransfermarket } = require('./spiders/transfermarket')

async function main() {
    const { player } = createTransfermarket({
        // baseurl: 'http://localhost:5000',
        baseurl: 'https://www.transfermarkt.com',
    })

    player.listByCompetition('ALG1', 4).then(console.log)
    player.injuries(261988).then(console.log)
    player.transfers(261988).then(console.log)
}

main()
