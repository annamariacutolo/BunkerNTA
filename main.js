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

// function awaitUser() {
//     while (userDone == false) {

//     }
//     userDone = false;
// }

let player = {
    health: 3,
    inventory: [],
    pName: "",
    currentRoom: "south" // valid: south, east, west, north, central
}
//Intro (runs once)
player.pName = await askQuestion('Who are you?\n');
console.log('Hello ' + player.pName)

rooms:
while (player.health > 0) {
    //Room Loop (can break out of and go to other room)
    while (player.currentRoom = 'south') {
        // when player leaves, break and goto chosen room
        let req = await askQuestion('What would you like to do?\n'); // list options
        // if req contains leave room or central room then goto central room (regex?)

        // Puzzle here

        console.log('In room S')
        player.currentRoom = 'central';
        break;
    };

    //Room loop 2, etc.
    while (player.currentRoom = 'central') {
        // when player leaves, break and goto chosen room
        console.log('In room C')
        break
    };
} // End of rooms

//Closing loop (at least one)

// ------- Room definitions here ------
class Room {
    constructor() {
        this.removable = [];
        this.puzzles = {};
    }
    remove(item) {
        removed = this.removable[item];
        delete this.removable[item];
        return removed
    }
}

function pickUp(item) {
    player.inventory.push(item);
    console.log('Picked up ' + item);
}