const axios = require('axios')

async function fetchData() {
    try {
        const result = []
        const data = (await axios.get('https://jsonbase.com/sls-team/vacations')).data
        data.forEach(developer => {
            const existingDeveloper = result.find(item => item.userId === developer.user._id)
            if (existingDeveloper) {
                existingDeveloper.vacations.push({
                    endDate: developer.endDate,
                    startDate: developer.startDate
                })
            } else {
                const formatDeveloper = {
                    userId: developer.user._id,
                    userName: developer.user.name,
                    vacations: [
                        {
                            startDate: developer.startDate,
                            endDate: developer.endDate,
                        }
                    ],
                }
                result.push(formatDeveloper)
            }
        })
        console.log(JSON.stringify(result, null, 2))
    } catch (e) {
        console.error(e.message)
    }
}

fetchData()