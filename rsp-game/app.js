const ROCK = "fa-hand-back-fist";
const SCISSORS = "fa-hand-scissors";
const PAPER = "fa-hand";

const WHITE = "#fff";

const playerRockBtn = document.getElementById("rock-btn");
const playerScissorsBtn = document.getElementById("scissors-btn");
const playerPaperBtn = document.getElementById("paper-btn");

const computerIconEl = document.querySelector(".computer i");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = playerScoreEl.nextElementSibling;

let playerScore = 0;
let computerScore = 0;

// 컴퓨터가 선택한 값
const getComputerChoice = () => {
  const choices = [ROCK, SCISSORS, PAPER];
  const randomNum = Math.floor(Math.random() * 3);
  return choices[randomNum];
};

// 게임 시작시 컴퓨터 아이콘, 텍스트 색 변경
// 초기 화면애니메이션 제거
const gameStartEvent = () => {
  computerIconEl.style.color = WHITE;
  computerIconEl.previousElementSibling.style.color = WHITE;
  computerIconEl.classList.remove("shake");
};

// 컴퓨터가 선택한 아이콘 변경

const getComputerIcon = computerChoice => {
  computerIconEl.classList.remove(ROCK, SCISSORS, PAPER);
  computerIconEl.classList.add(computerChoice);
};

// 유저가 선택한 버튼 초기화
const resetPlayerChoiceBtn = () => {
  playerRockBtn.classList.remove("choice");
  playerScissorsBtn.classList.remove("choice");
  playerPaperBtn.classList.remove("choice");
};

// 유저가 선택한 버튼
const getPlayerChoiceBtn = playerChoice => {
  resetPlayerChoiceBtn();

  const playerBtns = {
    "fa-hand-back-fist": () => playerRockBtn.classList.add("choice"),
    "fa-hand-scissors": () => playerScissorsBtn.classList.add("choice"),
    "fa-hand": () => playerPaperBtn.classList.add("choice"),
  };

  playerBtns[playerChoice];
};

// 스코어 강조
const winnerHighlightColor = (playerColor, computerColor) => {
  playerScoreEl.style.color = playerColor;
  computerScoreEl.style.color = computerColor;
};

const winnerHighlight = () => {
  playerScoreEl.firstElementChild.textContent = playerScore;
  computerScoreEl.firstElementChild.textContent = computerScore;
  const GRAY = "#666";

  if (playerScore === computerScore) return winnerHighlightColor(GRAY, GRAY);
  else if (playerScore > computerScore) return winnerHighlightColor(WHITE, GRAY);
  else return winnerHighlightColor(GRAY, WHITE);
};

// 결과 메시지
const resultMsgChange = (text, color) => {
  const resultMsgEl = document.getElementById("result-msg");
  resultMsgEl.textContent = text;
  resultMsgEl.style.color = color;
};

// 승자
const getWinner = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice)
    resultMsgChange("비겼습니다, 게임을 다시 진행해주세요.", "#111");
  else if (
    (playerChoice === ROCK && computerChoice === SCISSORS) ||
    (playerChoice === SCISSORS && computerChoice === PAPER) ||
    (playerChoice === PAPER && computerChoice === ROCK)
  ) {
    playerScore += 1;
    resultMsgChange("당신이 승리하였습니다!", "#1fdf64");
  } else {
    computerScore += 1;
    resultMsgChange("당신이 패배하였습니다.", "#df3c1f");
  }
};

// 가위, 바위, 보 게임 핸들러
const gameHandler = playerChoice => {
  getPlayerChoiceBtn(playerChoice);
  gameStartEvent();

  const computerChoice = getComputerChoice();
  getComputerIcon(computerChoice);

  getWinner(playerChoice, computerChoice);
  winnerHighlight();
};

playerRockBtn.addEventListener("click", gameHandler.bind(this, ROCK));
playerScissorsBtn.addEventListener("click", gameHandler.bind(this, SCISSORS));
playerPaperBtn.addEventListener("click", gameHandler.bind(this, PAPER));
