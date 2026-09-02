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
        newSquare.dataset.row = i;
        newSquare.dataset.col = j;

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
            clonePawn.id = "blackPawn" + j;
            newSquare.appendChild(clonePawn);
        }
        if(i === 6) {
            whitePawn.remove();
            const clonePawn2 = whitePawn.cloneNode(true);
            clonePawn2.id = "whitePawn" + j;
            newSquare.appendChild(clonePawn2);
        }
        if(i === 0 && (j === 2 || j === 5)) {
            blackBishop.remove();
            const cloneBishop = blackBishop.cloneNode(true);
            cloneBishop.id = "blackBishop" + j;
            newSquare.appendChild(cloneBishop);
        }
        if(i === 7 && (j === 2 || j === 5)) {
            whiteBishop.remove();
            const cloneBishop2 = whiteBishop.cloneNode(true);
            cloneBishop2.id = "whiteBishop" + j;        
            newSquare.appendChild(cloneBishop2);
        }
        if(i === 0 && (j === 1 || j === 6)) {
            blackKnight.remove();
            const cloneKnight = blackKnight.cloneNode(true);
            cloneKnight.id = "blackKnight" + j;
            newSquare.appendChild(cloneKnight);
        }
        if(i === 7 && (j === 1 || j === 6)) {
            whiteKnight.remove();
            const cloneKnight2 = whiteKnight.cloneNode(true);
            cloneKnight2.id = "whiteKnight" + j;
            newSquare.appendChild(cloneKnight2);
        }
        if(i === 0 && (j === 0 || j === 7)) {
            blackRook.remove();
            const cloneRook = blackRook.cloneNode(true);
            cloneRook.id = "blackRook" + j;
            newSquare.appendChild(cloneRook);
        }
        if(i === 7 && (j === 0 || j === 7)) {
            whiteRook.remove();
            const cloneRook2 = whiteRook.cloneNode(true);
            cloneRook2.id = "whiteRook" + j;
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

let selectedPiece = null;

board.addEventListener("click", function(event) {
    const clickedElement = event.target;

    if(selectedPiece) {
        if(clickedElement.classList.contains("white") || clickedElement.classList.contains("black")) {
            const startingSquare = selectedPiece.parentElement;
            const startingRow = parseInt(startingSquare.dataset.row);
            const startingCol = parseInt(startingSquare.dataset.col);

            const targetRow = parseInt(clickedElement.dataset.row);
            const targetCol = parseInt(clickedElement.dataset.col);

            if(selectedPiece.id.includes("Pawn")) {
                let validMove = false;

                if(selectedPiece.id.includes("white")) {
                    if(startingRow === 6 && targetRow === 4 && startingCol === targetCol) {
                        validMove = true;
                    }
                    else if(targetRow === startingRow - 1 && startingCol === targetCol) {
                        validMove = true;
                    }
                }
                else if(selectedPiece.id.includes("black")) {
                    if(startingRow === 1 && targetRow === 3 && startingCol === targetCol) {
                        validMove = true;
                    }
                    else if(targetRow === startingRow + 1 && startingCol === targetCol) {
                        validMove = true;
                    }
                }

                if(validMove) {
                    if(clickedElement.children.length === 0) {
                        clickedElement.appendChild(selectedPiece);
                        if(selectedPiece.classList.contains("selected")) {
                            selectedPiece.classList.remove("selected");
                        }
                        selectedPiece = null;
                        console.log("Piece moved to:", clickedElement);
                    }
                    else {
                        console.log("Square is occupied. Cannot move piece.");
                    }
                }
                else {
                    console.log("Invalid move for pawn.");
                }
            }
            else {
                if(clickedElement.children.length === 0) {
                    clickedElement.appendChild(selectedPiece);
                    if(selectedPiece.classList.contains("selected")) {
                        selectedPiece.classList.remove("selected");
                    }
                    selectedPiece = null;
                    console.log("Piece moved to:", clickedElement);
                }
                else {
                    console.log("Square is occupied. Cannot move piece.");
                }
            }
        }
        else if(clickedElement.tagName === "IMG") {
            
            if(clickedElement === selectedPiece) {
                selectedPiece = null;
                console.log("Deselected piece");
            }
            else if(clickedElement.parentElement === selectedPiece.parentElement) {
                selectedPiece = null;
                console.log("Deselected piece");
            }
            else if(selectedPiece.id.includes("white") && clickedElement.id.includes("white")) {
                selectedPiece.classList.remove("selected");
                selectedPiece = clickedElement;
                selectedPiece.classList.add("selected");
                console.log("Selected piece: white", selectedPiece);
            }
            else if(selectedPiece.id.includes("black") && clickedElement.id.includes("black")) {
                selectedPiece.classList.remove("selected");
                selectedPiece = clickedElement;
                selectedPiece.classList.add("selected");
                console.log("Selected piece: black", selectedPiece);
            }
            else {
                const parentSquare = clickedElement.parentElement;
                clickedElement.remove();
                parentSquare.appendChild(selectedPiece);
                selectedPiece = null;
                console.log("Piece moved to:", parentSquare);
            }
        }
    }
    else if(clickedElement.tagName === "IMG") {
        selectedPiece = clickedElement;
        selectedPiece.classList.add("selected");
        console.log("Selected piece:", selectedPiece);
    }
})