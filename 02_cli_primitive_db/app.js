import fs from "fs"
import inquirer from "inquirer"

let dataPath = "users.txt"

async function createUser (){
    const userName = await inquirer.prompt(
        [
            {
                type: "input",
                name: "name",
                message: "Enter the user's name. To cancel press ENTER:",
            },
        ]
    )
    if (!userName.name) {
        await searchUser()
        return
    }
    const userGenderAndAge = await inquirer.prompt([
        {
            name: 'gender',
            message: "Choose your gender: ",
            type: "list",
            choices: ["male", "female"]
        },
        {
            name: "age",
            message: "Enter your age: ",
            type: "number",
        }

    ])

    const user = {
        name: userName.name,
        gender: userGenderAndAge.gender,
        age: userGenderAndAge.age
    }

    await addUser(user)
    await createUser()
}

async function addUser(user) {
    const userString = JSON.stringify(user);
    fs.appendFileSync(dataPath, userString + '\n');
}


async function searchUser() {
    const answer = await inquirer.prompt([
        {
            name: 'search',
            message: "Would you like to search values in DB?: ",
            type: "confirm",
        }
    ])

    if (!answer.search) return

    const users = fs.readFileSync(dataPath, 'utf8').split('\n');
    const usersArray = users.filter(user => user !== '').map(user => JSON.parse(user));
    console.log(usersArray);

    const input = await inquirer.prompt([
        {
            name: 'name',
            message: "Enter user's name you wanna find in DB: ",
            type: "input",
        }
    ])
    const findName = input.name.toLowerCase()
    const foundUsers = usersArray.filter(user => user.name.toLowerCase() === findName)
    if (foundUsers.length > 0) {
        console.log(`User ${input.name} was found in the database for ${foundUsers.length} times.`)
        for (let user of foundUsers){
            console.log(user)
        }
    } else {
        console.log(`Users didn't  find!`)
    }
}


createUser()