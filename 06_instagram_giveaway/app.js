const {uniqueValues} = require('./searchFunctions/searchUniqueValues')
const {existInAllFiles} = require('./searchFunctions/existInAllFiles')
const {existInAtLeastTenFiles} = require('./searchFunctions/existInAtLeastTenFiles')
const {readFiles} = require('./readFIles/readFiles')

async function main(){
    console.time('Full Time')
    let concatArrays = []
    const wordsCollection = new Map()

    for (let i = 0; i <= 19; i++) {
        const wordsArray = await readFiles(`./2kk_words_400x400/out${i}.txt`)
        concatArrays = concatArrays.concat(wordsArray)
        let uniqueValuesInFile = new Set(wordsArray)

        for (let word of uniqueValuesInFile) {
            if (!wordsCollection.has(word)) {
                wordsCollection.set(word, 1)
            } else {
                wordsCollection.set(word, wordsCollection.get(word)+1)
            }
        }
    }

    const numberUniqueValues= await uniqueValues(concatArrays)
    const numberExistInAllFiles = await existInAllFiles(wordsCollection)
    const numberExistInAtLeastTenFiles = await existInAtLeastTenFiles(wordsCollection)

    console.log(`${numberUniqueValues} - unique usernames there are in all the specified files. 
${numberExistInAllFiles} - usernames occur in all 20 files.
${numberExistInAtLeastTenFiles} - usernames occur in at least 10 files.`)
    console.timeEnd('Full Time')
}

main()