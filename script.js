
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

// ===== FUNCTION: get a player's initials (used until we have portraits) =====
function getInitials(name) {
  return name
    .split(" ")                  // "Danny Marsh" -> ["Danny", "Marsh"]
    .map((word) => word[0])      // -> ["D", "M"]
    .join("");                   // -> "DM"
}

// ===== FUNCTION: build one card from one player =====
function createCard(player) {
  const card = document.createElement("article");
  card.className = "card " + player.rarity;   // e.g. "card gold"

  // Build the six stat blocks
  let statsHTML = "";
  for (const key in player.stats) {
    statsHTML += `
      <div class="stat">
        <span class="stat-value">${player.stats[key]}</span>
        <span class="stat-label">${STAT_LABELS[key]}</span>
      </div>
    `;
  }

  // Fill the card with its content
  card.innerHTML = `
    <div class="card-top">
      <div class="card-rating">
        <span class="overall">${player.overall}</span>
        <span class="position">${player.position}</span>
      </div>
      <div class="portrait">${getInitials(player.name)}</div>
    </div>
    <h2 class="player-name">${player.name}</h2>
    <p class="club">${player.club}</p>
    <div class="stats">${statsHTML}</div>
  `;

  return card;
}

// ===== FUNCTION: show every player on the page =====
function renderGallery() {
  const gallery = document.getElementById("card-gallery");

  players.forEach((player) => {
    gallery.appendChild(createCard(player));
  });
}

renderGallery();