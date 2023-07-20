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

document.addEventListener('DOMContentLoaded', () => { // this fires as soon as the HTML page is loaded so that you dont have to wait for everything (stylesheets, images, etc) to load
    
    const grid = document.querySelector('.fallingBlockGrid')
    let squares = Array.from(document.querySelectorAll('.fallingBlockGrid div')) // creates an array directly from this div
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('start-button')
    const width = 10 // tells the width of the falling Brick window, this will be used for the shape arrays
    
    
    // the below declares all of the shapes and their variations by calling their corresponding cells within the falling brick window
    const bed = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const box = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]
    
    const zee = [
        [0, 1, width+1, width+2],
        [1, width, width+1, width*2],
        [0, 1, width+1, width+2],
        [1, width, width+1, width*2]
    ]

    const ess = [
        [1, 2, width, width+1],
        [0, width, width+1, width*2+1],
        [1, 2, width, width+1],
        [0, width, width+1, width*2+1]
    ]
    const midFinger = [        
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [0, 1, 2, width+1],
        [1, width, width+1, width*2+1]
    ]
    const seven = [
        [0, 1, width +1, width*2+1],
        [width,width+1, width+2, 2],
        [1, width+1, width*2+1, width*2+2],
        [width, width+1, width+2, width*2]
    ]
    const flat = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const blocks = [bed, box, zee, ess, midFinger, seven, flat]

    
    let random = Math.floor(Math.random()*blocks.length) // selects a block randomly

    let currentPosition = 4 // sets the starting position in the block box
    let currentRotation = 0 

    let currentBlock = blocks[random][currentRotation]; // calls the first item of a random block from the array of blocks

    // draw the first rotation in the first block
    function draw() {
        currentBlock.forEach(index => { // using this to add the code to each index of the current array
        squares[currentPosition + index].classList.add('blocks')    
        })
    }

    // draw()

    // undraws the block
    function unDraw() {
        currentBlock.forEach(index => {
            squares[currentPosition + index].classList.remove('blocks')
        })
    }

    // make the blocks move down every second
    timerId = setInterval(moveDown, 800) 

    // assign functions to keycodes
    function control(e) { // the e key is becuase the function is waiting for an event to invoke the function
        if(e.keyCode === 37) { // 37 is the keycode for arrow left
            moveLeft()
        } else if (e.keyCode === 38) { // 38 is the up arrow, and will rotate the block
            rotate()
        } else if (e.keyCode === 39) { // 39 is the right arrow and will move the block right
            moveRight()
        } else if (e.keyCode === 40) { // 40 is the down arrow and will move the block down
            moveDown()
        } 
    } 
    document.addEventListener('keydown', control) // send the function of contol to the browser when the key goes down
    
    // move down fucntion
    function moveDown() {
        unDraw()
        currentPosition += width
        draw()
        freeze()
    }

    // write a freeze function
    function freeze() {
        if(currentBlock.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            currentBlock.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start a new falling block
            random = Math.floor(Math.random() * blocks.length)
            currentBlock = blocks[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }

    // move the blocks left, unless it is at the edge or there is a blockage
    function moveLeft() { 
        unDraw() // this undraws any trace of the block so it is gone
        // if some of our block is touching the left then its true. curren block + its index (0) / 10 (size of grid) should equal zero
        const isAtLeftEdge = currentBlock.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -=1 // we want the box to stop if there is another block there

        // we want our block to stop if theres already another block there and we want to do this for every index in the block so we use the arrow
        if(currentBlock.some(index => squares[currentPosition + index].classList.contains('taken'))) {
             currentPosition +=1
        }
        draw()
    }

    // move the block right, unless it is at the edge or there is a blockage
    function moveRight() {
        unDraw()
        const isAtRightEdge = currentBlock.some(index => (currentPosition + index) % width === width -1)

        if(!isAtRightEdge) currentPosition +=1

        if(currentBlock.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1
        }
    }

    // rotate the block
    function rotate() {
        unDraw()
        currentRotation++
        if(currentRotation === currentBlock.length) { //if the current rotation gets to 4, make it go back to 0
            currentRotation = 0 // if current rotation is false
        }
        currentBlock = blocks[random][currentRotation]
        draw()
    }






});