const boxes = document.querySelectorAll('.boxes');
let msgContainer = document.querySelector('.winnercontainer');
let msg = document.querySelector('#msg');
let newbtn = document.querySelector('#new-btn');
let resetbtn = document.querySelector('#reset-game');

let playgame = true;
let turn0 = true;
let count = 0;

boxes.forEach(box => {
  box.addEventListener('click', function(e) {
    if (turn0) {
      box.innerHTML = "X";
      turn0 = false;
    } else {
      box.innerHTML = "O";
      turn0 = true;
    }
    box.disabled = true;
    count++;
    checkwinner();
  });
});

let winningConditions = [
  [0, 1, 2], // row 1
  [3, 4, 5], // row 2
  [6, 7, 8], // row 3
  [0, 3, 6], // column 1
  [1, 4, 7], // column 2
  [2, 5, 8], // column 3
  [0, 4, 8], // diagonal 1
  [2, 4, 6]  // diagonal 2
];

const resetgame = () => {
  turn0 = true;
  enableboxes();
  msgContainer.style.display = "none";
  count = 0;
}

const enableboxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerHTML = "";
  });
}

const diabledboxes = () => {
  boxes.forEach(box => {
    box.disabled = true;
  });
}

const showwinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`
  msgContainer.style.display = "block";
  diabledboxes();
}

const checkwinner = () => {
  for (let i = 0; i < winningConditions.length; i++) {
    let condition = winningConditions[i];
    let a = condition[0];
    let b = condition[1];
    let c = condition[2];
    if (boxes[a].innerHTML === boxes[b].innerHTML && boxes[b].innerHTML === boxes[c].innerHTML && boxes[a].innerHTML !== "") {
      showwinner(boxes[a].innerHTML);
      return;
    }
  }
  if (count === 9) {
    msg.innerText = "It's a draw!";
    msgContainer.style.display = "block";
    diabledboxes();
  }
}

newbtn.addEventListener("click", resetgame)
resetbtn.addEventListener("click", resetgame)