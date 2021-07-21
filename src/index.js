const { map, pluck } = require('ramda')
const { createTransfermarket } = require('./spiders/transfermarket')

async function main() {
    const { player } = createTransfermarket({
        // baseurl: 'http://localhost:5000',
        baseurl: 'https://www.transfermarkt.com',
    })

    const players = await player.listByCompetition('ALG1', 4)
    const playersId = pluck('id', players)

    const playersInjuries = await Promise.all(map(player.injuries, playersId))
    const playerTransfers = await Promise.all(map(player.transfers, playersId))

    return { players, playersInjuries, playerTransfers }
}

main().then(console.log)
