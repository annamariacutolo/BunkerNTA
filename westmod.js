function enterwest() {
    console.log(`You enter the west room. You see that it is a library.`);
    let req = await askQuestion(`What would you like to do? 
        1) Examine the room 
        2) Leave the room`);
    if (req[0] == 1) {
        westroom();
    } else if (req[0] == 2) {
        //go to central room
        console.log(`Bye bye`);
    } else {
        //run function again
        console.log(`Invalid`);
        enterwest();
    }
}

function westroom() {
    console.log(`You see a wooden desk and chair in the centre 
                of the room. On the green walls hang a large landscape painting 
                and a clock. There are several bookshelves full of books.`);
    let req = await askQuestion(`What would you like to do? 
                1) Examine the desk
                2) Examine the chair
                3) Examine the bookshelves
                4) Examine the clock
                5) Examine the painting
                6) Leave the room`);
    if (req[0] == 1) {
        desk();
    } else if (req[0] == 2) {
        chair();
    } else if (req[0] == 3) {
        bookshelves();
    } else if (req[0] == 4) {
        clock();
    } else if (req[0] == 5) {
        painting();
    } else if (req[0] == 6) {
        //go to central room
        console.log(`Bye bye`);
    } else {
        //run function again
        console.log(`Invalid`);
        westroom();
    }
}

function desk() {
    console.log(`On the desk you see some paper and a pen. 
                    Something has been written on the paper.`);
    let req = await askQuestion(`What would you like to do?
                    1) Examine pen
                    2) Examine paper
                    3) Examine room`);
    if (req[0] == 1) {
        pen();
    } else if (req[0] == 2) {
        paper();
    } else if (req[0] == 3) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`);
        desk();
    }
}

function pen() {
    console.log(`It seems to be an ordinary pen.`);
    let req = await askQuestion(`What would you like to do?
                    1) Add pen to inventory
                    2) Examine desk
                    3) Examine room`);
    if (req[0] == 1) {
        addpen();
    } else if (req[0] == 2) {
        desk();
    } else if (req[0] == 3) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`);
        pen();
    }
}

function addpen() {
    console.log(`Pen added to inventory.`);
    let req = await askQuestion(`What would you like to do?
                    1) Examine desk
                    2) Examine room`);
    if (req[0] == 1) {
        desk();
    } else if (req[0] == 2) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`);
        addpen();
    }

}

function paper() {
    console.log(`There is a sentence on the paper with words missing: 
    "The ___ is in the ____ of the _____.".`);
    let req = await askQuestion(`What would you like to do?
                    1) Add paper to inventory
                    2) Examine desk
                    3) Examine room`);
    if (req[0] == 1) {
        addpaper();
    } else if (req[0] == 2) {
        desk();
    } else if (req[0] == 3) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`);
        paper();
    }
}

//need to be able to take paper out of inventory and read note
function addpaper() {
    console.log(`Paper added to inventory.`);
    let req = await askQuestion(`What would you like to do?
                    1) Examine desk
                    2) Examine room`);
    if (req[0] == 1) {
        desk();
    } else if (req[0] == 2) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`);
        addpaper();
    }
}

function chair() {
    console.log(`You see the chair is wooden with a red leather seat.`);
    //if knife in inventory add option to cut open seat
    let req = await askQuestion(`What would you like to do?
                    1) Sit on chair
                    2) Examine room`);
    if (req[0] == 1) {
        sit();
    } else if (req[0] == 2) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`)
    }
}

function sit() {
    console.log(`The chair is comfortable. You take a 
                        short rest before continuing your search.`);
    let req = await askQuestion(`What would you like to do?
                        1) Examine room`);
    if (req[0] == 1) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`);
        sit();
    }
}

//not implemented until knife in inventory
function cut() {
    console.log(`You use the knife to cut open the leather. Amongst the 
    stuffing you find a silver key.`);
    let req = await askQuestion(`What would you like to do?
                        1) Add key to inventory
                        2) Examine room`);
    if (req[0] == 1) {
        //add key to inventory
        key();
    } else if (req[0] == 2) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`);
        cut();
    }

}

function key() {
    console.log(`Key added to inventory.`);
    let req = await askQuestion(`What would you like to do?
                        1) Examine room`);
    if (req[0] == 1) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`);
        key();
    }
}

function bookshelves() {
    console.log(`The bookshelves are filled with books. 
    They are all brown but some seem to be labelled with a large number on the spine.`);
    let req = await askQuestion(`What would you like to do?
                    1) Examine books
                    2) Examine room`);
    if (req[0] == 1) {
        books();
    } else if (req[0] == 2) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`);
        bookshelves();
    }
}

function books() {
    console.log(`There are 12 books labelled with numbers from 1-12.`);
    let req = await askQuestion(`What would you like to do?
    1) Take books
    2) Examine room`);
    if (req[0] == 1) {
        takebooks();
    } else if (req[0] == 2) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`);
        books();
    }
}

function takebooks() {
    let req = await askQuestion(`What books would you like to take?
Enter numbers from 1-12 separated by commas.`)
        //regex for choosing the books, enter their numbers into array called chosenbooks[]
}

//function to go through all books chosen and describe them, doesnt work yet
function labelledbook() {
    chosenbooks = []
    words = {
        1: 'painting',
        2: 'knife',
        3: 'drawer',
        4: 'book',
        5: 'chair',
        6: 'paper',
        7: 'note',
        8: 'key',
        9: 'desk',
        10: 'clock',
        11: 'pen',
        12: 'base'
    }
    for (let i = 0; i < chosenbooks.length; i++) {
        console.log(`You open book ${chosenbooks[i]}. You see one highlighted word that says ${words[i]}.`)
    }
}

function clock() {
    console.log(`The clock has stopped. You have no concept of time in the bunker.`);
    let req = await askQuestion(`What would you like to do?
                    1) Take clock
                    2) Read time
                    3) Examine room`);
    if (req[0] == 1) {
        takeclock();
    } else if (req[0] == 2) {
        readtime();
    } else if (req[0] == 3) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`);
        clock();
    }

}

function takeclock() {
    console.log(`You have no batteries to replace the dead ones. Time is of no use to you.`)
    let req = await askQuestion(`What would you like to do?
                        1) Add clock to inventory
                        2) Read time
                        3) Examine room`);
    if (req[0] == 1) {
        //add clock to inventory
        addclock();
    } else if (req[0] == 2) {
        readtime();
    } else if (req[0] == 3) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`);
        takeclock();
    }
}

//need to be able to take back out of inventory if they havent read the time 
function addclock() {
    console.log(`Clock added to inventory`);
    let req = await askQuestion(`What would you like to do?
                        1) Examine room`);
    if (req[0] == 1) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`);
        addclock();
    }
}

function readtime() {
    console.log(`The clock is stuck at 8:00:25.`)
    let req = await askQuestion(`What would you like to do?
                        1) Add clock to inventory
                        2) Examine room`);
    if (req[0] == 1) {
        addclock();
    } else if (req[0] == 2) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`);
        readtime();
    }
}

function painting() {
    console.log(`The painting depicts a coastal landscape with the sun 
    setting on the horizon.`);
    let req = await askQuestion(`What would you like to do?
                    1) Take painting
                    2) Examine room`);
    if (req[0] == 1) {
        takepainting();
    }
    if (req[0] == 2) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`);
        painting();
    }
}

function takepainting() {
    console.log(`You notice an object taped to the back 
                        of the frame. You remove it and see that it is a knife.`);
    let req = await askQuestion(`What would you like to do?
                        1) Add knife to inventory
                        2) Examine room`);
    if (req[0] == 1) {
        //add to inventory
        addknife();
    } else if (req[0] == 2) {
        westroom;
    } else {
        //run function again
        console.log(`Invalid`);
        takepainting();
    }
}

function addknife() { //have to remove knife from being behind the painting once this is called
    console.log(`Knife added to inventory.`);
    let req = await askQuestion(`What would you like to do?
                        1) Examine room`);
    if (req[0] == 1) {
        westroom();
    } else {
        //run function again
        console.log(`Invalid`);
        addknife();
    }
}

export { enterwest }