const flavourText = `You enter the central room. 
The soft light from the lamps above provides poor but adequate visibility.
There's a stairwell in the centre that looks like you could use it to get to the surface above.
You see that there are four doors leading to rooms labelled north to south that you could go to.
Your living quarters appear to have been in the south room.
You may take any of the following actions:
    1) Go to the west room
    2) Go to the north room
    3) Go to the east room
    4) Go to the south room
    5) Go up the stairwell
    6) Check the room`;

let roomCentral = new Room("Central", flavourText, true);
roomCentral.setActivities(["stairwell","pipes"]);

const stairwellText = `You climb the stairwell.
At the top there is a door that looks like an exit.
A keypad is next to the door. A code seems to be required to unlock it.
If only you knew the code...
You may take any of the following actions:
    1) Go back down the stairs
    2) Try the keypad`;

const keypadText = `The power is off - you need to restore it somehow`;
const keypadTextPower = `>> AWAITING INPUT - ATTEMPTS REMAINING: ${attemptsLeft}`;
const rejectCode = `>> ERROR: INVALID CODE - ATTEMPTS REMAINING: ${attemptsLeft}`;
const acceptCode = `>> CODE ACCEPTED - DOOR OPENING
The door begins to slowly swing open, bringing with it traces of an outside breeze.
Freedom at last.`;