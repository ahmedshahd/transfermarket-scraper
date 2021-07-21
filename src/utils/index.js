const { JSDOM } = require('jsdom')
const { map, path, curry, pipe, andThen } = require('ramda')

const loadDocument = (u) => JSDOM.fromURL(u).then(path(['window', 'document']))
const getText = curry((s, e) => e.querySelector(s).textContent)
const getAttr = curry((name, s, e) => e.querySelector(s).getAttribute(name))
const mapElements = curry((fn, s, e) => map(fn, e.querySelectorAll(s)))

const getAlt = getAttr('alt')
const scrapeFn = (urlFn, getFn) => pipe(urlFn, loadDocument, andThen(getFn))

module.exports = {
    scrapeFn,
    loadDocument,
    getText,
    getAttr,
    getAlt,
    mapElements,
}
