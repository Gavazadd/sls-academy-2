const TelegramBot = require('node-telegram-bot-api')
const {weatherMessage} = require('./utils/weatherMessage')

const token = process.env.TELEGRAM_BOT_TOKEN

const bot = new TelegramBot(token, {polling: true})

async function main () {
    try{
        bot.onText(/\/start/, async (msg) => {
            const chatId = msg.chat.id
            await bot.sendMessage(chatId, 'Ласкаво просимо до Weather Forecast Bot! \n' +  'Оберіть ваше місто:', startButton)
        })

        bot.onText(/Погода в Києві/, async (msg) => {
            const chatId = msg.chat.id
            await bot.sendMessage(chatId, 'Оберіть бажаний інтервал:', intervals)
        })

        bot.onText(/Інтервал в 3 години/, async (msg) => {
            const chatId = msg.chat.id
            await bot.sendMessage(chatId, await weatherMessage(3))
        })
        bot.onText(/Інтервал в 6 годин/, async (msg) => {
            const chatId = msg.chat.id
            await bot.sendMessage(chatId, await weatherMessage(6))
        })
    }catch (e){
        console.log(e.message)
    }
}

main()