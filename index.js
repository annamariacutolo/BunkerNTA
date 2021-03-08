" use strict"

import readline from 'readline';
import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

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
    addContents(storedItems) {
        this.items = [...this.items, ...storedItems];
    }
}

class Item {
    constructor(name, action) {
        this.name = name;
        this.action = action;
    }
}


// storedItems=[] means if no 3rd arg, default set as []
class Activity {
    constructor(name, action, storedItems = []) {
        this.name = name;
        this.action = action;
        this.storedItems = storedItems;
        this.hasTriggered = false;
    }
    runAction() {
        this.action(this);
        if (this.storedItems.length) { this.moveContents() }
    }
    moveContents() {
        console.log(`You find ${this.storedItems.join("; ")}.`);
        player.position.addContents(this.storedItems);
        this.storedItems = [];
    }
}

function askQuestion(query) {
    return prompt(query);
    // const readLine = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });
    // return new Promise(resolve => readLine.question(query, ans => {
    //     readLine.close();
    //     resolve(ans);
    // }))
}

// -------------------------------------------

// creates a room: gives it a name, a description which is shown on entry and defintion for "locked"

let roomSouth = new Room("South",
    "This room loosely resembles a bedroom.",
    false,
    "The walls are painted a dull shade of blue."
)

let roomCentral = new Room("Central",
    "You enter a large, empty room. There are doors in each direction.",
    true,
    `The soft light from the lamps above provides poor but adequate visibility.
A bucket sits collecting murky water from leaking pipe. 
There is a stairwell in the centre that looks like you could use it to get to the surface above.
You see that there are four doors leading to rooms labelled North to South that you could go to.
Your living quarters appear to have been in the South room.`
)

let roomNorth = new Room("North",
    "This room is filled with boxes and shelving.",
    true,
    `It is so full you can barely make out the pale yellow walls. 
You wonder what is being stored in this vault.`
)

let roomEast = new Room("East",
    "This room has pieces of machinery adorning its red walls.",
    false,
    `This appears to be some sort of maintenance room.
Various equipment seems to be purifying the water and air in bunker.
There is also a console that controls the power supply.`
)

let roomWest = new Room("West",
    "This room appears to be a library.",
    false,
    `You see a wooden desk and chair in the centre of the room. 
On the green walls hang a large landscape painting and a clock. 
There are several bookshelves full of books.`
)

roomCentral.setAdjoined({
    "north": roomNorth,
    "east": roomEast,
    "south": roomSouth,
    "west": roomWest
})
roomNorth.setAdjoined({
    "south": roomCentral
})
roomEast.setAdjoined({
    "west": roomCentral
})
roomSouth.setAdjoined({
    "north": roomCentral
})
roomWest.setAdjoined({
    "east": roomCentral
})

// ------------------------------------------- need player after room definitions

class Player {
    constructor() {
        this.bag = [];
        this.hp = 3;
        this.position = roomSouth;
        this.glove = false;
        this.hazmat = false;
        this.power = false;
        this.code = false;
    }
    setName(name) {
        this.name = name;
    }
}

const player = new Player()

// ITEMS -------------------------------------------

//                              args    function of the item
// let book = new Item("book", () => {console.log("This is the book contents.")})
let oil_can = new Item("oil_can", () => {
    console.log(`You use the oil can on the seized door mechanism. The door swings open.
You notice the can is labelled with the number 4.`)
    roomCentral.locked = false
})
let plastic_fish = new Item("plastic_fish", () => { console.log("An exquisitely crafted plastic fish. It is red in colouration and appears to be a herring.") })
let wrench = new Item("wrench", () => { console.log("Heavy duty! This tool is etched with the number 8.") });
let glove = new Item("glove", () => {
    console.log("A single heavy-duty insulating glove.");
    let glove = askQuestion("Would you like to put it on? y/n ");
    if (glove === "y") { player.glove = true };
});
let pen = new Item("pen", () => { console.log("This appears to be an ordinary pen.") });
let paper = new Item("paper", () => console.log(`There is a sentence written on the paper with words missing:
\"The ___ is in the ____ of the _____.\"`));
let book_1 = new Item("book_1", () => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"painting\"", " is highlighted.") });
let book_2 = new Item("book_2", () => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"drawer\"", " is highlighted.") });
let book_3 = new Item("book_3", () => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"book\"", " is highlighted.") });
let book_4 = new Item("book_4", () => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"paper\"", " is highlighted.") });
let book_5 = new Item("book_5", () => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"key\"", " is highlighted.") });
let book_6 = new Item("book_6", () => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"note\"", " is highlighted.") });
let book_7 = new Item("book_7", () => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"desk\"", " is highlighted.") });
let book_8 = new Item("book_8", () => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"base\"", " is highlighted.") });
let book_9 = new Item("book_9", () => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"clock\"", " is highlighted.") });
let book_10 = new Item("book_10", () => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"pen\"", " is highlighted.") });
let book_11 = new Item("book_11", () => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"knife\"", " is highlighted.") });
let book_12 = new Item("book_12", () => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"chair\"", " is highlighted.") });
let knife = new Item("knife", () => { console.log("Fairly blunt but sharp enough to damage furniture.") })
let key = new Item("key", () => { console.log("I wonder where this is from? Etched into it is the number 7.") });
let bucket = new Item("bucket", () => { console.log("I probably should have left this where it was...") });
let screwdriver = new Item("screwdriver", () => { console.log("A standard flat-headed screwdriver.") });
let hazmat_suit = new Item("hazmat_suit", () => {
    console.log("The hazmat suit you found in the vent.");
    let hazmatWear = askQuestion("Would you like to put it on? y/n ");
    if (hazmatWear === "y") { player.hazmat = true };
});


// need const obj "allItems" to pickup easier
const allItems = {
    "oil_can": oil_can,
    "plastic_fish": plastic_fish,
    "wrench": wrench,
    "glove": glove,
    "pen": pen,
    "paper": paper,
    "book_1": book_1,
    "book_2": book_2,
    "book_3": book_3,
    "book_4": book_4,
    "book_5": book_5,
    "book_6": book_6,
    "book_7": book_7,
    "book_8": book_8,
    "book_9": book_9,
    "book_10": book_10,
    "book_11": book_11,
    "book_12": book_12,
    "knife": knife,
    "key": key,
    "bucket": bucket,
    "screwdriver": screwdriver,
    "hazmat_suit": hazmat_suit,
}

roomSouth.setContents(["oil_can", "plastic_fish"]);

roomWest.setContents([]);

roomNorth.setContents(["wrench", "glove"]);

roomCentral.setContents(["bucket"]);

roomEast.setContents([]);


// ACTIVITIES -------------------------------------------

let wardrobe = new Activity("wardrobe", () => { console.log("A basic wooden wardrobe. You search it but find nothing of note.") })
let painting = new Activity("painting", () => {
    console.log("The painting depicts a coastal landscape with the sun setting on the horizon.")
    if (!player.bag.includes("knife")) {
        console.log("You notice the frame sits apart from the wall.")
        const takePainting = askQuestion("Would you like to remove the painting from the wall? y/n ");
        if (takePainting === "y") {
            console.log("Taking the painting off the wall, you notice an object taped to the back. It appears to be a knife.");
            const takeKnife = askQuestion("Would you like to take the knife? y/n ");
            if (takeKnife === "y") {
                console.log("\x1b[33m%s\x1b[0m", "You replace the painting and move the knife to your bag.");
                player.bag.push("knife")
            };
        }
    }
});
let desk = new Activity("desk", (current) => {
    if (!current.storedItems.length) { console.log("\x1b[33m%s\x1b[0m", "There is nothing here.") }
}, ["pen", "paper"]);
let bookcase = new Activity("bookcase", (current) => {
    if (!current.storedItems.length) { console.log("\x1b[33m%s\x1b[0m", "There is nothing here.") }
}, ["book_1", "book_2", "book_3", "book_4", "book_5", "book_6", "book_7", "book_8", "book_9", "book_10", "book_11", "book_12"]);
let clock = new Activity("clock", () => { console.log("\x1b[33m%s\x1b[0m", "The clock has stopped. You have no concept of time in the bunker. It is always 8:00:25 down here.") });
let chair = new Activity("chair", () => {
    console.log("The chair is wooden with a red leather seat.");
    if (player.bag.includes("knife")) {
        const attackChair = askQuestion("Would you like to attack the chair with the knife? y/n ");
        if (attackChair === "y") {
            console.log("\x1b[33m%s\x1b[0m", "You use the knife to cut open the leather seating. Amongst the stuffing you find a silver key which you pocket.");
            player.bag.push("key");
        }
    }
});
let locked_door = new Activity("locked_door", () => {
    console.log("A heavy, metal door which appears to be locked.");
    if (player.bag.includes("key")) {
        const openDoor = askQuestion("Would you like to try the silver key in the door? y/n ");
        if (openDoor === "y") {
            console.log("\x1b[33m%s\x1b[0m", "The key fits! The door swings open")
            roomNorth.locked = false;
            roomCentral.setActivities(["stairwell"]);
        }
    }
});
let toolbox = new Activity("toolbox", () => {
    console.log("A heavy, metal toolbox filled to the brim with only screwdrivers.");
    if (!player.bag.includes("screwdriver")) {
        const takeScrewdriver = askQuestion("Would you like to take one? y/n ")
        if (takeScrewdriver === "y") {
            player.bag.push("screwdriver")
        }
    }
});
let purification_station = new Activity("purification_station", () => { console.log("This machine seems to be cleaning the air in the bunker.") });
let heavy_box = new Activity("heavy_box", (current) => {
    if (!current.hasTriggered) {
        current.hasTriggered = true;
        console.log("\x1b[33m%s\x1b[0m", "You reach for the box but your hand slips. It lands heavy on your shoulder on the way down.")
        player.hp--
            console.log("\x1b[31m%s\x1b[0m", `Your health is now ${player.hp}.`)
    } else {
        console.log("The box lies sadly on its side where it fell.")
    }
})
let placedBucket = false
let vent = new Activity("vent", (current) => {
    console.log("A vent sits high up on the wall.")
    if (!current.hasTriggered) {
        const hasBucket = player.bag.includes("bucket")
        if (!hasBucket && !placedBucket) {
            console.log("The vent is too high-up to reach.")
        }
        if (hasBucket && !placedBucket) {
            const QPlaceBucket = askQuestion("Would you like to place the bucket to get a better look at the vent? y/n ")
            if (QPlaceBucket === "y") {
                placedBucket = true
            }
        } else if (hasBucket || placedBucket) {
            if (!player.bag.includes("screwdriver")) {
                console.log(`Standing on the bucket you can see something bright yellow within the vent. The grating is held on by four screws. Perhaps there is a screwdriver around here somewhere?`)
            } else if (player.bag.includes("screwdriver")) {
                const ventScrews = askQuestion(`Standing on the bucket you can see something bright yellow within the vent. Would you like to use the screwdriver to remove the grating? y/n `)
                if (ventScrews === "y") {
                    console.log("You use the screwdriver to remove the vent grating and find a hazmat suit within. I wonder who put this here?")
                    console.log("\x1b[33m%s\x1b[0m", "You take the hazmat suit.")
                    player.bag.push("hazmat_suit")
                }
            }
        }
    }
})
let shelving = new Activity("shelving", () => { console.log("Shelving packed to the brim with assorted broken machinery and provisions.") });
let power_console = new Activity("power_console", () => {
    console.log(`You examine the power console. 
You notice the number 2 painted above it.
The dials indicate that the main power is off. 
There are the remains of a large rubber-coated lever next to the dials.
This appears to be the master circuit breaker but the missing handle is a problem.
Without a way to get some leverage, the switch won't budge.
You might be able to use a large tool on this.`)
    if (player.bag.includes("wrench")) {
        const wrenchPower = askQuestion("Would you like to try using the wrench as a lever? y/n ")
        if (wrenchPower === "y") {
            console.log("You use the wrench to turn the power back on. There is a flash as you heave the switch into position.")
            if (!player.glove) {
                player.hp--
                    console.log("\x1b[31m%s\x1b[0m", `The current shocks you! You cry out as you drop the wrench. \nYour health is now ${player.hp}.`)
            }
            player.power = true;
            console.log("The power has been restored.")
        }
    }
})
let stairwell = new Activity("stairwell", () => {
    console.log(`A thick door sits between you and the outside world. 
There is a keypad with four coloured dots above it: red, yellow, green and blue.`)
    if (!player.power) {
        console.log("The door won't budge. It seems the motors aren't being provided power.")
    }
    if (player.power) {
        console.log("The keypad has lit up.");
        const code = askQuestion("Please enter the code: ");
        if (code == "2874") {
            player.code = true
        } else {
            console.log("Incorrect code.")
        }
        if (player.code) {
            console.log("A green LED shines brightly by the door handle.")
            const openMainDoor = askQuestion("Would you like to open the door? y/n ")
            if (openMainDoor === "y") {
                console.log("You open the door. The bright light comes streaming in, blinding you momentarily.")
                if (!player.hazmat) {
                    console.log(`Unfortunately for you, the outside world is horrendously irradiated and you die in seconds. 
                GAME OVER - YOU LOSE`)
                    gameRunning = false
                    return
                }
                console.log(`The world appears hazy through your breath which fogs up the hazmat screen, but you're thankful for the protection.
                Who knows the state of the world to which you have woken into?
                You take your first steps into a world unfamilliar to you and wonder what will happen next.
                GAME OVER - YOU WON`)
            }
        }
    }
})

const allActivities = {
    "wardrobe": wardrobe,
    "painting": painting,
    "power_console": power_console,
    "desk": desk,
    "bookcase": bookcase,
    "clock": clock,
    "chair": chair,
    "locked_door": locked_door,
    "heavy_box": heavy_box,
    "shelving": shelving,
    "purification_station": purification_station,
    "stairwell": stairwell,
    "toolbox": toolbox,
    "vent": vent
}

roomSouth.setActivities(["wardrobe"]);
roomWest.setActivities(["desk", "chair", "clock", "bookcase", "painting"]);
roomEast.setActivities(["power_console", "toolbox"]);
roomCentral.setActivities(["locked_door", "stairwell"]);
roomNorth.setActivities(["heavy_box", "shelving", "vent"]);

// FUNCTIONS -------------------------------------------

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
    console.log("\x1b[33m%s\x1b[0m", `You have moved the ${allItems[item].name} to your bag.`)
    return true
}

function removeArrayByValue(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) {
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
    allActivities[activity].runAction();
}

function help() {
    console.log("\x1b[36m%s\x1b[0m", "\n" + "\"move\" and a compass direction (e.g. north) allows you to move between rooms, \n\
\"take\" allows you to take objects from the room, \n\
\"bag\" allows you to check the contents of your bag, \n\
\"use\" allows you to use items in your possesion, \n\
\"check\" allows you to examine immovable objects in the room, \n\
\"exit\" exits the game, \n\
\"help\" brings up this help message.")
}

function moveValid(userResponse) {
    const allDirections = ['central', 'north', 'west', 'east', 'south']
    let regEx = /./;
    for (let i = 0; i < allDirections.length; i++) {
        regEx = RegExp(`((move)|(go)) .*${allDirections[i]}`);
        if (regEx.test(userResponse.toLowerCase())) {
            return move(allDirections[i])
        }
    }
    if (player.position === roomSouth) {
        regEx = RegExp(`((move)|(go)) *`);
        if (regEx.test(userResponse.toLowerCase())) {
            return move(allDirections['north'])
        }
    }
    regEx = RegExp(`((move)|(go)) *`);
        if (regEx.test(userResponse.toLowerCase())) {
            return move("")
        }
    return false
}

function takeValid(userResponse) {
    const allItemsList = Object.keys(allItems);
    let regEx = /./;
    for (let i = 0; i < allItemsList.length; i++) {
        regEx = RegExp(`take .*${allItemsList[i]}$`);
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
    console.log("\x1b[35m%s\x1b[0m", "\n" + desc);
    return;
}

// function code(userResponse) {
//     let regEx = /2874/;
//     if (regEx.test(userResponse) {
//         player.code = true;
//     }
// }

// -------------------------------------------

// INITIALISATION

// this is the form of the questions we need to ask. It waits for input
const playerName = await askQuestion("What is your name? ")
player.setName(playerName)

// displays the help message
help()

console.log(`Hello ${player.name}.`)

console.log("You awake in a room you do not recognise. You try to open the door but find it is seized shut.")

// GAME LOOP
let gameRunning = true

while (gameRunning) {
    if (player.hp > 0) {
        console.log("");
        console.log("\x1b[35m%s\x1b[0m", `You are in the ${player.position.name} room.`);
        console.log(player.position.flavText);
        console.log(player.position.description);
        // need both conditions below bc empty array returns true and items may not exist
        // this returns the items currently in the room just entered
        const ifItems = !!player.position.items && !!player.position.items.length
        if (ifItems) {
            let itemNames = [];
            for (const item of player.position.items) {
                itemNames.push("a " + allItems[item].name);
            }
            console.log(`There is ${itemNames.join("; ")} in this room you could pick up.`);
        }
        // this returns the activities (interactable objects that can't be taken) currently in the room just entered
        const ifActivity = !!player.position.activity && !!player.position.activity.length
        if (ifActivity) {
            let activityNames = [];
            for (const activity of player.position.activity) {
                activityNames.push("a " + allActivities[activity].name);
            }
            console.log(`There is ${activityNames.join("; ")} which you can check.`);
        }
        // this tells us the room is empty if there aren't any items or activities
        if (!ifItems && !ifActivity) { console.log("This room is empty.") }
        const query = await askQuestion("What would you like to do? ");
        // restarts the game loop if no query is input
        if (!query) {
            continue;
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
                console.log("Your bag is empty.");
            } else {
                console.log(`You have: ${player.bag}.`);
            }
            continue;
        }
        if (query === "search") {
            search();
            continue;
        }
        // checks for "help"
        if (query === "help") {
            help();
            continue;
        }
        // checks for "exit"
        if (query === "exit") {
            break;
        }
    } else {
        console.log("You have died.");
        gameRunning = false;
    }
}