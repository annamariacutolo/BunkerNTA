// ITEMS -------------------------------------------
import colors from 'colors';

class Item {
    constructor(name, action) {
        this.name = name;
        this.action = action;
    }
}

//                              args    function of the item
// let book = new Item("book", () => {console.log("This is the book contents.")})
let oil_can = new Item("oil_can", (player) => {
    console.log(`The label says: "Useful for anything that has seized up."
There is a large number 4 on the can.`)
})
let plastic_fish = new Item("plastic_fish", (player) => { console.log("An exquisitely crafted plastic fish. It is red in colouration and appears to be a herring.") })
let wrench = new Item("wrench", (player) => { console.log("Heavy duty! This tool is etched with the number 8.") });
let glove = new Item("glove", (player) => {
    console.log(`A single heavy-duty insulating glove.
You put it on.`);
    player.glove = true;
    player.bag.pop("glove")
});
let pen = new Item("pen", (player) => { console.log("This appears to be an ordinary pen.") });
let paper = new Item("paper", (player) => console.log(`There is a sentence written on the paper with words missing: 
\"The ___ is in the ____ of the _____.\"`));
let book_1 = new Item("book_1", (player) => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"painting\"", " is highlighted.") });
let book_2 = new Item("book_2", (player) => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"drawer\"", " is highlighted.") });
let book_3 = new Item("book_3", (player) => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"book\"", " is highlighted.") });
let book_4 = new Item("book_4", (player) => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"paper\"", " is highlighted.") });
let book_5 = new Item("book_5", (player) => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"key\"", " is highlighted.") });
let book_6 = new Item("book_6", (player) => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"note\"", " is highlighted.") });
let book_7 = new Item("book_7", (player) => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"desk\"", " is highlighted.") });
let book_8 = new Item("book_8", (player) => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"base\"", " is highlighted.") });
let book_9 = new Item("book_9", (player) => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"clock\"", " is highlighted.") });
let book_10 = new Item("book_10", (player) => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"pen\"", " is highlighted.") });
let book_11 = new Item("book_11", (player) => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"knife\"", " is highlighted.") });
let book_12 = new Item("book_12", (player) => { console.log("%s\x1b[33m%s\x1b[0m%s", "One page has a folded corner. The word ", "\"chair\"", " is highlighted.") });
let knife = new Item("knife", (player) => { console.log("Fairly blunt but sharp enough to damage furniture.") })
let key = new Item("key", (player) => { console.log("I wonder where this is from? Etched into it is the number 7.") });
let bucket = new Item("bucket", (player) => { console.log("I probably should have left this where it was...") });
let screwdriver = new Item("screwdriver", (player) => { console.log("A standard flat-headed screwdriver.") });
let hazmat_suit = new Item("hazmat_suit", (player) => {
    console.log(`The hazmat_suit you found in the vent.
You put it on.`);
    player.bag.pop("hazmat_suit")
    player.hazmat = true ;
});

// need const obj "allItems" to pickup easier
export const allItems = {
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