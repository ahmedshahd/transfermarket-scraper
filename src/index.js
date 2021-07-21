const { createTransfermarket } = require('./spiders/transfermarket')

async function main() {
    // const transfermarket = createTransfermarket('http://localhost:5000')
    const transfermarket = createTransfermarket('https://www.transfermarkt.com')

    // transfermarket.getCompetitionPlayers('ALG1', 4).then(console.log)
    // transfermarket.getPlayerInjuries(261988).then(console.log)
    // transfermarket.getPlayerTransfers(261988).then(console.log)
}

main()
