
//! goto week1 hw4  index.html for this html's spacing, as 

// at game start, user can pick if they want to play alone of in 2 player mode
// user(s) will then be prompted to enter theie names which will be stored throughout the duration of the game
// and then instructions will be given as to how the blocks can be manipulated
// then the user will be prompted to press the start key

// Need to build out an object
// the object must fall at a steady speed
// the object needs to have a specific set of capabilities:
// ========== on press of down key, the object should speed up fall rate * 2
// ========== on press of up key, the object position will change
// ========== on press of right arrow, the object should move one space to the right
// ========== on press of left arrow, the object should move one space to the left

// the object needs to start right outside of the falling block box
// the object then falls until it finally hits the bottom of the falling block box OR
// until any side of the object hits another object
// once the object finally touches another block, the activated object becomes dead
// then the next piece begins to fall

// the objective is to fill an entire row with all boxes
// when a row is filled completely, that row will disappear and all above blocks will drop down
// when multiple rows are filled completely, the rows will disappear and all above blocks will drop down

// at start the first block will begin dropping
// the next block will immediately be displayed in the "Next Piece Display Area"
// once the active piece has touched the bottom of the "block falling area" that piece will no longer be active
// then the next piece will begin dropping and this will repeat until a player loses
// a player loses when there is no more space for a block to go

// there will be 10 levels in total
// each level will become increasingly harder by the blocks falling faster and faster
// each level will have a total of 100 blocks (this number may be changed, based on gameplay enjoyment)

document.addEventListener('DOM ContentLoaded', () => { // this fires as soon as the HTML page is loaded so that you dont have to wait for everything (stylesheets, images, etc) to load
    
    const grid = document.querySelector('.fallingBlockGrid')
    let squares = Array.from(document.querySelectorAll('.fallingBlockGrid div'))
    const width = 10;

    console.log(squares);

let x = "hello World!"
console.log(x);



}) 

// const box = [bOne, bTWO];
// const zee = [zFlat, zUp];
// const ess = [sFlat, sUp];
// const midFinger = [midFingFlat, midFingRight, midFingLeft, midFingDown]
// const el = [lFlat, lRight, lLeft, lDown]
// const seven = [sevFlat, sevRight, sevLeft,sevDown]
// const flat = [fUp, fDown]

// const blocks = [box, flat, zee, ess, midFinger, el, seven]
// console.log(blocks);

// // for (i = 0; i < 152; i++);

