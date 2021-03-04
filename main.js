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

let player = {
    health: 3,
    inventory: [],
    pName: "",
    currentRoom: "south" // valid: south, east, west, north, central
}

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
// ------------------------------------

function pickUp(item) {
    player.inventory.push(item);
    console.log('Picked up ' + item);
}

let roomC = new Room();

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

        player.currentRoom = 'central';
        break;
    };

    //Room loop 2, etc.
    centralLoop:
    while (player.currentRoom = 'central') {
        // when player leaves, break and goto chosen room
        console.log(
        `You enter the central atrium. The soft light from the emergency lights provides barely adequate visibility.
There's a stairwell in the centre looks like it leads up to the surface above.
You see that there are four doors leading to rooms labelled north to south.
Your living quarters appear to have been in the south room.`)
        let req = await askQuestion(`What would you like to do?
    1) Go to the west room
    2) Go to the north room
    3) Go to the east room
    4) Go to the south room
    5) Go up the stairwell
    6) Examine the room
        `);
        switch (req[0]) {
            case 1: {
                player.currentRoom = 'west';
                break centralLoop;
            }
            case 2: {
                player.currentRoom = 'north';
                break centralLoop;
            }
            case 3: {
                player.currentRoom = 'east';
                break centralLoop;
            }
            case 4: {
                player.currentRoom = 'south';
                break centralLoop;
            }
            case 5: {
                // Go to stairwell
            }
            case 6: {
                // Go to examine room
            }
            default:
                break;
        }


        break rooms; //debug
    };
} // End of rooms

//Closing loop (at least one)

