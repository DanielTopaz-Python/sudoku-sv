const solution = [[1,5,2, 4,8,9, 3,7,6],
                  [7,3,9, 2,5,6, 8,4,1],
                  [4,6,8, 3,7,1, 2,9,5],
            
                  [3,8,7, 1,2,4, 6,5,9],
                  [5,9,1, 7,6,3, 4,2,8],
                  [2,4,6, 8,9,5, 7,1,3],
            
                  [9,1,4, 6,3,7, 5,8,2],
                  [6,2,5, 9,4,8, 1,3,7],
                  [8,7,3, 5,1,2, 9,6,4]]

const loginData = {
    userName: 'abcd',
    password: '1234'
};

const difficultySettings = {
    easy: 60,
    medium: 40,
    hard: 20
}

let chosenLevel = '';
    
// sets up the login page
const setLogin = () => {
    document.getElementById('container').innerHTML = `
    <div class="main-div">                                     
        <div class="inner-div">
            <input type="text" placeholder="username" id="username" class="login-field">
            <br>
            <br>
            <input type="password" placeholder="password" id="password" class="login-field">
            <br>
            <br>
            <button class="login-button" onclick="login()">click to login</button>
        </div>
    </div>
    `
} 

// checks if login data is correct
const login = () => {
    let usernameInput = document.getElementById('username').value;
    let passwordInput = document.getElementById('password').value;
    
    if (usernameInput === loginData.userName && passwordInput === loginData.password) {
        choseLevel();
    } else {    
        alert('Wrong longin data, please try again');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }
}

// after login, the user selects the difficulty level
// onclick the drawGame() function is called to build the board game and put togather the game page
const choseLevel = () => {
    document.getElementById('container').innerHTML = `
    <div class="main-div">
        <div class="inner-div">
            <p>Choose your difficulty level</p>
            <div class="level-div">
                <button class="difficulty-button" id="the-easy" onclick="drawGame('easy')">Easy</button>
                <button class="difficulty-button" id="the-med" onclick="drawGame('medium')">Medium</button>
                <button class="difficulty-button" id="the-hard" onclick="drawGame('hard')">Hard</button>
            </div>
        </div>
    </div>
    `
}

// generate an array of slots to desply on the game board
const generateSlotsArr = (numberOfSlots) => {
        let slotsArray = [];
        for (let i = 0; i < numberOfSlots; i++) {
            slotsArray.push([]);
            slotsArray[i].push(Math.floor(Math.random() * (9 - 0)))
            slotsArray[i].push(Math.floor(Math.random() * (9 - 0)))
            
            // checks if the last generated slot already exists in the array.
            // if it does it deletes the last element 
            //and decreases i by 1 to create 1 more iteration
            for (let j = 0; j < slotsArray.length - 1; j++) {
                if (slotsArray[i][0] === slotsArray[j][0]) {
                    if (slotsArray[i][1] === slotsArray[j][1]) {
                        slotsArray.pop()
                        i--;
                        break;
                    }
                }
            }
        }
        return slotsArray;
    }

// returns an array of slots to be revealed on the game board 
// the number of slots to reveal is determined by the selected difficulty level 
const generateSlots = (difficultyLevel) => {
    if (difficultyLevel === 'easy') {
        let numberOfSlots = difficultySettings.easy;
        let slotsArray = generateSlotsArr(numberOfSlots);
        // set a spesific color for each lecvel
        var bigCells = document.querySelectorAll(".the-main-cell");
        bigCells.forEach(function(item) {
            item.setAttribute("class", "the-main-cell easy-design");
        });
        return (slotsArray);
    } else if (difficultyLevel === 'medium') {
        let numberOfSlots = difficultySettings.medium;
        let slotsArray = generateSlotsArr(numberOfSlots);
        // set a spesific color for each lecvel
        var bigCells = document.querySelectorAll(".the-main-cell");
        bigCells.forEach(function(item) {
            item.setAttribute("class", "the-main-cell medium-design");
        });
        return (slotsArray);
    } else {
        let numberOfSlots = difficultySettings.hard;
        let slotsArray = generateSlotsArr(numberOfSlots);
        // set a spesific color for each lecvel
        var bigCells = document.querySelectorAll(".the-main-cell");
        bigCells.forEach(function(item) {
            item.setAttribute("class", "the-main-cell hard-design");
        });
        return (slotsArray);
    }
}

// get an array of slots to be revealed on the game board
// and fills those slots with values from the solution matrix
const fillBoard = (slotsArray) => {
    for (let i = 0; i < slotsArray.length; i++) {
        let slotID = `${slotsArray[i][0]},${slotsArray[i][1]}`
        let cell = document.getElementById(slotID);
        cell.value = solution[slotsArray[i][0]][slotsArray[i][1]];
        cell.setAttribute("class","the-cell inserted-numbers");
    }
}

// creates the game board according to the selected difficulty level
const drawGame = (difficultyLevel) => {
    chosenLevel = difficultyLevel;
    // clears the HTML page
    document.getElementById('container').innerHTML = ``
    
    let board = document.getElementById('container'); 

    // sets a div that contains the table background
    // has a class of 'div-behind'
    let bigDiv = document.createElement('div');
    bigDiv.setAttribute("class", "big-div");
    board.appendChild(bigDiv);
    let iIndex = 0;
    let jIndex = 0;

    // creating 3 big rows
    for (let i =0; i < 3; i++) {
        let bigRow = document.createElement('div');
        bigRow.setAttribute("class", "the-row");
        bigDiv.appendChild(bigRow);

        // create 3 big cells in each row
        for (let j = 0; j < 3; j++) {
            let bigCell = document.createElement('div');
            bigCell.setAttribute("class", "the-main-cell");
            bigRow.appendChild(bigCell);
            
            // creates 3 inner rows in each big cell
            for (let y = 0; y < 3; y++) {
                let row = document.createElement('div');
                row.setAttribute("class", "the-row");
                bigCell.appendChild(row);
        
                // creates 3 cells per inner row
                for (let x = 0; x < 3; x++) {
                    let cell = document.createElement('input');
                    cell.setAttribute('class', 'the-cell')
                    cell.setAttribute('id', `${iIndex},${jIndex}`)
                    // update the value in a cell on user input
                    // cell.addEventListener('input', function (e) {
                        
                    // })
                    row.appendChild(cell);
                    jIndex++;
                }
                iIndex+=1;
                jIndex-=3;
            }
            iIndex-=3;
            jIndex+=3;
        }
        iIndex+=3;        
        jIndex-=9;
    }

    let slotsArray = generateSlots(difficultyLevel);
    // console.log(slotsArray);
    fillBoard(slotsArray);

    // button for finishing and checking the game
    // pressing the button calles the checkSolution() function
    let buttonDiv = document.createElement('div');
    buttonDiv.setAttribute('id','button-div');
    board.appendChild(buttonDiv);
    let checkButton = document.createElement('button');
    checkButton.innerText = 'Am I right?';
    checkButton.setAttribute('id', 'check-button');
    checkButton.setAttribute('onclick','checkSolution()')
    buttonDiv.appendChild(checkButton);
}

// get the values from the game board
const getSolution = () => {
    let filledMatrix = [];
    for (let i = 0; i < 9; i++) {
        filledMatrix.push([]);
        for (let j = 0; j < 9; j++) {
            let ID = `${i},${j}`;
            let cellValue = document.getElementById(ID).value;
            filledMatrix[i].push(cellValue)
        }    
    }
    return (filledMatrix)
}

// checks if the user is correct
const checkSolution = () => {
    let filledMatrix = getSolution();
    let playerWon = true;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (parseInt(filledMatrix[i][j]) !== solution[i][j]) {
                playerWon = false;                
            }
        }
    }

    if (playerWon) {
        alert('Congratulation! You have won!');
        choseLevel();
    } else {
        alert('Oh no... you have to try again');
        drawGame(chosenLevel);
    }
}

setLogin();

// drawGame();
// choseLevel();


