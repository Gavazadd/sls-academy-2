const TelegramBot = require('node-telegram-bot-api')
const {buttons} = require('./options/options')
const {privatRates} = require('./rates/findPrivatRates')
const {monoRates} = require('./rates/findMonoRates')

const token = process.env.TELEGRAM_BOT_TOKEN

const bot = new TelegramBot(token, {polling: true})

async function concatRates(currency) {
    return await monoRates(currency) + '\n' + await privatRates(currency)
}
async function main () {
    try {
        bot.onText(/\/start/, async (msg) => {
            const chatId = msg.chat.id
            await bot.sendMessage(chatId, 'Ласкаво просимо до Exchange Rates Bot! \nОберіть потрібну валюту:', buttons)
        })

        bot.onText(/USD/, async (msg) => {
            const chatId = msg.chat.id
            const message = await concatRates('USD')
            await bot.sendMessage(chatId, message, buttons)
        })

        bot.onText(/EUR/, async (msg) => {
            const chatId = msg.chat.id
            const message = await concatRates('EUR')
            await bot.sendMessage(chatId, message, buttons)
        })
    }catch (e) {
        console.log(e.message)
    }
}
main()