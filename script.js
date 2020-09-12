const squareBoxes = document.querySelectorAll('.square');
const board = document.getElementById('board');
const winnigMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const playAgainButton = document.getElementById('play-again-button');

let oTurn;
const X_CLASS = 'x'
const O_CLASS = 'o'

// conditions when someone wins (using indices)
const WIN_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

playAgainButton.addEventListener('click', startGame);

startGame();

function startGame(){
    // remove previously set attributes and add new required ones
    oTurn=false;

    squareBoxes.forEach(sq => {
        sq.classList.remove(X_CLASS);
        sq.classList.remove(O_CLASS);
        sq.removeEventListener('click', handleClick);
        sq.addEventListener('click', handleClick, {once: true});
    })

    setBoardHoverClass();

    winningMessageElement.classList.remove('show');
}

function handleClick(eve){
    const sq = eve.target;
    const current_class = oTurn? O_CLASS: X_CLASS;

    // place the mark
    placeMark(sq, current_class);

    // check for win or draw
    if(checkWin(current_class)){
        // argumet is whether ot is a draw or not
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
    else{
        // swith turn
        switchTurn();
        setBoardHoverClass();
    }
}
function placeMark(sq, current_class){
    sq.classList.add(current_class);
}

function switchTurn(){
    oTurn = !oTurn;
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);

    if(oTurn){
        board.classList.add(O_CLASS);
    }
    else{
        board.classList.add(X_CLASS);
    }
}

function checkWin(current_class){

    // check for all combinations 
    return WIN_COMBINATIONS.some(
        combination => {
            // check for eech combination
            return combination.every(
                index =>{
                    // if each index of board has same class
                    return squareBoxes[index]
                            .classList.contains(current_class)
                }
            )
        }
    )

    // if all the 3 cell in any one of the combination
    //  then it is a win
}

function isDraw(){
    // check if every square is filled
    return [...squareBoxes].every(
        sq => {
            return sq.classList.contains(X_CLASS) ||
                    sq.classList.contains(O_CLASS);
        }
    )
}

function endGame(draw){
    if(draw){
        winnigMessageTextElement.innerText = `It's a Draw!!!`
    }
    else{
        winnigMessageTextElement.innerText = `${oTurn? "O" : "X"} Wins!!!`
    }

    winningMessageElement.classList.add('show');
}