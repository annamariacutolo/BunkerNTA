function enterwest() {
    console.log(`You enter the west room. You see that it is a library.`);
    let req = await askQuestion(`What would you like to do? 
        1) Examine the room 
        2) Leave the room`);
    if (req[0] == 1) {
        westroom();
    } else if (req[0] == 2) {
        //go to central room
        console.log(`Bye bye`)
    }
}

function westroom() {
    console.log(`You see a wooden desk and chair in the centre 
                of the room. On the green walls hang a large landscape painting 
                and a clock. There are several bookshelves full of books.`);
    let req = await askQuestion(`What would you like to do? 
                1) Examine the desk
                2) Examine the chair
                3) Examine the painting
                4) Examine the clock
                5) Examine the bookshelves
                6) Leave the room`);
    if (req[0] == 1) {
        desk();
    } else if (req[0] == 2) {
        chair();
    } else if (req[0] == 3) {
        painting();
    } else if (req[0] == 4) {
        clock();
    } else if (req[0] == 5) {
        bookshelves();
    } else if (req[0] == 6) {
        //go to central room
        console.log(`Bye bye`)
    }
}

function desk() {
    console.log(`On the desk you see some paper and a pen. 
                    Something has been written on the paper.`);
    let req = await askQuestion(`What would you like to do?
                    1) Examine paper
                    2) Examine pen
                    3) Examine room`);
    if (req[0] == 1) {
        paper();
    } else if (req[0] == 2) {
        pen();
    } else if (req[0] == 3) {
        westroom();
    }
}

function chair() {
    console.log(`You see the chair is wooden with a red leather seat.`);
    //if knife in inventory add option to cut open seat
    let req = await askQuestion(`What would you like to do?
                    1) Sit on chair
                    2) Examine room`);
    if (req[0] == 1) {
        console.log(`The chair is comfortable. You take a 
                        short rest before continuing your search.`)
        let req = await askQuestion(`What would you like to do?
                        1) Examine room`);
        if (req[0] == 1) {
            westroom();
        }
    } else if (req[0] == 2) {
        westroom();
    }
}

function painting() {
    console.log(`The painting depicts a coastal landscape with the sun 
    setting on the horizon.`);
    let req = await askQuestion(`What would you like to do?
                    1) Lift painting
                    2) Examine room`);
    if (req[0] == 1) {
        console.log(`You notice an object taped to the back 
                        of the frame. You remove it and see that it is a knife.`)
        let req = await askQuestion(`Add to inventory?
                        Yes/No`)
        if (req[0] == 'Yes') { //regex to remove case dependency
            //add to inventory
            console.log(`Knife added to inventory.`);
        } else if (req[0] == 'No') {
            continue;
        }
    }
    if (req[0] == 2) {
        westroom();
    }
}

function clock() {
    console.log(`The clock has stopped. You have no concept of time in the bunker.`);
    let req = await askQuestion(`What would you like to do?
                    1) Lift clock
                    2) Read time
                    3) Examine room`);
    if (req[0] == 1) {
        console.log(`You have no batteries to replace the dead ones. `)
    }

}

export { enterwest }