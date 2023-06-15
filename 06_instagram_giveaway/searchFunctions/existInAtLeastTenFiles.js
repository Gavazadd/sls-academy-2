async function existInAtLeastTenFiles(wordsCollection) {
    let count = 0

    for (let value of wordsCollection.values()) {
        if (value >= 10) {
            count++
        }
    }
    return count
}
module.exports = {existInAtLeastTenFiles}