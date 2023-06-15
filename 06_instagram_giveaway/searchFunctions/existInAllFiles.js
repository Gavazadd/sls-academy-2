async function existInAllFiles(wordsCollection) {
    let count = 0

    for (let value of wordsCollection.values()) {
        if (value === 20) {
            count++
        }
    }
    return count
}

module.exports = {existInAllFiles}