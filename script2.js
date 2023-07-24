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
    const scoreDisplay = document.querySelector('#score')
    const computerScoreDisplay = document.querySelector('#computerScore')
    const levelDisplay = document.querySelector('#level')
    const lineDisplay = document.querySelector('#line')
    const startBtn = document.querySelector('#start-button')
    // const musicBtn = document.querySelector('#music-btn')
    const width = 10 // tells the width of the falling Brick window, this will be used for the shape arrays
    // let nextRandom = 0
    let timerId
    let score = 0
    let score2 = 0
    let level = 1
    let line = 0
    // let audio = new Audio('musicCyberPunk.mp3');
    const colors = [
        '#0000FF', //#6527BE',
        '#9933FF', //#213555',
        '#A2FF86',
        '#FFFF33',
        '#FF00FF',
        '#FF0000',
        '#00FFFF',
    ]

    const music = [
        './musicCyberPunk.mp3',
        './musicMatrix.mp3',
        './musicTrap.mp3',
    ]

    let audio; // Variable to store the audio element
    let isPlaying = false; // Track if music is currently playing or stopped
    let currentSongIndex = 0; // Track the index of the current playing song

    // Function to play the next random music
function playNextRandomMusic() {
  // Stop the current music if it's playing
  if (audio) {
    audio.pause();
  }

  // Select a random index from the musicList array
  currentSongIndex = Math.floor(Math.random() * music.length);
  // Get the selected music URL from the array
  const selectedMusic = music[currentSongIndex];
  // Create an HTML audio element
  audio = new Audio(selectedMusic);
  // Play the selected music
  audio.play();
  // Set the isPlaying flag to true
  isPlaying = true;
  // Add an event listener to the audio element to detect when the current song has ended
  audio.addEventListener('ended', playNextRandomMusic);
}

// Function to stop the music
function stopMusic() {
  if (audio) {
    audio.pause();
  }
  isPlaying = false;
}

// Function to handle the button click event
function handleButtonClick() {
  if (isPlaying) {
    // If music is currently playing, stop it
    stopMusic();
  } else {
    // If music is stopped, play the next random music
    playNextRandomMusic();
  }
}
// Attach a click event listener to the playButton
const musicBtn = document.getElementById('musicBtn');
musicBtn.addEventListener('click', handleButtonClick);

    // the below declares all of the shapes and their variations by calling their corresponding cells within the falling brick window
    const bed = [
        [0, width, width*2, 1],
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
        [0, width, width+1, width*2],
        [0, 1, 2, width+1],
        [1, width, width+1, width*2+1]
    ]
    const seven = [
        [0, 1, width +1, width*2+1],
        [width,width+1, width+2, 2],
        [0, width, width*2, width*2+1],
        [width, width+1, width+2, width*2]
    ]
    const flat = [
        [0, width, width*2, width*3],
        [width, width+1, width+2, width+3],
        [0, width, width*2, width*3],
        [width, width+1, width+2, width+3]
    ]

    const blocks = [bed, box, zee, ess, midFinger, seven, flat]

    let currentPosition = 4 // sets the starting position in the block box
    let currentRotation = 0 

    let random = Math.floor(Math.random()*blocks.length) // selects a block randomly
    let currentBlock = blocks[random][currentRotation] // calls the first item of a random block from the array of blocks


    // draw the first rotation in the first block
    function draw() {
        currentBlock.forEach(index => { // using this to add the code to each index of the current array
        squares[currentPosition + index].classList.add('tetros')    
        squares[currentPosition + index].style.backgroundColor = colors[random]
        })
    }

    // draw()

    // undraws the block
    function unDraw() {
        currentBlock.forEach(index => {
            squares[currentPosition + index].classList.remove('tetros')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }

    // make the blocks move down every second
    // timerId = setInterval(moveDown, 800) 

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
    

    // move down function
    function moveDown() {
        if(!currentBlock.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            unDraw()
            currentPosition += width
            draw()
        } else {
            freeze();
        }
    }

    // write a freeze function
    function freeze() {
        currentBlock.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //start a new block falling
        random = nextRandom
        nextRandom = Math.floor(Math.random() * blocks.length)
        currentBlock = blocks[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
        // scoreBlocks()
        // playMusic()
        addScore()
        gameOver()
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
        draw()
    }

    // rotate the block
    function rotate() {
        unDraw()
        currentRotation ++
        if(currentRotation === currentBlock.length) { //if the current rotation gets to 4, make it go back to 0
            currentRotation = 0 // if current rotation is false
        }
        const isAtRightEdge = currentBlock.some(index => (currentPosition + index) % width === width -1) //! added code
        if(!isAtRightEdge) currentPosition +=1 //! added code
        const isAtLeftEdge = currentBlock.some(index => (currentPosition + index) % width === 0) //! added code
        if(!isAtLeftEdge) currentPosition -=1 //! added code

        currentBlock = blocks[random][currentRotation]
        draw()
    }

    // show up-next block in the mini grid display
    const displaySquares = document.querySelectorAll('.next-block div')
    const displayWidth = 6 //4
    const displayIndex = 7 //0

    // the blocks without rotations
    const nextUpBlocks = [
        [1, displayWidth+1, displayWidth*2+1, 2], // bed block
        [0, 1, displayWidth, displayWidth+1], // box block
        [0, 1, displayWidth+1, displayWidth+2], // zee block
        [1, 2, displayWidth, displayWidth+1], // ess block
        [1, displayWidth, displayWidth+1, displayWidth+2], // mid finger block
        [0, 1, displayWidth +1, displayWidth*2+1], // seven block
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1], // flat block
    ]

    // display the shape in the nextBlock display
    function displayShape() {
        //removes any trace of a block from the entire grid
    displaySquares.forEach(squares => {
        squares.classList.remove('tetros')
        squares.style.backgroundColor = ''
    })
    
    nextUpBlocks[nextRandom].forEach( index => { 
        displaySquares[displayIndex + index].classList.add('tetros')
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        //! score ++
        //! scoreDisplay.innerHTML = score     need to find a PLACE FOR THESE TO INCREMENT THE SCORE WHEN A BLOCK FALLS
    })
    }
    
    // add functionality to the start button
    startBtn.addEventListener('click', () =>  {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 300)
            nextRandom = Math.floor(Math.random()*blocks.length)
            displayShape()
        }
    })

    // // add music to the game
    // function playMusic()
    // music-btn.addEventListener('click', () => {
    //     audio.play();
    // })

    // add score(
    function addScore() {
        for(let i = 0; i < 199; i +=width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
            if(row.every(index => squares[index].classList.contains('taken'))) {
                score +=10
                scoreDisplay.innerHTML = score
                levelUp()
                levelDisplay.innerHTML = level
                lineUp()
                lineDisplay.innerHTML = line
                // getRandomNumber()
                // computerScoreDisplay.innerHTML = computerScore
                singlePlayerWin()
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetros')
                    squares[index].style.backgroundColor = ''
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
            // if (score % 10 === 0) {
            //     level++;
            //     levelDisplay.innerHTML = level
            //     }
            }
            // levelUp()
        }

    // add to score per falling block
    // function scoreBlocks() {
    //     score += 2;
    // }

    // level up function //! if the score jumps over a multiple of 200 then the function doesnt trigger
    function levelUp() {
        if (score >= 20 && score % 20 === 0) {
        level++;
        }
        timerId = setInterval(750)
    }

    // line up function
    function lineUp() {
        if (score % 10 === 0) {
        line++;
        }
    }

    // // Create a random number as computers High Score
    // function getRandomNumber(min, max) {
    //     return Math.floor(Math.random() * (max - min +1)) + min;
    // }

    // let computerScore = getRandomNumber(500,1000);
    // computerScoreDisplay.innerHTML = computerScore



    // // Player 1 mode Win State
    // function singlePlayerWin() {
    //     if (score >= computerScore) {
    //         alert("Congratulations, you beat the computer!");
    //         alert("Would you like to continue playing?");
    //     }
    // }

    // game over
    function gameOver() {
        if(currentBlock.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'end'
            clearInterval(timerId)
        }
    }

    // const playButton = document.getElementById('music-btn');
    // const audioPlayer = document.getElementById('audioPlayer');

    // playButton.addEventListener('click', function() {
    // if (audioPlayer.paused) {
    //     audioPlayer.play();
    //     playButton.innerText = 'Pause Audio';
    // } else {
    //     audioPlayer.pause();
    //     playButton.innerText = 'Play Audio';
    // }
    // });


})

// alert(promptUserName());

// function promptUserName() {
    //     let name = prompt("What is your name?");
    //     name = name.toUpperCase(); {
        //         if (name === "");
        //         prompt("Invalid response. Please Enter your name."); 
        //         promptUserName()
        //     }
        // }
        // alert("Hi, " + name + "!");
        // alert("Use the left-arrow key to move the block left.");
        // alert("Use the right-arrow key to move the block right.");
        
// alert("Welcome to TETRIS");
// alert("Your goal is to beat my, (the computer\'s) High Score.");
// alert("Use the arrow key\'s to move and rotate the blocks as they fall.");
// alert("Gain points by completing a full line accross.");
// alert("If you have any questions, visit the 'Help' page.");
// alert(`Press the Power Button when you\'re ready to play. Good Luck... (your\'re gonna need it!!)`);


//^ one player mode will get 2 tries to 'beat the computer'. the win state will be a high score that needs
//^ to be reached in order to win.




