
// ===== PLAYER DATA =====
// This is an array (a list) of objects. Each object is one player.
const players = [
  // ---- BRONZE ----
  {
    id: 1, name: "Danny Marsh", club: "Harbor Town FC", position: "DEF",
    rarity: "bronze", portrait: "",
    stats: { pace: 55, shooting: 40, passing: 52, dribbling: 48, defending: 68, physicality: 70 }
  },
  {
    id: 2, name: "Leo Santos", club: "Rio Verde", position: "MID",
    rarity: "bronze", portrait: "",
    stats: { pace: 60, shooting: 55, passing: 66, dribbling: 62, defending: 52, physicality: 58 }
  },
  {
    id: 3, name: "Kofi Mensah", club: "Accra United", position: "FWD",
    rarity: "bronze", portrait: "",
    stats: { pace: 70, shooting: 62, passing: 48, dribbling: 60, defending: 30, physicality: 55 }
  },

  // ---- SILVER ----
  {
    id: 4, name: "Diade Sidibe", club: "Costa Lions", position: "MID",
    rarity: "silver", portrait: "",
    stats: { pace: 68, shooting: 66, passing: 74, dribbling: 72, defending: 62, physicality: 64 }
  },
  {
    id: 5, name: "Jonas Keller", club: "Nordhaven SC", position: "DEF",
    rarity: "silver", portrait: "",
    stats: { pace: 66, shooting: 45, passing: 62, dribbling: 58, defending: 80, physicality: 78 }
  },
  {
    id: 6, name: "Amir Haddad", club: "Atlas City", position: "FWD",
    rarity: "silver", portrait: "",
    stats: { pace: 78, shooting: 74, passing: 64, dribbling: 76, defending: 38, physicality: 66 }
  },

  // ---- GOLD ----
  {
    id: 7, name: "Rafael Duarte", club: "Sao Estrela", position: "FWD",
    rarity: "gold", portrait: "",
    stats: { pace: 88, shooting: 86, passing: 74, dribbling: 86, defending: 42, physicality: 76 }
  },
  {
    id: 8, name: "Viktor Novak", club: "Praha Royal", position: "MID",
    rarity: "gold", portrait: "",
    stats: { pace: 72, shooting: 78, passing: 88, dribbling: 82, defending: 70, physicality: 76 }
  },
  {
    id: 9, name: "Callum Reid", club: "Highland Rovers", position: "DEF",
    rarity: "gold", portrait: "",
    stats: { pace: 76, shooting: 52, passing: 72, dribbling: 70, defending: 90, physicality: 88 }
  },

  // ---- LEGENDARY ----
  {
    id: 10, name: "Morgan", club: "Tokyo Phoenix", position: "MID",
    rarity: "legendary", portrait: "",
    stats: { pace: 86, shooting: 88, passing: 94, dribbling: 95, defending: 72, physicality: 80 }
  },
  {
    id: 11, name: "Lucas Moreau", club: "Paris Etoile", position: "FWD",
    rarity: "legendary", portrait: "",
    stats: { pace: 96, shooting: 95, passing: 84, dribbling: 94, defending: 60, physicality: 84 }
  },
  {
    id: 12, name: "Ibrahim Diallo", club: "Dakar Titans", position: "DEF",
    rarity: "legendary", portrait: "",
    stats: { pace: 86, shooting: 66, passing: 84, dribbling: 82, defending: 97, physicality: 96 }
  }
];

// ===== FUNCTION: work out a player's overall rating =====
// Takes a player's stats and returns the average, rounded to a whole number.
function calculateOverall(stats) {
  const values = Object.values(stats); // [55, 40, 52, 48, 68, 70]
  let total = 0;

  for (const value of values) {
    total = total + value; // add each stat to the running total
  }

  return Math.round(total / values.length);
}

// ===== Give every player an "overall" =====
players.forEach((player) => {
  player.overall = calculateOverall(player.stats);
});

// ===== SHORT LABELS for the six stats =====
const STAT_LABELS = {
  pace: "PAC",
  shooting: "SHO",
  passing: "PAS",
  dribbling: "DRI",
  defending: "DEF",
  physicality: "PHY"
};

// ===== GAME SETTINGS =====                                  // NEW
const TOTAL_ROUNDS = 5;                                        // NEW

// ===== GAME STATE: the variables that remember what is happening =====
let playerScore = 0;
let cpuScore = 0;
let currentPlayer = null;  // the player's card this round
let currentCpu = null;     // the computer's card this round
let roundOver = false;     // becomes true once a stat has been chosen
let currentRound = 0;      // NEW: which round we are on
let deck = [];             // NEW: the shuffled cards for this match

// ===== PAGE ELEMENTS we will need to change =====
const playerSlot = document.getElementById("player-slot");
const cpuSlot = document.getElementById("cpu-slot");
const messageEl = document.getElementById("message");
const playerScoreEl = document.getElementById("player-score");
const cpuScoreEl = document.getElementById("cpu-score");
const nextBtn = document.getElementById("next-btn");
const gameEl = document.getElementById("game");                // NEW
const resultsEl = document.getElementById("results");          // NEW
const roundInfoEl = document.getElementById("round-info");     // NEW
const resultTitleEl = document.getElementById("result-title"); // NEW
const finalScoreEl = document.getElementById("final-score");   // NEW
const resultTextEl = document.getElementById("result-text");   // NEW
const playAgainBtn = document.getElementById("play-again-btn");// NEW

// ===== FUNCTION: turn a club name into a color (same club = same color) =====
function getClubHue(club) {
  let hash = 0;
  for (const char of club) {
    hash = (hash * 31 + char.charCodeAt(0)) % 360;
  }
  return hash;   // a number from 0 to 359, used as a color on the color wheel
}

// ===== FUNCTION: build the portrait (real image if we have one, silhouette if not) =====
function createPortrait(player) {
  if (player.portrait) {
    return `<img class="portrait-img" src="${player.portrait}" alt="${player.name}">`;
  }

  const hue = getClubHue(player.club);
  return `
    <svg class="portrait-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <path d="M8 100 C8 74 28 64 50 64 C72 64 92 74 92 100 Z" fill="hsl(${hue} 55% 42%)"/>
      <path d="M38 66 L50 82 L62 66 Z" fill="rgba(255,255,255,0.28)"/>
      <rect x="42" y="50" width="16" height="18" rx="7" fill="#232b45"/>
      <ellipse cx="50" cy="36" rx="15" ry="18" fill="#2f3858"/>
    </svg>
  `;
}

// ===== FUNCTION: build one card from one player =====
function createCard(player, faceDown = false) {
  const card = document.createElement("article");
  card.className = faceDown ? "card face-down" : "card " + player.rarity;

  // find the highest stat so we can highlight it
  const bestValue = Math.max(...Object.values(player.stats));

  let statsHTML = "";
  for (const key in player.stats) {
    const value = player.stats[key];
    const bestClass = value === bestValue ? " best" : "";
    statsHTML += `
      <div class="stat${bestClass}" data-stat="${key}">
        <span class="stat-label">${STAT_LABELS[key]}</span>
        <span class="stat-value">${value}</span>
      </div>
    `;
  }

  card.innerHTML = `
    <div class="card-shine"></div>
    <div class="card-art">
      ${createPortrait(player)}
      <div class="card-rating">
        <span class="overall">${player.overall}</span>
        <span class="position">${player.position}</span>
      </div>
      <span class="rarity-tag">${player.rarity}</span>
    </div>
    <div class="card-info">
      <h2 class="player-name">${player.name}</h2>
      <p class="club">${player.club}</p>
    </div>
    <div class="stats">${statsHTML}</div>
  `;

  return card;
}

// ===== FUNCTION: shuffle a list, like shuffling a deck of cards =====  // NEW
function shuffle(list) {
  const copy = [...list];   // make a copy so the original list is untouched
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));   // random spot from 0 to i
    [copy[i], copy[j]] = [copy[j], copy[i]];         // swap the two cards
  }
  return copy;
}

// ===== FUNCTION: highlight the chosen stat on a card (unchanged) =====
function highlightStat(slot, statKey) {
  const statEl = slot.querySelector(`[data-stat="${statKey}"]`);
  statEl.classList.add("chosen");
}

// ===== FUNCTION: refresh the scoreboard numbers (unchanged) =====
function updateScoreboard() {
  playerScoreEl.textContent = playerScore;
  cpuScoreEl.textContent = cpuScore;
}

// ===== FUNCTION: start a brand new match =====                         // NEW
function startMatch() {
  playerScore = 0;
  cpuScore = 0;
  currentRound = 0;
  deck = shuffle(players);   // a freshly shuffled deck of all 12 players
  updateScoreboard();

  resultsEl.hidden = true;   // hide the results screen
  gameEl.hidden = false;     // show the game screen
  startRound();
}

// ===== FUNCTION: start a new round =====                               // CHANGED
function startRound() {
  currentRound++;
  roundOver = false;
  nextBtn.hidden = true;

  // deal one card each from the top of the deck (no repeats)
  currentPlayer = deck.pop();
  currentCpu = deck.pop();

  const playerCard = createCard(currentPlayer);
  const cpuCard = createCard(currentCpu, true);

  playerSlot.innerHTML = "";
  cpuSlot.innerHTML = "";
  playerSlot.appendChild(playerCard);
  cpuSlot.appendChild(cpuCard);

  playerCard.classList.add("pickable");
  const statEls = playerCard.querySelectorAll(".stat");
  statEls.forEach((statEl) => {
    statEl.addEventListener("click", () => {
      playRound(statEl.dataset.stat);
    });
  });

  roundInfoEl.textContent = `Round ${currentRound} of ${TOTAL_ROUNDS}`;
  messageEl.textContent = "Your move: tap a stat on your card!";
}

// ===== FUNCTION: play the round once a stat is chosen =====            // CHANGED (end)
function playRound(statKey) {
  if (roundOver) return;
  roundOver = true;

  const playerValue = currentPlayer.stats[statKey];
  const cpuValue = currentCpu.stats[statKey];
  const label = STAT_LABELS[statKey];

  const cpuCard = cpuSlot.firstElementChild;
  cpuCard.classList.remove("face-down");
  cpuCard.classList.add(currentCpu.rarity);

  playerSlot.firstElementChild.classList.remove("pickable");
  highlightStat(playerSlot, statKey);
  highlightStat(cpuSlot, statKey);

  if (playerValue > cpuValue) {
    playerScore++;
    messageEl.textContent = `You win! ${label}: ${playerValue} vs ${cpuValue}`;
  } else if (playerValue < cpuValue) {
    cpuScore++;
    messageEl.textContent = `Computer wins. ${label}: ${playerValue} vs ${cpuValue}`;
  } else {
    messageEl.textContent = `It's a tie! Both have ${playerValue} ${label}`;
  }

  updateScoreboard();

  // on the last round the button says "See Results" instead
  nextBtn.textContent = currentRound === TOTAL_ROUNDS ? "See Results" : "Next Round";
  nextBtn.hidden = false;
}

// ===== FUNCTION: show the final results screen =====                   // NEW
function showResults() {
  gameEl.hidden = true;
  resultsEl.hidden = false;

  if (playerScore > cpuScore) {
    resultTitleEl.textContent = "Victory!";
    resultTitleEl.className = "result-title win";
    resultTextEl.textContent = "You beat the computer.";
  } else if (playerScore < cpuScore) {
    resultTitleEl.textContent = "Defeat";
    resultTitleEl.className = "result-title lose";
    resultTextEl.textContent = "The computer takes this one.";
  } else {
    resultTitleEl.textContent = "Draw";
    resultTitleEl.className = "result-title draw";
    resultTextEl.textContent = "All square. Time for a rematch?";
  }

  finalScoreEl.textContent = `${playerScore} – ${cpuScore}`;
}

// ===== BUTTONS =====                                                   // CHANGED
nextBtn.addEventListener("click", () => {
  if (currentRound === TOTAL_ROUNDS) {
    showResults();
  } else {
    startRound();
  }
});

playAgainBtn.addEventListener("click", startMatch);

// ===== START THE GAME =====
startMatch();