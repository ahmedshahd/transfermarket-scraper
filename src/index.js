async function main() {
    // const playersInd = await getPlayerList('IND1', 1)
    const playersAlg = await getPlayerList('ALG1', 1)
    console.log(playersAlg)

    console.log({
        // playersInd: playersInd[0],
        playersAlg: playersAlg.length,
    })
}
