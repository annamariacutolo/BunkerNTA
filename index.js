" use strict"

import readline from 'readline';

class Room {
    constructor(name, flavText, locked) {
        this.name = name;
        this.flavText = flavText;
        this.locked = locked;
    }
    setAdjoined(adjoined) {
        this.adjoined = adjoined;
    }
    setContents(items) {
        this.items = items;
    }
    setActivities(activity) {
        this.activity = activity;
    }
}

class Item {
    constructor(name, action) {
        this.name = name;
        this.action = action;
    }
}

class Activity {
    constructor(name, action) {
        this.name = name;
        this.action = action;
    }
}


let roomSouth = new Room("South", 
"This is flavour text for S room", 
["wardrobe", "desk", "door", "bed"],
false
)

let roomCentral = new Room("Central",
"This is flavour text for C room",
["wardrobe", "desk", "door", "bed"],
false
)

let roomNorth = new Room("North",
"This is flavour text for N room",
["wardrobe", "desk", "door", "bed"],
true
)

let roomEast = new Room("East",
"This is flavour text for E room",
["wardrobe", "desk", "door", "bed"],
false
)

let roomWest = new Room("West",
"This is flavour text for W room",
["wardrobe", "desk", "door", "bed"],
false
)

roomCentral.setAdjoined({
    "north" : roomNorth,
    "east" : roomEast,
    "south" : roomSouth,
    "west" : roomWest
})
roomNorth.setAdjoined({
    "south" : roomCentral
})
roomEast.setAdjoined({
    "west" : roomCentral
})
roomSouth.setAdjoined({
    "north" : roomCentral
})
roomWest.setAdjoined({
    "east" : roomCentral
})

// -------------------------------------------

//                          args    function of the item
let book = new Item("book", () => {console.log("This is the book contents.")})

// need const obj "allItems" to pickup easier
const allItems = {
    "book" : book
}

roomWest.setContents(["book"]);

// -------------------------------------------

let wardrobe = new Activity("wardrobe", () => {console.log("Yes, it is a wardrobe")})
let picture = new Activity("picture", () => {})

const allActivities = {
    "wardrobe" : wardrobe,
}

roomSouth.setActivities(["wardrobe"]);
roomWest.setActivities(["picture"]);

// -------------------------------------------

class Player {
    constructor() {
        this.bag = [];
        this.hp = 5;
        this.position = roomSouth
    }
    setName(name) {
        this.name = name
    }
}

const player = new Player()

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

function move(movement) {
    const newRoom = player.position.adjoined[movement]
    if (!newRoom) { 
        console.log("That is an invalid direction.")
        return false 
        }
    //below don't need the "=== true"
    if (newRoom.locked === true) { 
        console.log("The door is locked.")
        return false 
        }
    player.position = newRoom
    return true
    }

function take(item) {
    if (!player.position.items.includes(item)) {
        console.log("That item is not in this room.")
        return false 
        }
    // if (allActivities[item]) {
    //     console.log("That item is too big to fit in your pockets!")
    //     return false
    // }
    player.bag.push(item)
    removeArrayByValue(player.position.items, item)
    console.log("\x1b[33m%s\x1b[0m", "You have moved the "+allItems[item].name+" to your bag.")
    return true    
}

function removeArrayByValue(array, value) {
    for(var i = 0; i < array.length; i++) {
        if ( array[i] === value) { 
            array.splice(i, 1); 
            //this 1 refers to 1 element which is removed
        }
    }
    return array
}


// function to use Item
//      if item in bag
//      run item action (allItems[item].action())

function use(item) {
    if (!player.bag.includes(item)) {
        console.log("That item is not in your bag.")
        return false 
        }
    allItems[item].action();
}

// function to check Activity
//      if activity in current room
//      run activity action (allActivities[activity].action())

function check(activity) {
    if (!player.position.activity.includes(activity)) {
        console.log("That is an invalid command.")
        return false
    }
    allActivities[activity].action();
}

function help() {
    console.log("\x1b[36m%s\x1b[0m", "\n"+"\"move\" allows you to move between rooms, \n\
\"take\" allows you to take objects from the room, \n\
\"bag\" allows you to check the contents of your bag, \n\
\"use\" allows you to use items in your possesion, \n\
\"check\" allows you to examine immovable objects in the room, \n\
\"help\" brings up this help message.")
}

// ------------------------------------------- this is a text comment for git

// INITIALISATION

// this is the form of the questions we need to ask. It waits for input
const playerName = await askQuestion("What is your name? ")
player.setName(playerName)

console.log("Hello "+player.name)

// displays the help message
help()

// GAME LOOP

while (true) {
    console.log("\n");
    console.log("You are in the "+player.position.name+" room");
    console.log(player.position.flavText);
    // need both conditions below bc empty array returns true and items may not exist
    const ifItems = player.position.items && player.position.items.length
    if (ifItems) {
        let itemNames = [];
        for (const item of player.position.items) {
            itemNames.push("a "+allItems[item].name);    
        }
        console.log("There is "+itemNames.join("; ")+" in this room you could pick up.");
    }
    const ifActivity = player.position.activity && player.position.activity.length
    if (ifActivity) {
        let activityNames = [];
        for (const activity of player.position.activity) {
            activityNames.push("a "+allActivities[activity].name);
        }
        console.log("There is "+activityNames.join("; ")+" which you can check");
    }
    if (!ifItems && !ifActivity) {console.log("This room is empty.")}
    const query = await askQuestion("What would you like to do? ");
    if (!query) {
        continue
    };
    if (query.startsWith("move")) {
        const moveSuccess = move(query.split(" ")[1])
        // this takes the second word of the passed query starting with "move"
        if (moveSuccess === false) {
            continue
        };
        console.log("\x1b[33m%s\x1b[0m", "You have moved to the "+player.position.name+" room.")    
        continue  
    };
    if (query.startsWith("take")) {
        const takeSuccess = take(query.split(" ")[1])
        // selects what you want to take
        continue 
    }
    if (query.startsWith("use")) {
        const useSuccess = use(query.split(" ")[1])
        continue
    }
    if (query.startsWith("check")) {
        const checkSuccess = check(query.split(" ")[1])
        continue
    }
    if (query === "bag") {
        console.log(player.bag)
        continue
    }
    if (query === "help") {
        help()
        continue
    }
}