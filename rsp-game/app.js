const ROCK = "fa-hand-back-fist";
const SCISSORS = "fa-hand-scissors";
const PAPER = "fa-hand";

const WHITE = "#fff";

const userRockBtn = document.getElementById("rock");
const userScissorsBtn = document.getElementById("scissors");
const userPaperBtn = document.getElementById("paper");

const computerIconEl = document.querySelector(".computer i");
const userScoreEl = document.getElementById("user-score");
const computerScoreEl = userScoreEl.nextElementSibling;

let userScore = 0;
let computerScore = 0;

// 컴퓨터가 선택한 값
const getComputerChoice = () => {
  const computerRsp = [ROCK, SCISSORS, PAPER];
  const randomNum = Math.floor(Math.random() * 3);
  return computerRsp[randomNum];
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
const resetUserChoiceBtn = () => {
  userRockBtn.classList.remove("choice");
  userScissorsBtn.classList.remove("choice");
  userPaperBtn.classList.remove("choice");
};

// 유저가 선택한 버튼
const getUserChoiceBtn = userChoice => {
  resetUserChoiceBtn();

  const userBtns = {
    "fa-hand-back-fist": () => userRockBtn.classList.add("choice"),
    "fa-hand-scissors": () => userScissorsBtn.classList.add("choice"),
    "fa-hand": () => userPaperBtn.classList.add("choice"),
  };

  userBtns[userChoice];
};

// 스코어 강조
const winnerHighlightColor = (userColor, computerColor) => {
  userScoreEl.style.color = userColor;
  computerScoreEl.style.color = computerColor;
};

const winnerHighlight = () => {
  userScoreEl.firstElementChild.textContent = userScore;
  computerScoreEl.firstElementChild.textContent = computerScore;
  const GRAY = "#666";

  if (userScore === computerScore) return winnerHighlightColor(GRAY, GRAY);
  else if (userScore > computerScore) return winnerHighlightColor(WHITE, GRAY);
  else return winnerHighlightColor(GRAY, WHITE);
};

// 결과 메시지
const resultMsgChange = (text, color) => {
  const resultMsgEl = document.getElementById("result-msg");
  resultMsgEl.textContent = text;
  resultMsgEl.style.color = color;
};

// 승자
const getWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice)
    resultMsgChange("비겼습니다, 게임을 다시 진행해주세요.", "#111");
  else if (
    (userChoice === ROCK && computerChoice === SCISSORS) ||
    (userChoice === SCISSORS && computerChoice === PAPER) ||
    (userChoice === PAPER && computerChoice === ROCK)
  ) {
    userScore += 1;
    resultMsgChange("당신이 승리하였습니다!", "#1fdf64");
  } else {
    computerScore += 1;
    resultMsgChange("당신이 패배하였습니다.", "#df3c1f");
  }
};

// 가위, 바위, 보 게임 핸들러
const gameHandler = userChoice => {
  getUserChoiceBtn(userChoice);
  gameStartEvent();

  const computerChoice = getComputerChoice();
  getComputerIcon(computerChoice);

  getWinner(userChoice, computerChoice);
  winnerHighlight();
};

userRockBtn.addEventListener("click", gameHandler.bind(this, ROCK));
userScissorsBtn.addEventListener("click", gameHandler.bind(this, SCISSORS));
userPaperBtn.addEventListener("click", gameHandler.bind(this, PAPER));
