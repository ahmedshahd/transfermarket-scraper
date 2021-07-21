const { JSDOM } = require('jsdom')
const { map, path, curry } = require('ramda')

const loadDocument = (u) => JSDOM.fromURL(u).then(path(['window', 'document']))
const getText = curry((s, e) => e.querySelector(s).textContent)
const getAttr = curry((name, s, e) => e.querySelector(s).getAttribute(name))
const mapElements = curry((fn, s, e) => map(fn, e.querySelectorAll(s)))

const getAlt = getAttr('alt')

module.exports = {
    loadDocument,

    getText,
    getAttr,
    getAlt,
    mapElements,
}
