'use strict'

import readline from 'readline';
const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let player = {
        health: 3,
        inventory: [],
        pName: ""
    }
    //Intro (runs once)
readLine.question('Who are you?', myName => {
    player.pName = myName;
    readLine.close();
});
console.log('Hello ' + player.pName)


//Room Loop (can break out of and go to other room)

//Room loop 2, etc.

//Closing loop (at least one)