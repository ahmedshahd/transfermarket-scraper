const { JSDOM } = require('jsdom')
const { map, path, curry, pipe, andThen, prop, invoker } = require('ramda')

const loadDocument = (u) => JSDOM.fromURL(u).then(path(['window', 'document']))

const select = invoker(1, 'querySelector')
const selectAll = invoker(1, 'querySelectorAll')
const attr = invoker(1, 'getAttribute')
const text = prop('textContent')

const getText = curry(pipe(select, text))
const getAttr = curry((name, s, e) => attr(name, select(s, e)))
const mapElements = curry((fn, s, e) => map(fn, selectAll(s, e)))

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
