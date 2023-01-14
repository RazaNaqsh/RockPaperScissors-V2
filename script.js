const scoreElement = document.querySelector(".score");
const buttons = document.querySelectorAll(".btn");

const mainScreen = document.querySelector(".content");
const selection = document.querySelector(".selection");
const reset = document.querySelector(".resetBtn");

const userBtn = document.getElementById("userBtn");
const houseBtn = document.getElementById("houseBtn");
const userBtnImg = document.getElementById("userSelect");
const houseBtnImg = document.getElementById("houseSelect");
const result = document.getElementById("gameResult");

let playerChoice = "";
let computerChoice = "";

const choices = ["paper", "rock", "scissors"];

function pickChoice() {
	return choices[Math.floor(Math.random() * choices.length)];
}

reset.addEventListener("click", () => {
	mainScreen.style.display = "flex";
	selection.style.display = "none";
});

let score = 0;

function changeSelection(user, comp) {
	userBtnImg.src = `images/icon-${user}.svg`;
	userBtn.classList.remove("rock", "scissors", "paper");
	userBtn.classList.add(user);

	houseBtnImg.src = `images/icon-${comp}.svg`;
	houseBtn.classList.remove("rock", "scissors", "paper");
	houseBtn.classList.add(comp);
}

function playRound(userchoice, systemchoice) {
	const player = userchoice;
	const computer = systemchoice;
	// winning situations
	if (
		(player === "rock" && computer === "scissors") ||
		(player === "scissors" && computer === "paper") ||
		(player === "paper" && computer === "rock")
	) {
		changeSelection(player, computer);
		result.innerHTML = "Win";
		return 1;
	}
	// losing situations
	if (
		(player === "scissors" && computer === "rock") ||
		(player === "paper" && computer === "scissors") ||
		(player === "rock" && computer === "paper")
	) {
		changeSelection(player, computer);
		result.innerHTML = "Lose";
		return 0;
	}
	// draw situations
	if (player === computer) {
		result.innerHTML = "Draw";
		changeSelection(player, computer);
		return -1;
	}
}
function game() {
	computerChoice = pickChoice();
	const outcome = playRound(playerChoice, computerChoice);
	if (outcome === 1) {
		score += 1;
		scoreElement.textContent = score;
	}
	if (outcome === 0) {
		score -= 1;
		scoreElement.textContent = score;
	}
	mainScreen.style.display = "none";
	selection.style.display = "flex";
}

buttons.forEach((button) => {
	button.addEventListener("click", () => {
		playerChoice = button.getAttribute("data-choice");
		game();
	});
});
