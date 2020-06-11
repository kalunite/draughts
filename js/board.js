const gameBoard = document.querySelector(`.game-board`);

function setPieces(kind, index) {
    document.querySelectorAll(`.row-${index} .active`).forEach(area => {
        let newPiece = document.createElement(`div`);
        newPiece.style.backgroundImage = `url(img/men-${kind}.png)`;
        newPiece.style.backgroundSize = `contain`;
        newPiece.style.margin = `auto`;
        newPiece.setAttribute(`draggable`, `false`);
        newPiece.classList.add(`piece-board`);
        newPiece.classList.add(`${kind}-piece`);
        area.appendChild(newPiece);
    });
};

// * set game board
gameBoard.innerHTML += /*html*/ `<table></table>`;
for (let ir = 1; ir <= 8; ir++) {
    document.querySelector(`table`).innerHTML += /*html*/ `<tr class="row-${ir}"></tr>`;
    for (let ic = 1; ic <= 8; ic++) {
        document.querySelector(`.row-${ir}`).innerHTML += /*html*/ `<td class="col-${ic}"></td>`;
        if (ir % 2 != 0 && ic % 2 == 0 || ir % 2 == 0 && ic % 2 != 0) {
            document.querySelector(`.row-${ir} .col-${ic}`).classList.add(`active`);
        };
    };
};

// * set pieces
for (let ir = 1; ir <= 3; ir++) {
    setPieces(`white`, ir);
};

for (let ir = 6; ir <= 8; ir++) {
    setPieces(`black`, ir);
};