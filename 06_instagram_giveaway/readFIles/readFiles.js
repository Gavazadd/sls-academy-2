const fs = require('fs')

async function readFiles (fileName) {
    const response = fs.readFileSync(fileName);
    return response.toString().split('\n');
}
module.exports = {readFiles}