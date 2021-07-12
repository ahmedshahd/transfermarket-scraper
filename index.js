const cheerio = require("cheerio")
const puppeteer = require('puppeteer')
const scriptingResults = [{
    name: "ahmed", 
    nationatlity: "egypt",
    games:54,
    goals : 45,
    assists: 5
}]
async function main (){
const browser = await puppeteer.launch({headless:false})
const page = await browser.newPage()
await page.goto("https://www.transfermarkt.com/indian-super-league/scorerliste/wettbewerb/IND1/plus//galerie/0?saison_id=ges&altersklasse=alle")

}
main()