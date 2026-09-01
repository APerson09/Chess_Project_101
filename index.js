const board = document.getElementById("mainBoardArea")
const whiteKing = document.getElementById("whiteKing")
const blackKing = document.getElementById("blackKing")
const whiteQueen = document.getElementById("whiteQueen")
const blackQueen = document.getElementById("blackQueen")
const whiteBishop = document.getElementById("whiteBishop")
const blackBishop = document.getElementById("blackBishop")
const whiteKnight = document.getElementById("whiteKnight")
const blackKnight = document.getElementById("blackKnight")
const whiteRook = document.getElementById("whiteRook")
const blackRook = document.getElementById("blackRook")
const whitePawn = document.getElementById("whitePawn")
const blackPawn = document.getElementById("blackPawn")

for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
        const newSquare = document.createElement('div');
        if((i+j) % 2 === 0) {
            newSquare.classList.add("white");
        }
        else {
            newSquare.classList.add("black");
        }
        board.appendChild(newSquare);
        
        if(i === 1) {
            blackPawn.remove();
            const clonePawn = blackPawn.cloneNode(true);
            newSquare.appendChild(clonePawn);
        }
        if(i === 6) {
            whitePawn.remove();
            const clonePawn2 = whitePawn.cloneNode(true);
            newSquare.appendChild(clonePawn2);
        }
        if(i === 0 && (j === 2 || j === 5)) {
            blackBishop.remove();
            const cloneBishop = blackBishop.cloneNode(true);
            newSquare.appendChild(cloneBishop);
        }
        if(i === 7 && (j === 2 || j === 5)) {
            whiteBishop.remove();
            const cloneBishop2 = whiteBishop.cloneNode(true);
            newSquare.appendChild(cloneBishop2);
        }
        if(i === 0 && (j === 1 || j === 6)) {
            blackKnight.remove();
            const cloneKnight = blackKnight.cloneNode(true);
            newSquare.appendChild(cloneKnight);
        }
        if(i === 7 && (j === 1 || j === 6)) {
            whiteKnight.remove();
            const cloneKnight2 = whiteKnight.cloneNode(true);
            newSquare.appendChild(cloneKnight2);
        }
        if(i === 0 && (j === 0 || j === 7)) {
            blackRook.remove();
            const cloneRook = blackRook.cloneNode(true);
            newSquare.appendChild(cloneRook);
        }
        if(i === 7 && (j === 0 || j === 7)) {
            whiteRook.remove();
            const cloneRook2 = whiteRook.cloneNode(true);
            newSquare.appendChild(cloneRook2);
        }
        if(i === 0 && j === 3) {
            newSquare.appendChild(blackQueen);
        }
        if(i === 7 && j === 3) {
            newSquare.appendChild(whiteQueen);
        }
        if(i === 0 && j === 4) {
            newSquare.appendChild(blackKing);
        }
        if(i === 7 && j === 4) {
            newSquare.appendChild(whiteKing); 
        }
    }
}

