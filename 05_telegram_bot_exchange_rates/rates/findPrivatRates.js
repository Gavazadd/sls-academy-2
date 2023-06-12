const axios = require("axios")

async function privatRates (currency) {
    const exchangePrivat = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
    const rate = exchangePrivat.data.find(rate => rate.ccy === currency)

    return `Privatbank:\n${currency}: RateBuy ${rate.buy}, RateSell ${rate.sale}`
}

module.exports={privatRates}