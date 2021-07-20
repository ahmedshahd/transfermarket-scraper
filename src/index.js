const { getPlayertransfers } = require('./spiders/index')
const { getPlayerInjuries } = require('./spiders/index')
const { getPlayerList } = require('./spiders/index')

async function main() {
    // const playersInd = await getPlayerList('IND1', 1)
    const playersAlg = await getPlayerList('ALG1', 4)
    console.log(playersAlg)

    console.log({
        // playersInd: playersInd[0],
        playersAlg: playersAlg.length,
    })
}

main()
