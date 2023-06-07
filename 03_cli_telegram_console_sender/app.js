const { program } = require('commander')
const telegramApi = require('node-telegram-bot-api')

process.env["NTBA_FIX_350"] = 1
const token = process.env.TELEGRAM_BOT_TOKEN
const chatId = process.env.TELEGRAM_CHAT_ID

const bot = new telegramApi(token, {polling:true})

program
    .version("0.0.1")

program
    .command('send-message')
    .alias('m')
    .description('Send message to Telegram bot')
    .argument('<message>', 'Message')
    .action(async (message) => {
         await bot.sendMessage(chatId, message)
         console.log('Message sent successfully')
         process.exit(0)
    })

program
    .command('send-photo')
    .alias('p')
    .description('Send photo to Telegram Bot. Just drag and drop it console after p-flag')
    .argument('<path>', 'Path')
    .action(async (path) => {
            await bot.sendPhoto(chatId, path)
            console.log('You successfully sent photo to your Bot')
            process.exit(1)
        }
    )

program.parse(process.argv)