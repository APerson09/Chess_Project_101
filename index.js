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
const clipArt = {
    "whiteQueen": "clipart303016.png",
    "whiteRook" : "clipart1682458.png",
    "whiteBishop" : "clipart1009099.png",
    "whiteKnight" : "clipart426997.png",
    "blackQueen" : "clipart1489784.png",
    "blackRook" : "clipart427480.png",
    "blackBishop" : "clipart2607314.png",
    "blackKnight" : "clipart2612722.png",
}

board.addEventListener("click", function(event) {
    let clickedElement = event.target;

    if(clickedElement.classList.contains("dot")) {
        clickedElement = clickedElement.parentElement;
    }
    
    if(selectedPiece) {
        if(clickedElement.classList.contains("white") || clickedElement.classList.contains("black")) {
            clearLegalMoves();
            const startingSquare = selectedPiece.parentElement;
            const startingRow = parseInt(startingSquare.dataset.row);
            const startingCol = parseInt(startingSquare.dataset.col);

            const targetRow = parseInt(clickedElement.dataset.row);
            const targetCol = parseInt(clickedElement.dataset.col);

            let validMove = false;

            if(selectedPiece.id.includes("Pawn")) {

                if(selectedPiece.id.includes("white")) {
                    if(startingRow === 6 && targetRow === 4 && startingCol === targetCol) {
                        const checkSquareForMovement = document.querySelector(`[data-row='5'][data-col='${startingCol}']`);

                        if(!clickedElement.querySelector("img") && checkSquareForMovement && !checkSquareForMovement.querySelector("img")) {
                            validMove = true;
                        }
                    }
                    else if(targetRow === startingRow - 1 && startingCol === targetCol) {
                        validMove = true;
                    }
                }
                else if(selectedPiece.id.includes("black")) {
                    if(startingRow === 1 && targetRow === 3 && startingCol === targetCol) {
                        const checkSquareForMovement = document.querySelector(`[data-row='2'][data-col='${startingCol}']`);

                        if(!clickedElement.querySelector("img") && checkSquareForMovement && !checkSquareForMovement.querySelector("img")) {
                            validMove = true;
                        }
                    }
                    else if(targetRow === startingRow + 1 && startingCol === targetCol) {
                        validMove = true;
                    }
                }

                if(validMove) {
                    checkMove(clickedElement);
                }
                else {
                    console.log("Invalid move for pawn.");
                }
            }
            else if(selectedPiece.id.includes("Bishop")) {
                const targetSquare = clickedElement.tagName === "IMG" ? clickedElement.parentElement : clickedElement;
                if(isValidBishop(startingRow, startingCol, targetRow, targetCol)) {
                    validMove = true;

                    if(clickedElement.children.length === 0) {
                        movePiece(clickedElement);
                    }
                    else {
                        console.log("Something is there. . .");
                    }
                }
                else {
                    console.log("Invalid move for bishop.");
                }
            }
            else if(selectedPiece.id.includes("Knight")) {
                if(isValidKnight(startingRow, startingCol, targetRow, targetCol)) {
                    validMove = true;

                    if(clickedElement.children.length === 0) {
                        movePiece(clickedElement);
                    }
                    else {
                        console.log("Something is there.");
                    }
                }
                else {
                    console.log("Invalid move for knight.");
                }
            }
            else if(selectedPiece.id.includes("Rook")) {
                if(isValidRook(startingRow, startingCol, targetRow, targetCol)) {
                    validMove = true;

                    if(clickedElement.children.length === 0) {
                        movePiece(clickedElement);
                    }
                    else {
                        console.log("Something is there. . .");
                    }
                }
                else {
                    console.log("Invalid move for rook.");
                }
            }
            else if(selectedPiece.id.includes("Queen")) {
                if(isValidBishop(startingRow, startingCol, targetRow, targetCol) || isValidRook(startingRow, startingCol, targetRow, targetCol)) {
                    validMove = true;
                    if(clickedElement.children.length === 0) {
                        movePiece(clickedElement);
                    }
                    else {
                        console.log("Something is there. . .");
                    }
                }
                else {
                    console.log("Invalid move for queen.");
                }
            }
            else if(selectedPiece.id.includes("King")) {
                if(isValidKing(startingRow, startingCol, targetRow, targetCol)) {
                    validMove = true;
                    if(clickedElement.children.length === 0) {
                        movePiece(clickedElement);
                    }
                    else {
                        console.log("Something is there. . .");
                    }
                }
                else {
                    console.log("Invalid move for king.");
                }
            }
            else {
                checkMove(clickedElement);
            }
        }
        else if(clickedElement.tagName === "IMG") {

            if(clickedElement === selectedPiece) {

                selectedPiece = null;
                clearLegalMoves();
                console.log("Deselected piece");
            }
            else if(clickedElement.parentElement === selectedPiece.parentElement) {
                selectedPiece = null;
                clearLegalMoves();
                console.log("Deselected piece");
            }
            else if(selectedPiece.id.includes("white") && clickedElement.id.includes("white") || selectedPiece.id.includes("black") && clickedElement.id.includes("black")) {
                selectedPiece.classList.remove("selected");
                selectedPiece = clickedElement;
                selectedPiece.classList.add("selected");
                showLegalMoves(selectedPiece);
                console.log("Switched selection to:", selectedPiece);
            }
            else {
                const parentSquare = clickedElement.parentElement;
                const targetRow = parseInt(parentSquare.dataset.row);
                const targetCol = parseInt(parentSquare.dataset.col);

                const startingSquare = selectedPiece.parentElement;
                const startingRow = parseInt(startingSquare.dataset.row);
                const startingCol = parseInt(startingSquare.dataset.col);

                let capture = true;

                if(selectedPiece.id.includes("Pawn")) {
                    if(targetCol === startingCol) {
                        capture = false;
                        console.log("invalid move");
                    }
                }
                else {
                    let validMove = false;

                    if(selectedPiece.id.includes("Bishop")) {
                        if(isValidBishop(startingRow, startingCol, targetRow, targetCol)) {
                            validMove = true;
                        }
                    }
                    if(selectedPiece.id.includes("Knight")) {
                        if(isValidKnight(startingRow, startingCol, targetRow, targetCol)) {
                            validMove = true;
                        }
                    }
                    if(selectedPiece.id.includes("Rook")) {
                        if(isValidRook(startingRow, startingCol, targetRow, targetCol)) {
                            validMove = true;
                        }
                    }
                    if(selectedPiece.id.includes("Queen")) {
                        if(isValidBishop(startingRow, startingCol, targetRow, targetCol) || isValidRook(startingRow, startingCol, targetRow, targetCol)) {
                            validMove = true;
                        } 
                    }
                    if(selectedPiece.id.includes("King")) {
                        if(isValidKing(startingRow, startingCol, targetRow, targetCol)) {
                            validMove = true;
                        }
                    }
                    else if(selectedPiece.id.includes("white")) {
                        if(targetRow === startingRow - 1 && targetCol === startingCol) {
                            validMove = true;
                        }
                    }
                    else if(selectedPiece.id.includes("black")) { 
                            if(targetRow === startingRow + 1 && targetCol === startingCol) {
                                validMove = true;
                            }
                    }
                    capture = validMove;
                } 
                if(capture) {
                    capturePiece(parentSquare, clickedElement);
                }
            }
        }
    }
    else if(clickedElement.tagName === "IMG") {
        selectedPiece = clickedElement;
        selectedPiece.classList.add("selected");
        showLegalMoves(selectedPiece);
        console.log("Selected piece:", selectedPiece);
    }
})

function checkMove(targetSquare) {
    if(targetSquare.children.length === 0) {
        movePiece(targetSquare);
    }
    else {
        console.log("Square is occupied. Cannot move piece.");
    }
}

function movePiece(targetSquare) {
    targetSquare.appendChild(selectedPiece);

    if(selectedPiece.id.includes("Pawn")) {
        const targetRow = parseInt(targetSquare.dataset.row);
        const isWhite = selectedPiece.id.includes("white");

        const promotePiece = selectedPiece;
        if((isWhite && targetRow === 0) || (!isWhite && targetRow === 7)) {
            promotionMenu(targetSquare, isWhite, (chosenPiece) => {
                promotePiece.src = clipArt[`${isWhite ? "white" : "black"}${chosenPiece}`];
                promotePiece.id = `${isWhite ? "white" : "black"}-${chosenPiece}`;
                
                promotePiece.classList.remove("piece", "pawn", "rook", "bishop", "horse", "queen", "king");
                
                const cssClass = chosenPiece === "Knight" ? "horse" : chosenPiece.toLowerCase();
                promotePiece.classList.add("piece", cssClass);
            });
            console.log("Hooray");
        } 
    }
    if(selectedPiece.classList.contains("selected")) {
        selectedPiece.classList.remove("selected");
    }
    selectedPiece = null;
    console.log("Piece moved to:", targetSquare);
}

function capturePiece(targetSquare, enemyPiece) {
    enemyPiece.remove();
    targetSquare.appendChild(selectedPiece);

    const promotePiece = selectedPiece;
    if(promotePiece.id.includes("Pawn")) {
        const targetRow = parseInt(targetSquare.dataset.row);
        const isWhite = selectedPiece.id.includes("white");

        if((isWhite && targetRow === 0) || (!isWhite && targetRow === 7)) {
            promotionMenu(targetSquare, isWhite, (chosenPiece) => {
                promotePiece.src = clipArt[`${isWhite ? "white" : "black"}${chosenPiece}`];
                promotePiece.id = `${isWhite ? "white" : "black"}-${chosenPiece}`;
                
                promotePiece.classList.remove("piece", "pawn", "rook", "bishop", "horse", "queen", "king");
                
                const cssClass = chosenPiece === "Knight" ? "horse" : chosenPiece.toLowerCase();
                promotePiece.classList.add("piece", cssClass);
            });
            console.log("Hooray");
        } 
    }

    if(promotePiece.classList.contains("selected")) {
        promotePiece.classList.remove("selected");
    }
    console.log("Captured piece:", enemyPiece);
    selectedPiece = null;
    clearLegalMoves();
}

function isValidBishop(startingRow, startingCol, targetRow, targetCol) {
    const rowDiff = targetRow - startingRow;
    const colDiff = targetCol - startingCol;

    if(rowDiff === 0 && colDiff === 0) {
        return false;
    }

    if(Math.abs(rowDiff) != Math.abs(colDiff)) {
        return false;
    }

    const rowStep = rowDiff > 0 ? 1 : -1;
    const colStep = colDiff > 0 ? 1 : -1;

    let currentRow = startingRow + rowStep;
    let currentCol = startingCol + colStep;

    while(currentRow !== targetRow && currentCol !== targetCol) {
        if(currentRow === targetRow && currentCol === targetCol) {
            break;
        }
        const square = document.querySelector(`[data-row='${currentRow}'][data-col='${currentCol}']`);

        if(square && square.querySelector("img")) {
            return false;
        }
        currentRow += rowStep;
        currentCol += colStep;
    }
    return true;
}

function isValidKnight(startingRow, startingCol, targetRow, targetCol) {
    const rowDiff = Math.abs(targetRow - startingRow);
    const colDiff = Math.abs(targetCol - startingCol);

    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}

function isValidRook(startingRow, startingCol, targetRow, targetCol) {
    const rowDiff = targetRow - startingRow;
    const colDiff = targetCol - startingCol;

    if(rowDiff !== 0 && colDiff !== 0) {
        return false;
    }
    if(rowDiff === 0 && colDiff === 0) {
        return false;
    }

    const rowStep = rowDiff > 0 ? 1 : (rowDiff < 0 ? -1 : 0);
    const colStep = colDiff > 0 ? 1 : (colDiff < 0 ? -1 : 0);

    let currRow = startingRow + rowStep;
    let currCol = startingCol + colStep;

    while(currRow !== targetRow || currCol !== targetCol) {
        if(currRow === targetRow && currCol === targetCol) {
            break;
        }
        const square = document.querySelector(`[data-row='${currRow}'][data-col='${currCol}']`);

        if(square && square.querySelector("img")) {
            return false;
        }

        currRow += rowStep;
        currCol += colStep;
    }
    return true;
}

function isValidKing(startingRow, startingCol, targetRow, targetCol) {
    const rowDiff = Math.abs(targetRow - startingRow);
    const colDiff = Math.abs(targetCol - startingCol);

    if(rowDiff === 0 && colDiff === 0) {
        return false;
    }
    return rowDiff <= 1 && colDiff <= 1;
}

function showLegalMoves(piece) {
    clearLegalMoves();
    const startingSquare = piece.parentElement;
    const startingRow = parseInt(startingSquare.dataset.row);
    const startingCol = parseInt(startingSquare.dataset.col);
    const pieceColor = piece.id.includes("white") ? "white" : "black";

    const allSquares = document.querySelectorAll(".white, .black");

    allSquares.forEach(square => {
        const targetRow = parseInt(square.dataset.row);
        const targetCol = parseInt(square.dataset.col);
        isLegal = false;
        if(piece.id.includes("Pawn")) {
            if(piece.id.includes("white")) {
                if(startingRow === 6 && targetRow === 4 && startingCol === targetCol) {
                    const checkSquareForMovement = document.querySelector(`[data-row='5'][data-col='${startingCol}']`);

                    if(!square.querySelector("img") && checkSquareForMovement && !checkSquareForMovement.querySelector("img")) {
                        isLegal = true;
                    }
                }
                else if(targetRow === startingRow - 1 && startingCol === targetCol) {
                    if(!square.querySelector("img")) {
                        isLegal = true;
                    }
                }
            }
            else if(piece.id.includes("black")) {
                if(startingRow === 1 && targetRow === 3 && startingCol === targetCol) {
                    const checkSquareForMovement = document.querySelector(`[data-row='2'][data-col='${startingCol}']`);

                    if(!square.querySelector("img") && checkSquareForMovement && !checkSquareForMovement.querySelector("img")) {
                        isLegal = true;
                    }
                }
                else if(targetRow === startingRow + 1 && startingCol === targetCol) {
                    if(!square.querySelector("img")) {
                        isLegal = true;
                    }
                }
            }
        }
        else if(piece.id.includes("Bishop")) {
            if(isValidBishop(startingRow, startingCol, targetRow, targetCol)) {
                isLegal = true;
            }
        }
        else if(piece.id.includes("Knight")) {
            if(isValidKnight(startingRow, startingCol, targetRow, targetCol)) {
                isLegal = true;
            }
        }
        else if(piece.id.includes("Rook")) {
            if(isValidRook(startingRow, startingCol, targetRow, targetCol)) {
                isLegal = true;
            }
        }
        else if(piece.id.includes("Queen")) {
            if(isValidRook(startingRow, startingCol, targetRow, targetCol) || isValidBishop(startingRow, startingCol, targetRow, targetCol)) {
                isLegal = true;
            }
        }
        else if(piece.id.includes("King")) {
            if(isValidKing(startingRow, startingCol, targetRow, targetCol)) {
                isLegal = true;
            }
        }

        if(isLegal && square.children.length > 0) {
            const occupant = square.firstElementChild;
            const isFriendly = (piece.id.includes("white") && occupant.id.includes("white") || piece.id.includes("black") && occupant.id.includes("black"));
        if(isFriendly) {
            isLegal = false;
        }
    }

        if(isLegal) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            square.appendChild(dot);
        }
    });
}

function clearLegalMoves() {
    const legalDots = document.querySelectorAll(".dot");
    legalDots.forEach(dot => dot.remove());
}

function promotionMenu(targetSquare, isWhite, callback) {
    const menu = document.createElement("div");
    
    menu.style.position = "absolute";
    menu.style.top = "0";
    menu.style.left = "0";
    menu.style.width = "100%";
    menu.style.height = "100%";
    
    menu.style.display = "grid";
    menu.style.gridTemplateColumns = "50% 50%";
    menu.style.gridTemplateRows = "50% 50%";
    menu.style.backgroundColor = "rgba(40, 40, 40, 0.95)";
    menu.style.border = "2px solid #d4af37";
    menu.style.zIndex = "1000";
    menu.style.boxSizing = "border-box";

    const pieces = ["Queen", "Rook", "Bishop", "Knight"];

    pieces.forEach(pieceName => {
        const img = document.createElement("img");
        const colorPrefix = isWhite ? "white" : "black";
        const pieceKey = `${colorPrefix}${pieceName}`;

        img.src = clipArt[pieceKey];
        img.id = `${colorPrefix}-${pieceName}`;
        
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "contain";
        img.style.cursor = "pointer";
        img.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        img.style.boxSizing = "border-box";
        img.style.border = "1px solid #555";

        img.addEventListener("click", () => {
            callback(pieceName);
            menu.remove();
        });

        menu.appendChild(img);
    });

    targetSquare.appendChild(menu);
}