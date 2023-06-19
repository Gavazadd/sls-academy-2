const axios = require('axios')
const {endpoints} = require('./urls/urls')

async function getData(url, repeatNumber) {
    for (let i = 1; i <= repeatNumber; i++) {
        try {
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            console.log('Can\'t send request for this link. Trying again!')
        }
    }
    return null
}

function findIsDone(data) {
    if (typeof data.isDone === 'boolean') {
        return data.isDone
    }

    if (typeof data === 'object') {
        for (let key in data) {
            if (typeof data[key] === 'object') {
                const result = findIsDone(data[key])
                if (result !== null){
                    return result
                }
            }
        }
    }
    return null
}

async function main() {
    let counterTrue = 0
    let counterFalse = 0

    for (let endpoint of endpoints) {
        const data = await getData(endpoint, 3)
        if (data === null) {
            console.log(`[Fail] ${endpoint}: The endpoint is unavailable`)
            continue
        }
        const result = await findIsDone(data)
        console.log(`[Success] ${endpoint}: isDone - ${result}`)

        if (result) {
            counterTrue++
        } else {
            counterFalse++
        }
    }
    console.log(`Found True values: ${counterTrue} \nFound False values: ${counterFalse}`)
}

main()