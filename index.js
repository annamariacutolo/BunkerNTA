" use strict"

import readline from 'readline';

class Room {
    constructor(name, flavText, locked, description) {
        this.name = name;
        this.flavText = flavText;
        this.locked = locked;
        this.description = description;
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

// -------------------------------------------

// creates a room: gives it a name, a description which is shown on entry and defintion for "locked"

let roomSouth = new Room("South", 
"This room loosely resembles a bedroom", 
false,
"this is the south room"
)

let roomCentral = new Room("Central",
"You enter a large, empty room. There are doors in each direction",
true,
`The soft light from the lamps above provides poor but adequate visibility.
There's a stairwell in the centre that looks like you could use it to get to the surface above.
You see that there are four doors leading to rooms labelled north to south that you could go to.
Your living quarters appear to have been in the south room.`
)

let roomNorth = new Room("North",
"This room is filled with boxes and shelving",
true,
`this is the north room`
)

let roomEast = new Room("East",
"This room has pieces of machinery adoring its walls",
false,
`This appears to be some sort of maintenance room.
Various equipment seems to be purifying the water and air in bunker.
There is also a console that controls the power supply.`
)

let roomWest = new Room("West",
"This room appears to be a library",
false,
`You see a wooden desk and chair in the centre 
of the room. On the green walls hang a large landscape painting 
and a clock. There are several bookshelves full of books.`
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

// ------------------------------------------- need player after room definitions

class Player {
    constructor() {
        this.bag = [];
        this.hp = 3;
        this.position = roomSouth
    }
    setName(name) {
        this.name = name
    }
}

const player = new Player()

// -------------------------------------------

//                          args    function of the item
let book = new Item("book", () => {console.log("This is the book contents.")})
let oil_can = new Item("oil_can", () => {
    console.log("You use the oil can on the siezed door mechanism. The door swings open")
    roomCentral.locked = false
})
let wrench = new Item("wrench", () => {
    if (player.position === roomEast) {
        console.log(`You use the wrench to turn the power back on.
        There is a flash as you heave the switch into position.`)
        if (!player.bag.includes("hazmat_suit")) {
            player.hp--
            console.log(`The current shocks you. You cry out in pain as you drop the wrench.
Your health is now ${player.hp}.`)
        }
    }
})

// need const obj "allItems" to pickup easier
const allItems = {
    "book" : book,
    "oil_can" : oil_can,
    "wrench" : wrench
}

roomWest.setContents(["book"]);
roomSouth.setContents(["oil_can"])

// -------------------------------------------

let wardrobe = new Activity("wardrobe", () => {console.log("Yes, it is a wardrobe")})
let picture = new Activity("picture", () => {})

function powerInteract() {
    console.log(`The dials indicate that the main power is off. 
There is the remains of a large rubber-coated lever next to the dials.
This appears to be the master circuit breaker but the missing handle is a problem.
Without a way to get some leverage, the switch won't budge.`)
    if (player.bag.includes("wrench")) {
        console.log('You might be able to use a large tool on this')
    }
}

let power_console = new Activity("power_console", powerInteract)

const allActivities = {
    "wardrobe" : wardrobe,
    "picture" : picture,
    "power_console" : power_console
}

roomSouth.setActivities(["wardrobe"]);
roomWest.setActivities(["picture"]);
roomEast.setActivities(["power_console"]);

// -------------------------------------------

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
    const newRoom = player.position.adjoined[movement];
    if (!newRoom) { 
        console.log("\x1b[31m%s\x1b[0m", "That is an invalid direction.")
        return false 
        }
    //below doesn't need the "=== true"
    if (newRoom.locked === true) { 
        console.log("\x1b[31m%s\x1b[0m", "The door is locked.")
        return false 
        }
    player.position = newRoom;
    return true
    }

function take(item) {
    if (allActivities[item]) {
        console.log("\x1b[31m%s\x1b[0m", "That item is too big to fit in your pockets!")
        return false
    }
    if (!player.position.items.includes(item)) {
        console.log("\x1b[31m%s\x1b[0m", "That item is not in this room.")
        return false 
        }
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
        console.log("\x1b[31m%s\x1b[0m", "That item is not in your bag.")
        return false 
        }
    allItems[item].action();
}

// function to check Activity
//      if activity in current room
//      run activity action (allActivities[activity].action())

function check(activity) {
    if (!player.position.activity.includes(activity)) {
        console.log("\x1b[31m%s\x1b[0m", "That is an invalid command.")
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
\"exit\" exits the game, \n\
\"help\" brings up this help message.")
}

function moveValid(userResponse) {
    const allDirections = ['central','north','west','east','south']
    let regEx = /./;
    for (let i = 0; i < allDirections.length; i++) {
        regEx = RegExp(`((move)|(go)) .*${allDirections[i]}`);
        if (regEx.test(userResponse.toLowerCase())) {
            return move(allDirections[i])
        }
    }
    return false
}

function takeValid(userResponse) {
    const allItemsList = Object.keys(allItems);
    let regEx = /./;
    for (let i = 0; i < allItemsList.length; i++) {
        regEx = RegExp(`take .*${allItemsList[i]}`);
        if (regEx.test(userResponse.toLowerCase())) {
            return take(allItemsList[i]);
        }
    }
    return false
}

function checkValid(userResponse) {
    const allActivitiesList = Object.keys(allActivities);
    let regEx = /./;
    for (let i = 0; i < allActivitiesList.length; i++) {
        regEx = RegExp(`check .*${allActivitiesList[i]}`);
        if (regEx.test(userResponse.toLowerCase())) {
            return check(allActivitiesList[i]);
        }
    }
    return false
}

function useValid(userResponse) {
    let regEx = /./;
    for (let i = 0; i < player.bag.length; i++) {
        regEx = RegExp(`use .*${player.bag[i]}`);
        if (regEx.test(userResponse.toLowerCase())) {
            return use(player.bag[i]);
        }
    }
    return false
}

function search() {
    let desc = player.position.description;
    console.log("\x1b[35m%s\x1b[0m", "\n"+desc);
    return;
}

// -------------------------------------------

// INITIALISATION

// this is the form of the questions we need to ask. It waits for input
const playerName = await askQuestion("What is your name? ")
player.setName(playerName)

// displays the help message
help()

console.log("\n"+"Hello "+player.name)

console.log("You awake in a room you do not recognise. You try to open the door but find it is siezed shut.")

// GAME LOOP

while (true) {
    console.log("");
    console.log("\x1b[35m%s\x1b[0m", "You are in the "+player.position.name+" room");
    console.log(player.position.flavText);
    // need both conditions below bc empty array returns true and items may not exist
    // this returns the items currently in the room just entered
    const ifItems = player.position.items && player.position.items.length
    if (ifItems) {
        let itemNames = [];
        for (const item of player.position.items) {
            itemNames.push("a "+allItems[item].name);    
        }
        console.log("There is "+itemNames.join("; ")+" in this room you could pick up");
    }
    // this returns the activities (interactable objects that can't be taken) currently in the room just entered
    const ifActivity = player.position.activity && player.position.activity.length
    if (ifActivity) {
        let activityNames = [];
        for (const activity of player.position.activity) {
            activityNames.push("a "+allActivities[activity].name);
        }
        console.log("There is "+activityNames.join("; ")+" which you can check");
    }
    // this tells us the room is empty if there aren't any items or activities
    if (!ifItems && !ifActivity) {console.log("This room is empty.")}
    const query = await askQuestion("What would you like to do? ");
    // restarts the game loop if no query is input
    if (!query) {
        continue
    };
    // checks for "move" functionality
    moveValid(query);

    // checks for "take" functionality
    takeValid(query);

    // checks for "use" functionality
    useValid(query);

    // checks for "check" functionality
    checkValid(query);

    // checks for "bag" functionality
    if (query === "bag") {
        if (player.bag === []) {
            console.log("Your bag is empty")
        } else {
            console.log("You have: "+player.bag)
        }
        continue
    }
    if (query === "search") {
        search()
        continue
    }
    // checks for "help"
    if (query === "help") {
        help()
        continue
    }
    // checks for "exit"
    if (query === "exit") {break}
}