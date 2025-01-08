let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let popup = document.querySelector("#popup");
let winnerMessage = document.querySelector("#winnerMessage");
let newGameBtn = document.querySelector("#newGameBtn");

// to track turn of player i.e. playerX and playerO
let turnO = true;

// win patter
const winPatterns = [
  [0, 1, 2], // horizontal winning pattern
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // vertical winning pattern
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonal winning pattern
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO === true) {
      // if playerO turn
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X"; // if playerX turn
      turnO = true;
    }
    box.disabled = true; // to disable the button after click

    checkWinner();
    checkDraw();
  });
});

// check winner i.e playerO or player X
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Value = boxes[pattern[0]].innerText;
    let pos2Value = boxes[pattern[1]].innerText;
    let pos3Value = boxes[pattern[2]].innerText;

    if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
      if (pos1Value === pos2Value && pos2Value === pos3Value) {
        winnerMessage.textContent = `${pos1Value} wins!`;
        popup.style.display = "flex";
        return;
      }
    }
  }
};

// check for draw condition
const checkDraw = () => {
  const isDraw = [...boxes].every((box) => box.innerText !== "");
  if (isDraw) {
    winnerMessage.textContent = "It's a Draw!";
    popup.style.display = "flex";
  }
};

// Reset Button
resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  popup.style.display = "none";
});

// new game button to close popup
newGameBtn.addEventListener("click", () => {
  popup.style.display = "none";
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
});
