'use strict'

import readline from 'readline';
function askQuestion(query) {
    const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => readLine.question(query, ans => {
        readLine.close();
        resolve(ans);
    }))
}

var userDone = false;

// function awaitUser() {
//     while (userDone == false) {

//     }
//     userDone = false;
// }

let player = {
    health: 3,
    inventory: [],
    pName: ""
}
//Intro (runs once)
player.pName = askQuestion('Who are you?\n');
console.log('Hello ')

//Room Loop (can break out of and go to other room)

//Room loop 2, etc.

//Closing loop (at least one)