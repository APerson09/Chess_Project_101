const board = document.getElementById("mainBoardArea")

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
    }
}

