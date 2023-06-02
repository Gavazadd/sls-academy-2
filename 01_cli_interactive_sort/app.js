const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

let mainFunc = async function () {
    try {
        const inputString = await prompt('Hello. Enter 10 words or digits dividing them in spaces: ');
        if (inputString === 'exit'){
            console.log("Good bye! Hope to see you again!")
            rl.close();
        }
        const inputArray = inputString.split(' ');
        const numbersArray = inputArray.filter(Number);
        const wordsArray = inputArray.filter((item) => !numbersArray.includes(item));
        const answer = await prompt(`How would you like to sort values:
        1. Words by name (form A to Z).
        2. Show digits from the smallest.
        3. Show digits from the biggest.
        4. Words by quantity of letters.
        5. Only unique words.
        6. Only unique values from words and numbers.
        Select (1 - 6) and press ENTER:`);

        if (Number(answer) === 1) {
            console.log(wordsArray.sort());
        } else if (Number(answer) === 2) {
            console.log(numbersArray.sort((a, b) => a - b));
        } else if (Number(answer) === 3) {
            console.log(numbersArray.sort((a, b) => b - a));
        } else if (Number(answer) === 4) {
            console.log(wordsArray.sort((a, b) => a.length - b.length));
        } else if (Number(answer) === 5) {
            console.log([...new Set(wordsArray)]);
        } else if (Number(answer) === 6) {
            console.log([...new Set(inputArray)]);
        }else{
            console.log("Selected number isn`t from 1 to 6. Please try again!")
        }
        await mainFunc()
    } catch (e) {
        console.error(e);
    }
};

mainFunc()

rl.on('close', () => process.exit(0));