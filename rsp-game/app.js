const ROCK = "fa-hand-back-fist";
const SCISSORS = "fa-hand-scissors";
const PAPER = "fa-hand";

const userRockBtn = document.getElementById("rock");
const userScissorsBtn = document.getElementById("scissors");
const userPaperBtn = document.getElementById("paper");

const WHITE = "#fff";

// 컴퓨터가 선택한 값
const rsp = [ROCK, SCISSORS, PAPER];
const getComputerChoice = () => {
  const randomNum = Math.floor(Math.random() * 3);
  return rsp[randomNum];
};

// 컴퓨터가 선택한 아이콘 초기화
const computerIconEl = document.querySelector(".computer i");

// 게임 시작시 화면 변화
const gameOn = () => {
  computerIconEl.style.color = WHITE;
  computerIconEl.previousElementSibling.style.color = WHITE;
  computerIconEl.classList.remove("shake");
};

// 컴퓨터가 선택한 아이콘 변경
const computerSelectIcon = computerSelected =>
  computerIconEl.classList.add(computerSelected);

const computerIconChange = computerSelected => {
  computerIconEl.classList.remove(ROCK, SCISSORS, PAPER);
  computerSelectIcon(computerSelected);
};

// 유저가 선택한 버튼 초기화
const resetUserSelectedBtn = () => {
  userRockBtn.classList.remove("selected");
  userScissorsBtn.classList.remove("selected");
  userPaperBtn.classList.remove("selected");
};

// 유저가 선택한 버튼
const userSelectedBtn = userSelected => {
  resetUserSelectedBtn();

  switch (userSelected) {
    case ROCK:
      return userRockBtn.classList.add("selected");

    case SCISSORS:
      return userScissorsBtn.classList.add("selected");

    default:
      userPaperBtn.classList.add("selected");
  }
};

const userScoreEl = document.getElementById("user-score");
const computerScoreEl = userScoreEl.nextElementSibling;

// 승자 Score 강조
const highlightColor = (userColor, computerColor) => {
  userScoreEl.style.color = userColor;
  computerScoreEl.style.color = computerColor;
};

const winnerScoreHighlights = () => {
  userScoreEl.firstElementChild.textContent = userScore;
  computerScoreEl.firstElementChild.textContent = computerScore;
  const GRAY = "#666";

  if (userScore === computerScore) return highlightColor(GRAY, GRAY);
  else if (userScore > computerScore) return highlightColor(WHITE, GRAY);
  else return highlightColor(GRAY, WHITE);
};

// 결과 메시지
const resultMsg = document.getElementById("result-msg");
const resultMsgChange = (text, color) => {
  resultMsg.textContent = text;
  resultMsg.style.color = color;
};

// 가위, 바위, 보 게임 핸들러
let userScore = 0;
let computerScore = 0;

const gameHandler = userSelected => {
  gameOn();
  const computerSelected = getComputerChoice();
  computerIconChange(computerSelected);

  if (computerSelected === userSelected)
    resultMsgChange("비겼습니다, 게임을 다시 진행해주세요.", "#111");
  else if (
    (userSelected === ROCK && computerSelected === SCISSORS) ||
    (userSelected === SCISSORS && computerSelected === PAPER) ||
    (userSelected === PAPER && computerSelected === ROCK)
  ) {
    userScore += 1;
    resultMsgChange("당신이 승리하였습니다!", "#1fdf64");
  } else {
    computerScore += 1;
    resultMsgChange("당신이 패배하였습니다.", "#df3c1f");
  }

  userSelectedBtn(userSelected);
  winnerScoreHighlights();
};

userScissorsBtn.addEventListener("click", gameHandler.bind(this, SCISSORS));
userRockBtn.addEventListener("click", gameHandler.bind(this, ROCK));
userPaperBtn.addEventListener("click", gameHandler.bind(this, PAPER));
