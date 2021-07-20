const cheerio = require('cheerio')
const fetch = require('node-fetch')

const loadHTML = (u) => fetch(u).then((r) => r.text())
const toCheerio = (html) => cheerio.load(html)
const mapOverSelector = ($, selector, fn) => {
    return $(selector)
        .map((i, element) => fn($(element)))
        .get()
}

const getText = ($, selector) => $.find(selector).text()
const getAttr = ($, selector, name) => $.find(selector).attr(name)

module.exports = {
    loadHTML,
    toCheerio,

    getText,
    getAttr,

    mapOverSelector,
}
