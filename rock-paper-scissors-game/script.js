const game = () => {
    let pScore = 0;
    let cScore = 0;
    let maxLimit = 5;
    const winner = document.querySelector(".winner")
    const player = document.querySelector(".player-score h2");
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    // Start The Game
    const startGame = () => {
        const playBtn = document.querySelector(".intro button");
        const introScreen = document.querySelector(".intro");
        const match = document.querySelector(".match");
        const score = document.querySelector(".score");

        playBtn.addEventListener('click', () => {
            Swal.fire({
                title: 'Specifications',
                html: `
                    <input id="swal-input1" class="swal2-input" placeholder="Your name" />
                    <input id="swal-input2" class="swal2-input" placeholder="Number of limits" />
                `,
                showCancelButton: true,
                confirmButtonText: 'Let\'s go',
                confirmButtonColor: '#2D7560FF',
                cancelButtonColor: '#ee5253',
                focusConfirm: false,
                preConfirm: function () {
                    return [document.querySelector('#swal-input1').value, document.querySelector('#swal-input2').value]
                },

            }).then((result) => {
                if (result.isConfirmed) {
                    let name = result.value[0]
                    let max = result.value[1]

                    player.textContent = name.length > 0 ? name : 'Player';
                    maxLimit = max.length > 0 ? parseInt(max) : maxLimit
                    introScreen.classList.add("fadeOut");
                    match.classList.add("fadeIn");
                    score.classList.add("fadeIn");
                }
            })
        });
    };

    // Play Match
    const playMatch = () => {
        hands.forEach(hand => {
            hand.addEventListener("animationend", function () {
                this.style.animation = "";
            });
        });

        // Computer Options
        const computerOptions = ["rock", "paper", "scissors"];

        options.forEach(option => {
            option.addEventListener("click", function () {
                // Computer Choice
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];

                setTimeout(() => {
                    // Update Images
                    playerHand.src = `./images/${this.textContent.trim().toLowerCase()}-player.png`;
                    computerHand.src = `./images/${computerChoice}-computer.png`;

                    // Here Is Where We Call Computer Hands
                    computerHands(this.textContent.trim().toLowerCase(), computerChoice)
                }, 1000);

                // Animation
                playerHand.style.animation = "shakeHand 1s ease";
                computerHand.style.animation = "shakeHand 1s ease";
            });
        });
    };

    // Update Score
    const updateScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");

        playerScore.textContent = pScore;
        computerScore.textContent = cScore;

        HeroHandler()
    }

    // Show Hero And Reset Scor
    const showHeroAndResetScore = (winnerName) => {
        winner.textContent = `${winnerName} is Hero`;

        // Disable all options
        options.forEach(option => {
            option.disabled = true
        })

        setTimeout(() => {
            Swal.fire({
                title: `${winnerName} is Hero`,
                html: `<div>${player.innerHTML} Score: <strong>${pScore}</strong></div>
                       <br />
                       <div>Computer Score: <strong>${cScore}</strong></div>`,
                icon: 'success',
                confirmButtonColor: '#2D7560FF',
                confirmButtonText: 'Okay, let\'s go to another match'
            }).then((result) => {
                // Enable all options
                options.forEach(option => {
                    option.disabled = false
                })
                playerHand.src = `./images/rock-player.png`;
                computerHand.src = `./images/rock-computer.png`;
                winner.textContent = ''
                pScore = 0;
                cScore = 0;
                updateScore();
            })
        }, 1000)
    }

    // Handle Hero
    const HeroHandler = () => {
        console.log(maxLimit)
        if (pScore === maxLimit) {
            showHeroAndResetScore(player.innerHTML)
            return;
        } else if (cScore == maxLimit) {
            showHeroAndResetScore('Computer')
            return;
        }
    }

    // Check Computer Hands
    const computerHands = (playerChoice, computerChoice) => {
        // Checking For A Tie
        if (playerChoice === computerChoice) {
            winner.textContent = "It is a tie";
            return;
        }

        // Check For Rock
        if (playerChoice === "rock") {
            if (computerChoice === "scissors") {
                winner.textContent = `${player.innerHTML} Wins`;
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            }
        }

        // Check For Paper
        if (playerChoice === "paper") {
            if (computerChoice === "scissors") {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = `${player.innerHTML} Wins`;
                pScore++;
                updateScore();
                return;
            }
        }

        // Check For Scissors
        if (playerChoice === "scissors") {
            if (computerChoice === "paper") {
                winner.textContent = `${player.innerHTML} Wins`;
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            }
        }
    }

    // Is Call All The Inner Function
    startGame();
    playMatch();
};


// Start The Game Function
game();