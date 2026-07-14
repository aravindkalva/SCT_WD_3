const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

const playerModeBtn = document.getElementById("playerMode");
const computerModeBtn = document.getElementById("computerMode");


let board = ["","","","","","","","",""];

let currentPlayer = "X";

let gameActive = true;

let computerMode = false;



const winningPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];



// Player Click

cells.forEach(cell => {

    cell.addEventListener("click",()=>{

        let index = cell.dataset.index;


        if(board[index] !== "" || !gameActive){
            return;
        }


        makeMove(index,currentPlayer);


        if(computerMode && gameActive){

            setTimeout(computerMove,500);

        }

    });

});



// Make move

function makeMove(index,player){

    board[index]=player;

    cells[index].textContent=player;

    cells[index].classList.add(player.toLowerCase());


    checkWinner();


    if(gameActive){

        currentPlayer =
        currentPlayer==="X" ? "O":"X";


        statusText.textContent =
        `Player ${currentPlayer}'s Turn`;

    }

}



// Check winner

function checkWinner(){


    for(let pattern of winningPatterns){


        let a=pattern[0];

        let b=pattern[1];

        let c=pattern[2];


        if(
            board[a] &&
            board[a]===board[b] &&
            board[a]===board[c]
        ){

            statusText.textContent =
            `Player ${board[a]} Wins!`;

            gameActive=false;

            return;

        }

    }



    if(!board.includes("")){

        statusText.textContent="It's a Draw!";

        gameActive=false;

    }

}



// Computer Move

function computerMove(){


    let empty=[];


    board.forEach((cell,index)=>{

        if(cell===""){

            empty.push(index);

        }

    });



    if(empty.length===0)
    return;



    let randomIndex =
    empty[Math.floor(Math.random()*empty.length)];


    makeMove(randomIndex,"O");

}



// Restart

restartBtn.addEventListener("click",()=>{

    board=["","","","","","","","",""];

    currentPlayer="X";

    gameActive=true;


    cells.forEach(cell=>{

        cell.textContent="";

        cell.className="cell";

    });


    statusText.textContent="Player X's Turn";

});



// Modes

playerModeBtn.addEventListener("click",()=>{

    computerMode=false;

    restartBtn.click();

    statusText.textContent="Player X's Turn";

});



computerModeBtn.addEventListener("click",()=>{

    computerMode=true;

    restartBtn.click();

    statusText.textContent="Your Turn (X)";

});