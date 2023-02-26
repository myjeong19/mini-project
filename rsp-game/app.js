const SCISSORS = "SCISSORS";
const ROCK = "ROCK";
const PAEPER = "PAEPER";

const userScissorsBtn = document.getElementById("scissors");
const userRockBtn = document.getElementById("rock");
const userPaperBtn = document.getElementById("paper");

const WHITE = "#fff";

// 컴퓨터가 선택한 값
const getComputerChoice = () => {
  const randomNum = Math.floor(Math.random() * 3);

  switch (randomNum) {
    case 0:
      return SCISSORS;
    case 1:
      return ROCK;
    default:
      return PAEPER;
  }
};

// 컴퓨터가 선택한 아이콘 초기화
const computerIcon = document.querySelector(".computer i");

const resetComputerIcon = ICON => {
  computerIcon.classList.remove(ICON.ROCK);
  computerIcon.classList.remove(ICON.SCISSORS);
  computerIcon.classList.remove(ICON.PAEPER);
};

// 컴퓨터가 선택한 아이콘 변경

const computerIconChange = computerSelected => {
  const ICON = {
    SCISSORS: "fa-hand-scissors",
    ROCK: "fa-hand-back-fist",
    PAPER: "fa-hand",
  };

  resetComputerIcon(ICON);

  computerIcon.classList.remove("shake");
  computerIcon.style.color = WHITE;
  document.querySelector(".computer h3").style.color = WHITE;

  switch (computerSelected) {
    case ROCK: {
      computerIcon.classList.add(ICON.ROCK);
      break;
    }

    case SCISSORS: {
      computerIcon.classList.add(ICON.SCISSORS);
      break;
    }

    default:
      computerIcon.classList.add(ICON.PAPER);
  }
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
      userRockBtn.classList.add("selected");
      break;

    case SCISSORS:
      userScissorsBtn.classList.add("selected");
      break;

    default:
      userPaperBtn.classList.add("selected");
  }
};

// 결과
const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const resultInfoEl = document.getElementById("result-info");

const resultInfo = {
  draw: () => {
    resultInfoEl.textContent = `비겼습니다, 게임을 다시 진행해주세요.`;
    resultInfoEl.style.color = "#111";
  },
  win: userScore => {
    resultInfoEl.textContent = "당신이 승리하였습니다!";
    resultInfoEl.style.color = "#1fdf64";
    userScoreEl.querySelector("span").textContent = userScore;
  },
  lose: computerScore => {
    resultInfoEl.textContent = "당신이 패배하였습니다.";
    resultInfoEl.style.color = "#df3c1f";
    computerScoreEl.querySelector("span").textContent = computerScore;
  },
};

const winnerScoreHighlights = () => {
  const GRAY = "#666";
  const computerScoreColor = color => (computerScoreEl.style.color = color);
  const userScoreColor = color => (userScoreEl.style.color = color);

  if (userScore > computerScore) {
    userScoreColor(WHITE);
    computerScoreColor(GRAY);
  } else if (userScore < computerScore) {
    computerScoreColor(WHITE);
    userScoreColor(GRAY);
  } else {
    computerScoreColor(GRAY);
    userScoreColor(GRAY);
  }
};

// 가위, 바위, 보 게임 핸들러

let userScore = 0;
let computerScore = 0;

const gameHandler = userSelected => {
  userSelectedBtn(userSelected);
  const computerSelected = getComputerChoice();
  computerIconChange(computerSelected);

  if (computerSelected === userSelected) {
    return resultInfo.draw();
  } else if (
    (userSelected === ROCK && computerSelected === SCISSORS) ||
    (userSelected === SCISSORS && computerSelected === PAEPER) ||
    (userSelected === PAEPER && computerSelected === ROCK)
  ) {
    userScore = userScore + 1;
    resultInfo.win(userScore);
  } else {
    computerScore = computerScore + 1;
    resultInfo.lose(computerScore);
  }

  winnerScoreHighlights();
};

userScissorsBtn.addEventListener("click", gameHandler.bind(this, SCISSORS));
userRockBtn.addEventListener("click", gameHandler.bind(this, ROCK));
userPaperBtn.addEventListener("click", gameHandler.bind(this, PAEPER));
