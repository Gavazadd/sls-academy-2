module.exports = {
    startButton: {
        reply_markup: {
            keyboard: [['Погода в Києві']],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    },
    intervals: {
        reply_markup: {
            keyboard: [['Інтервал в 3 години'], ['Інтервал в 6 годин']],
            resize_keyboard: true,
            one_time_keyboard: true,
        }
    },
    optionsDate: {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    },
    optionsTime: {
        hour: 'numeric',
        minute: 'numeric',
    }
}