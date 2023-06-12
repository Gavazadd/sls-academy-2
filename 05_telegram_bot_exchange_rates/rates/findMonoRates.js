const {currencyCodes} = require("../options/options")
const axios = require("axios")
const NodeCache = require("node-cache")
const cache = new NodeCache()

async function monoRates (currency) {
    const rates = cache.get( 'mono-rates')
    if (rates) return findRate(rates, currency)
    const exchangeMono = await axios.get('https://api.monobank.ua/bank/currency')
    cache.set( 'mono-rates', exchangeMono.data, 60)
    return findRate(exchangeMono.data, currency)
}

function findRate(data, currency){
    const rate = data.find(rate => rate.currencyCodeA === currencyCodes[currency] && rate.currencyCodeB === currencyCodes.UAH)
    return `Monobank:\n${currency}: RateBuy ${rate.rateBuy}, RateSell ${rate.rateSell}`
}

module.exports = {monoRates}