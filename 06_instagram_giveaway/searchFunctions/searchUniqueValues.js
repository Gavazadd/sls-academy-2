async function uniqueValues(concatWords) {
    let uniqueValues = [...new Set(concatWords)]
    return uniqueValues.length
}

module.exports = {uniqueValues}