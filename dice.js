let pawns = [];
let index = 0;

let colors = [
    "Red", "LawnGreen", "Aqua", "Yellow", "Blue", "Indigo", "Fuchsia", "Orange", "Purple", "GreenYellow"
]

document.getElementById("startbutton").onclick = function() {
    const NUMBER_OF_PAWNS = document.getElementById("amountinp").value;
    for(let i = 0; i < NUMBER_OF_PAWNS; i++) {
        pawns[i] = {p: 0};
        movepawn(i);
    }
    document.getElementById("amount").remove();
    document.getElementById("turntext").innerHTML = "Next roll is for: <span id='pawntext'>Red</span>";
    document.getElementById("pawntext").style.color = "Red";
}

const roll = function() {
    if(pawns.length === 0) return;

    let number = Math.floor(Math.random() * (7 - 1)) + 1;
    let pawnData = pawns[index%pawns.length];

    if(pawnData.p === 41) {
        index++;

        roll();
        return;
    }

    if(pawnData.skip !== undefined && pawnData.skip > 0) {
        pawnData.skip--;
        index++;
        const next = findNextNonFinished(index);
        document.getElementById("turntext").innerHTML = "Next roll is for: <span id='pawntext'>"+colors[next%pawns.length]+"</span>";
        document.getElementById("pawntext").style.color = colors[next%pawns.length];

        return;
    }

    pawnData.p += number;

    if(pawnData.p >= 41){
        pawnData.p = 41;
    }

    if(pawnData.p == 40){
        setTimeout(() => {
            let i = pawns.findIndex(data => data === pawnData);
            pawnData.p = 0;
            movepawn(i);
        }, 2000);
    }
    if(pawnData.p == 38){
        setTimeout(() => {
            let i = pawns.findIndex(data => data === pawnData);
            pawnData.p = 28;
            movepawn(i);
        }, 2000);
    }
    if(pawnData.p === 19){
        pawnData.skip = 1;
    }
    if(pawnData.p === 25){
        pawnData.skip = 1;
    }
    if(pawnData.p === 39){
        pawnData.skip = 2;
    }
    
    movepawn(index%pawns.length);
    index++;
    const next = findNextNonFinished(index);

    if(pawns[next%pawns.length].skip > 0) {
        document.getElementById("turntext").innerHTML = "Skipped: <span id='pawntext'>"+colors[next%pawns.length]+"</span>";
        document.getElementById("pawntext").style.color = colors[next%pawns.length];
    }
    else {
        document.getElementById("turntext").innerHTML = "Next roll is for: <span id='pawntext'>"+colors[next%pawns.length]+"</span>";
        document.getElementById("pawntext").style.color = colors[next%pawns.length];
    }
    
  
    console.log(pawns);
    switch (number) {
        case 1:
            document.getElementById("dice").style.backgroundImage = "url(Dice-1.svg)";
            break;
        case 2:
            document.getElementById("dice").style.backgroundImage = "url(Dice-2.svg)";
            break;
        case 3:
            document.getElementById("dice").style.backgroundImage = "url(Dice-3.svg)";
            break;
        case 4:
            document.getElementById("dice").style.backgroundImage = "url(Dice-4.svg)";
            break;
        case 5:
            document.getElementById("dice").style.backgroundImage = "url(Dice-5.svg)";
            break;
        case 6:
            document.getElementById("dice").style.backgroundImage = "url(Dice-6a.svg)";
            break;
    }
}

const findNextNonFinished = (index) => {
    let i = index;
    if(pawns[i%pawns.length].p >= 41) return findNextNonFinished(i + 1);
    else return i;
}

document.getElementById("dicebut").onclick = roll;

function movepawn(index){
    let pawnData = pawns[index];
    let pawn = document.getElementById("pawn" + index);
    if (pawn){
        pawn.remove();
    }
    pawn = document.createElement("img");
    pawn.id = "pawn"+index;
    pawn.src = "./pawn"+index+".png"
    pawn.className = "pawn";
    document.getElementById("vak" + pawnData.p).appendChild(pawn);
}