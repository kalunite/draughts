const activeZone = Array.from(document.querySelectorAll(`.active`));

let p1 = {
    name: `Hitam`,
    kind: `black`,
    logo: Array.from(document.querySelectorAll(`.black-logo`)),
    pieces: Array.from(document.querySelectorAll(`.black-piece`)),
    areas: [
        ...Array.from(document.querySelectorAll(`.row-6 .active`)),
        ...Array.from(document.querySelectorAll(`.row-7 .active`)),
        ...Array.from(document.querySelectorAll(`.row-8 .active`))
    ],
    crownHeads: Array.from(document.querySelectorAll(`.row-1 .active`)),
    timer: Array.from(document.querySelectorAll(`.black-progress`)),
    score: Array.from(document.querySelectorAll(`.black-panel .score`))
};

let p2 = {
    name: `Putih`,
    kind: `white`,
    logo: Array.from(document.querySelectorAll(`.white-logo`)),
    pieces: Array.from(document.querySelectorAll(`.white-piece`)),
    areas: [
        ...Array.from(document.querySelectorAll(`.row-1 .active`)),
        ...Array.from(document.querySelectorAll(`.row-2 .active`)),
        ...Array.from(document.querySelectorAll(`.row-3 .active`))
    ],
    crownHeads: Array.from(document.querySelectorAll(`.row-8 .active`)),
    timer: Array.from(document.querySelectorAll(`.white-progress`)),
    score: Array.from(document.querySelectorAll(`.white-panel .score`))
};

let targetArr = [];
let playersArr = [];
let enemyArr = [];
let jumpArr = [];
let jumpsArr = [
    [],
    [],
    [],
    []
];
let enemyJumpedArr = [];
let p1IsNext = true;
let jumpingPiece;

function menTarget(player, areaFrom) {
    targetArr = [];
    enemyArr = [];
    jumpArr = [];
    for (let ir = 1; ir <= 8; ir++) {
        for (let ic = 1; ic <= 8; ic++) {
            if (areaFrom == document.querySelector(`.row-${ir} .col-${ic}.active`)) {
                if (player == p1) {
                    targetArr.push(document.querySelector(`.row-${ir-1} .col-${ic-1}.active`), document.querySelector(`.row-${ir-1} .col-${ic+1}.active`));
                } else if (player == p2) {
                    targetArr.push(document.querySelector(`.row-${ir+1} .col-${ic-1}.active`), document.querySelector(`.row-${ir+1} .col-${ic+1}.active`));
                };
                pushTargetRange(enemyArr, ir, ic, 1);
                enemyArr = enemyArr.filter(move => move != null && move.innerHTML != `` && !move.firstChild.classList.contains(`${player.kind}-piece`) && !move.firstChild.classList.contains(`jumped`));
                if (enemyArr.includes(document.querySelector(`.row-${ir-1} .col-${ic-1}.active`))) {
                    jumpArr.push(document.querySelector(`.row-${ir-2} .col-${ic-2}.active`));
                };
                if (enemyArr.includes(document.querySelector(`.row-${ir-1} .col-${ic+1}.active`))) {
                    jumpArr.push(document.querySelector(`.row-${ir-2} .col-${ic+2}.active`));
                };
                if (enemyArr.includes(document.querySelector(`.row-${ir+1} .col-${ic-1}.active`))) {
                    jumpArr.push(document.querySelector(`.row-${ir+2} .col-${ic-2}.active`));
                };
                if (enemyArr.includes(document.querySelector(`.row-${ir+1} .col-${ic+1}.active`))) {
                    jumpArr.push(document.querySelector(`.row-${ir+2} .col-${ic+2}.active`));
                };
                targetArr = [...targetArr, ...jumpArr];
                targetArr = targetArr.filter(move => move != null && move.innerHTML == ``);
                return targetArr;
            };
        };
    };
};

function kingTarget(player, areaFrom) {
    targetArr = [];
    playersArr = [];
    enemyArr = [];
    jumpsArr = [
        [],
        [],
        [],
        []
    ];
    jumpArr = [];
    let checkedArr;
    let checkingBlankArr = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length == 0) {
                return arr[i];
            };
        };
    };
    for (let ir = 1; ir <= 8; ir++) {
        for (let ic = 1; ic <= 8; ic++) {
            if (areaFrom == document.querySelector(`.row-${ir} .col-${ic}.active`)) {
                for (let range = 1; range <= 7; range++) {
                    pushTargetRange(playersArr, ir, ic, range);
                };
                pushTargetRange(targetArr, ir, ic, 1);
                targetArr = targetArr.filter(move => move != null && move.innerHTML == ``);
                playersArr = playersArr.filter(move => move != null && move.innerHTML != ``);
                for (let range = 1; range <= 7; range++) {
                    enemyArr.push(document.querySelector(`.row-${ir-range} .col-${ic-range}.active`));
                    if (playersArr.includes(document.querySelector(`.row-${ir-range} .col-${ic-range}.active`))) {
                        range = 7;
                    };
                };
                for (let range = 1; range <= 7; range++) {
                    enemyArr.push(document.querySelector(`.row-${ir-range} .col-${ic+range}.active`));
                    if (playersArr.includes(document.querySelector(`.row-${ir-range} .col-${ic+range}.active`))) {
                        range = 7;
                    };
                };
                for (let range = 1; range <= 7; range++) {
                    enemyArr.push(document.querySelector(`.row-${ir+range} .col-${ic-range}.active`));
                    if (playersArr.includes(document.querySelector(`.row-${ir+range} .col-${ic-range}.active`))) {
                        range = 7;
                    };
                };
                for (let range = 1; range <= 7; range++) {
                    enemyArr.push(document.querySelector(`.row-${ir+range} .col-${ic+range}.active`));
                    if (playersArr.includes(document.querySelector(`.row-${ir+range} .col-${ic+range}.active`))) {
                        range = 7;
                    };
                };
                enemyArr = enemyArr.filter(move => move != null && move.innerHTML != `` && !move.firstChild.classList.contains(`${player.kind}-piece`) && !move.firstChild.classList.contains(`jumped`));
                checkedArr = checkingBlankArr(jumpsArr);
                for (let range = 1; range <= 7; range++) {
                    if (enemyArr.includes(document.querySelector(`.row-${ir-range} .col-${ic-range}.active`))) {
                        for (let range2 = 1; range2 <= 7; range2++) {
                            jumpArr.push(document.querySelector(`.row-${ir-range-range2} .col-${ic-range-range2}`));
                            checkedArr.push(document.querySelector(`.row-${ir-range-range2} .col-${ic-range-range2}`));
                            if (playersArr.includes(document.querySelector(`.row-${ir-range-range2} .col-${ic-range-range2}`))) {
                                range2 = 7;
                            };
                        };
                        range = 7;
                    } else if (playersArr.includes(document.querySelector(`.row-${ir-range} .col-${ic-range}.active`))) {
                        range = 7;
                    };
                };
                checkedArr = checkingBlankArr(jumpsArr);
                for (let range = 1; range <= 7; range++) {
                    if (enemyArr.includes(document.querySelector(`.row-${ir-range} .col-${ic+range}.active`))) {
                        for (let range2 = 1; range2 <= 7; range2++) {
                            jumpArr.push(document.querySelector(`.row-${ir-range-range2} .col-${ic+range+range2}`));
                            checkedArr.push(document.querySelector(`.row-${ir-range-range2} .col-${ic+range+range2}`));
                            if (playersArr.includes(document.querySelector(`.row-${ir-range-range2} .col-${ic+range+range2}`))) {
                                range2 = 7;
                            };
                        };
                        range = 7;
                    } else if (playersArr.includes(document.querySelector(`.row-${ir-range} .col-${ic+range}.active`))) {
                        range = 7;
                    };
                };
                checkedArr = checkingBlankArr(jumpsArr);
                for (let range = 1; range <= 7; range++) {
                    if (enemyArr.includes(document.querySelector(`.row-${ir+range} .col-${ic-range}.active`))) {
                        for (let range2 = 1; range2 <= 7; range2++) {
                            jumpArr.push(document.querySelector(`.row-${ir+range+range2} .col-${ic-range-range2}`));
                            checkedArr.push(document.querySelector(`.row-${ir+range+range2} .col-${ic-range-range2}`));
                            if (playersArr.includes(document.querySelector(`.row-${ir+range+range2} .col-${ic-range-range2}`))) {
                                range2 = 7;
                            };
                        };
                        range = 7;
                    } else if (playersArr.includes(document.querySelector(`.row-${ir+range} .col-${ic-range}.active`))) {
                        range = 7;
                    };
                };
                checkedArr = checkingBlankArr(jumpsArr);
                for (let range = 1; range <= 7; range++) {
                    if (enemyArr.includes(document.querySelector(`.row-${ir+range} .col-${ic+range}.active`))) {
                        for (let range2 = 1; range2 <= 7; range2++) {
                            jumpArr.push(document.querySelector(`.row-${ir+range+range2} .col-${ic+range+range2}`));
                            checkedArr.push(document.querySelector(`.row-${ir+range+range2} .col-${ic+range+range2}`));
                            if (playersArr.includes(document.querySelector(`.row-${ir+range+range2} .col-${ic+range+range2}`))) {
                                range2 = 7;
                            };
                        };
                        range = 7;
                    } else if (playersArr.includes(document.querySelector(`.row-${ir+range} .col-${ic+range}.active`))) {
                        range = 7;
                    };
                };
                for (let i = 0; i < jumpsArr.length; i++) {
                    jumpsArr[i] = jumpsArr[i].filter(move => move != null && move.innerHTML == ``);
                };
                targetArr = [...targetArr, ...jumpArr];
                targetArr = targetArr.filter(move => move != null && move.innerHTML == ``);
                return targetArr;
            };
        };
    };
};

function pushTargetRange(targets, x, y, range) {
    return targets.push(document.querySelector(`.row-${x-range} .col-${y-range}.active`), document.querySelector(`.row-${x-range} .col-${y+range}.active`), document.querySelector(`.row-${x+range} .col-${y-range}.active`), document.querySelector(`.row-${x+range} .col-${y+range}.active`));
};

function turnOver(player, playerColor, enemy) {
    player.logo.forEach(l => {
        l.style.boxShadow = `0 0 25px 25px ${playerColor}`;
    });
    enemy.logo.forEach(l => {
        l.style.boxShadow = ``;
    });
};

function checkingMoveBlock(player, enemy) {
    let checkArr = [];
    player.pieces.forEach(p => {
        if (!p.classList.contains(`king`)) {
            checkArr.push(menTarget(player, p.parentNode).length);
        } else if (p.classList.contains(`king`)) {
            checkArr.push(kingTarget(player, p.parentNode).length);
        }
    });
    checkArr = checkArr.reduce((pv, cv) => pv + cv);
    if (checkArr == 0 && enemy.score.filter(s => !s.classList.contains(`mobile`))[0].childElementCount == 12) {
        return gameEnd(enemy.kind, `${enemy.name} MENANG !!!`, `Keping ${player.name} telah habis`);
    } else if (checkArr == 0) {
        return gameEnd(enemy.kind, `${enemy.name} MENANG !!!`, `Gerakan ${player.name} telah terblokir`);
    } else if (
        Array.from(document.querySelectorAll(`.${enemy.kind}-piece`)).filter(p => !p.classList.contains(`king`)).length == 0 &&
        countingKingsBack(enemy) == Array.from(document.querySelectorAll(`.${enemy.kind}-piece`)).filter(p => p.classList.contains(`king`)).length
    ) {
        return gameEnd(enemy.kind, `${enemy.name} MENANG !!!`, `Raja ${enemy.name} telah kembali`);
    } else if (
        Array.from(document.querySelectorAll(`.${player.kind}-piece`)).filter(p => !p.classList.contains(`king`)).length == 0 &&
        countingKingsBack(player) == Array.from(document.querySelectorAll(`.${player.kind}-piece`)).filter(p => p.classList.contains(`king`)).length
    ) {
        return gameEnd(player.kind, `${player.name} MENANG !!!`, `Raja ${player.name} telah kembali`);
    };
};

function countingKingsBack(player) {
    let kingsBack = 0;
    player.areas.forEach(a => {
        player.pieces.forEach(p => {
            if (a == p.parentNode && p.classList.contains(`king`)) {
                kingsBack++;
            };
        });
    });
    return kingsBack;
};

function gameEnd(winner, winnerText, note) {
    p1.pieces.forEach(p1 => p1.setAttribute(`draggable`, `false`));
    p2.pieces.forEach(p2 => p2.setAttribute(`draggable`, `false`));
    Swal.fire({
        title: winnerText,
        text: note,
        imageUrl: `img/king-${winner}.png`,
        imageWidth: 50,
        imageHeight: 50,
        imageAlt: `${winner}`
    });
};

function turnReg(player, piece) {
    let dragStartAct = () => {
        if (!piece.classList.contains(`king`)) {
            menTarget(player, piece.parentNode).forEach(zone => {
                zone.style.backgroundColor = `rgb(200, 45, 5)`;
                zone.addEventListener(`dragover`, dragOverAct);
                zone.addEventListener(`drop`, dropAct);
            });
        } else if (piece.classList.contains(`king`)) {
            kingTarget(player, piece.parentNode).forEach(zone => {
                zone.style.backgroundColor = `rgb(200, 45, 5)`;
                zone.addEventListener(`dragover`, dragOverAct);
                zone.addEventListener(`drop`, dropAct);
            });
        };
        piece.style.opacity = `.5`;
    };
    let dragOverAct = e => {
        e.preventDefault();
    };
    let dropAct = e => {
        e.preventDefault();
        if (
            e.target != piece.parentNode &&
            e.target != piece &&
            e.target.innerHTML == ``
        ) {
            piece.parentNode.removeChild(piece);
            e.target.appendChild(piece);
            if (!piece.classList.contains(`king`)) {
                checkingEnemyJumped(jumpArr, e.target, enemyArr, false);
            } else if (piece.classList.contains(`king`)) {
                checkingEnemyJumped(jumpsArr, e.target, enemyArr, true);
            };
            checkingPieceTransform(player);
            if (enemyJumpedArr.length == 0) {
                p1IsNext = !p1IsNext;
                turnEnd(player);
                return gamePlay();
            } else if (enemyJumpedArr.length > 0) {
                jumpingPiece = piece;
                jumpingPiece.removeEventListener(`dragstart`, dragStartAct);
                jumpingPiece.removeEventListener(`dragend`, dragEndAct);
                turnEnd(player);
                return turnAgain(player);
            };
        };
    };
    let dragEndAct = () => {
        activeZone.forEach(zone => {
            zone.style.backgroundColor = ``;
            zone.removeEventListener(`dragover`, dragOverAct);
            zone.removeEventListener(`drop`, dropAct);
        });
        piece.style.opacity = ``;
    };
    let turnEnd = player => {
        dragEndAct();
        player.pieces.forEach(p => {
            p.setAttribute(`draggable`, `false`);
        });
    };
    piece.addEventListener(`dragstart`, dragStartAct);
    piece.addEventListener(`dragend`, dragEndAct);
};

function turnAgain(player) {
    let dragStartAct = () => {
        if (!jumpingPiece.classList.contains(`king`)) {
            menTarget(player, jumpingPiece.parentNode);
            jumpArr.filter(move => move != null && move.innerHTML == ``).forEach(zone => {
                zone.style.backgroundColor = `rgb(200, 45, 5)`;
                zone.addEventListener(`dragover`, dragOverAct);
                zone.addEventListener(`drop`, dropAct);
            });
        } else if (jumpingPiece.classList.contains(`king`)) {
            kingTarget(player, jumpingPiece.parentNode);
            jumpArr.filter(move => move != null && move.innerHTML == ``).forEach(zone => {
                zone.style.backgroundColor = `rgb(200, 45, 5)`;
                zone.addEventListener(`dragover`, dragOverAct);
                zone.addEventListener(`drop`, dropAct);
            });
        };
        jumpingPiece.style.opacity = `.5`;
    };
    let dragOverAct = e => {
        e.preventDefault();
    };
    let dropAct = e => {
        e.preventDefault();
        if (
            e.target != jumpingPiece.parentNode &&
            e.target != jumpingPiece &&
            e.target.innerHTML == ``
        ) {
            jumpingPiece.parentNode.removeChild(jumpingPiece);
            e.target.appendChild(jumpingPiece);
            if (!jumpingPiece.classList.contains(`king`)) {
                checkingEnemyJumped(jumpArr, e.target, enemyArr, false);
            } else if (jumpingPiece.classList.contains(`king`)) {
                checkingEnemyJumped(jumpsArr, e.target, enemyArr, true);
            };
            checkingPieceTransform(player);
            clearInterval(timeInterval);
            clearTimeout(turnTime);
            turnEnd();
            return turnAgain(player);
        };
    };
    let dragEndAct = () => {
        activeZone.forEach(zone => {
            zone.style.backgroundColor = ``;
            zone.removeEventListener(`dragover`, dragOverAct);
            zone.removeEventListener(`drop`, dropAct);
        });
        jumpingPiece.style.opacity = ``;
    };
    let turnEnd = () => {
        dragEndAct();
        jumpingPiece.removeEventListener(`dragstart`, dragStartAct);
        jumpingPiece.removeEventListener(`dragend`, dragEndAct);
        jumpingPiece.setAttribute(`draggable`, `false`);
        if (enemyJumpedArr.length == 0) {
            if (p1.pieces.includes(jumpingPiece)) {
                turnReg(p1, jumpingPiece);
            } else if (p2.pieces.includes(jumpingPiece)) {
                turnReg(p2, jumpingPiece);
            };
            return gamePlay();
        };
    };
    jumpingPiece.setAttribute(`draggable`, `true`);
    jumpingPiece.addEventListener(`dragstart`, dragStartAct);
    jumpingPiece.addEventListener(`dragend`, dragEndAct);
    player.timer.forEach(t => {
        t.value = 3000;
        if (matchMedia(`(max-width: 1000px)`).matches && t.classList.contains(`mobile`)) {
            return t.style.display = `block`;
        } else if (matchMedia(`(min-width: 1000px)`).matches && !t.classList.contains(`mobile`)) {
            return t.style.display = `block`;
        };
    });
    let timeInterval = setInterval(() => {
        player.timer.forEach(t => {
            t.value -= 50;
        });
    }, 50);
    let turnTime = setTimeout(() => {
        clearInterval(timeInterval);
        player.timer.forEach(t => {
            t.style.display = `none`;
            t.value = 3000;
        });
        enemyJumpedArr.forEach(enemy => {
            scoreAddition(player, enemy.firstChild.classList.contains(`king`));
            enemy.removeChild(enemy.firstChild);
        });
        enemyJumpedArr = [];
        p1IsNext = !p1IsNext;
        turnEnd();
    }, 3000);
};

function checkingEnemyJumped(jumpDirections, newPos, enemies, pieceIsKing) {
    if (pieceIsKing) {
        for (let r = 0; r < jumpDirections.length; r++) {
            for (let c = 0; c < jumpDirections[r].length; c++) {
                if (jumpDirections[r][c] == newPos) {
                    enemies[r].firstChild.classList.add(`jumped`);
                    return enemyJumpedArr.push(enemies[r]);
                };
            };
        };
    } else {
        for (let i = 0; i < jumpDirections.length; i++) {
            if (jumpDirections[i] == newPos) {
                enemies[i].firstChild.classList.add(`jumped`);
                return enemyJumpedArr.push(enemies[i]);
            };
        };
    };
};

function scoreAddition(player, pieceIsKing) {
    for (let i = 0; i < player.score.length; i++) {
        let newPiece = document.createElement(`img`);
        if (player == p1) {
            if (pieceIsKing) {
                newPiece.setAttribute(`src`, `img/king-${p2.kind}.png`);
            } else {
                newPiece.setAttribute(`src`, `img/men-${p2.kind}.png`);
            }
        } else if (player == p2) {
            if (pieceIsKing) {
                newPiece.setAttribute(`src`, `img/king-${p1.kind}.png`);
            } else {
                newPiece.setAttribute(`src`, `img/men-${p1.kind}.png`);
            };
        };
        newPiece.setAttribute(`draggable`, `false`);
        player.score[i].appendChild(newPiece);
    };
};

function checkingPieceTransform(player) {
    player.crownHeads.forEach(l => {
        player.pieces.forEach(p => {
            if (l == p.parentNode && !p.classList.contains(`king`)) {
                p.style.backgroundImage = `url(img/king-${player.kind}.png)`;
                return p.classList.add(`king`);
            };
        });
    });
};

function gamePlay() {
    if (p1IsNext) {
        turnOver(p1, `black`, p2);
        checkingMoveBlock(p1, p2);
        p1.pieces.forEach(p => {
            p.setAttribute(`draggable`, `true`);
        });
    } else {
        turnOver(p2, `rgb(175, 95, 250)`, p1);
        checkingMoveBlock(p2, p1);
        p2.pieces.forEach(p => {
            p.setAttribute(`draggable`, `true`);
        });
    };
};

// ! executed here
p1.pieces.forEach(p => {
    turnReg(p1, p);
});
p2.pieces.forEach(p => {
    turnReg(p2, p);
});
gamePlay();