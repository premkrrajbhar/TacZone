let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let winnerMessage = document.querySelector("#winnerMessage");

let turnO = true;
let gameOver = false;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (gameOver || box.innerText !== "") return;

    box.innerText = turnO ? "O" : "X";
    turnO = !turnO;
    box.disabled = true;

    checkWinner();
    checkDraw();
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      winnerMessage.textContent = `${boxes[a].innerText} wins!`;
      gameOver = true;
      disableAllBoxes();
      return;
    }
  }
};

const checkDraw = () => {
  const isDraw = [...boxes].every((box) => box.innerText !== "");
  if (isDraw && !gameOver) {
    winnerMessage.textContent = "It's a Draw!";
    gameOver = true;
  }
};

const disableAllBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  winnerMessage.textContent = "";
  gameOver = false;
});
