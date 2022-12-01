const cell = document.querySelectorAll(".cell");
const field = document.getElementById("field");
const restartGameButton = document.getElementById("restartGame");
const cross = "X";
const nought = "O";

// Define game variables
let player = 1;
let gameOver = false;
let board_data = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

cell.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        placeMaker(index);
    });
});

// Function for placing markers
function placeMaker(index) {
    // Define colimn and row
    let col = index % 3
    let row = (index - col) / 3
        //Check if cell is empty
    if (board_data[row][col] == 0) {
        board_data[row][col] = player;
    }
    // Change player
    player *= -1;
    drawMarkers();
    checkResult();
}

function drawMarkers() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board_data[row][col] == 1) {
                cell[(row * 3) + col].classList.add("cross", "disable_block")
            } else if (board_data[row][col] == -1) {
                cell[(row * 3) + col].classList.add("nought", "disable_block")
            }
        }
    }
}

function checkResult() {
    for (let i = 0; i < 3; i++) {
        let rowSum = board_data[i][0] + board_data[i][1] + board_data[i][2]
        let colSum = board_data[0][i] + board_data[1][i] + board_data[2][i]
        let leftDiagonalSum = board_data[0][0] + board_data[1][1] + board_data[2][2]
        let rightDiagonalSum = board_data[0][2] + board_data[1][1] + board_data[0][3]
        if (rowSum == 3 || colSum == 3 || leftDiagonalSum == 3 || rightDiagonalSum == 3) {
            endGame(1);
        } else if (rowSum == -3 || colSum == -3 || leftDiagonalSum == -3 || rightDiagonalSum == -3) {
            endGame(2);
        }
    }
    if (board_data[0].indexOf(0) == -1 &&
        board_data[1].indexOf(0) == -1 &&
        board_data[2].indexOf(0) == -1) {
        endGame(0);
    }
}

function endGame(winner) {
    gameOver = true;
    const gameResultText = document.getElementById("gameResult");
    if (winner == 0) {
        gameResultText.innerText = "WOW, it's a TIE"
        field.classList.add("disable_block")
    } else {
        gameResultText.innerText = "Player №" + (winner) + " WIN!"
        field.classList.add("disable_block")
    }

    restartGameButton.style.visibility = 'visible'
    restartGameButton.classList.add("restartButton")
    restartGameButton.innerText = "Restart Game"
    restartGameButton.addEventListener("click", () => {
        // Refresh variables
        player = 1;
        gameOver = false;
        board_data = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        cell.forEach(cell => {
            cell.classList.remove('cross', 'nought', 'disable_block');
            field.classList.remove('disable_block');
        });
        gameResultText.innerText = ""
        restartGameButton.style.visibility = 'hidden'
        restartGameButton.classList.remove("restartButton")
        restartGameButton.innerText = ""
    });
}