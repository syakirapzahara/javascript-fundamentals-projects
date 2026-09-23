let homeScore = 0;
let guestScore = 0;
let homeFouls = 0;
let guestFouls = 0;
let period = 1;
let gameOver = false; // penanda pertandingan udah selesai

const FOUL_LIMIT = 5; // 5 fouls = diskualifikasi
const MAX_PERIOD = 4; // pertandingan berakhir di period 4

let homeEl = document.getElementById("home-score");
let guestEl = document.getElementById("guest-score");
let homeFoulsEl = document.getElementById("home-fouls");
let guestFoulsEl = document.getElementById("guest-fouls");
let homeStatusEl = document.getElementById("home-status");
let guestStatusEl = document.getElementById("guest-status");
let periodEl = document.getElementById("period-el");
let homeTeam = document.getElementById("home-team");
let guestTeam = document.getElementById("guest-team");
let winnerEl = document.getElementById("winner");
let nextPeriodBtn = document.getElementById("next-period-btn");

function addHome(points) {
  if (gameOver) return; // pertandingan udah selesai
  if (homeFouls >= FOUL_LIMIT) return; // kalau sudah foul out, tidak bisa nambah
  homeScore = homeScore + points;
  homeEl.textContent = homeScore;
  updateLeader();
  checkGameEnd();
}

function addGuest(points) {
  if (gameOver) return;
  if (guestFouls >= FOUL_LIMIT) return;
  guestScore = guestScore + points;
  guestEl.textContent = guestScore;
  updateLeader();
  checkGameEnd();
}

function addFoulHome() {
  if (gameOver) return;
  if (homeFouls >= FOUL_LIMIT) return; // tidak bisa nambah foul lagi
  homeFouls = homeFouls + 1;
  homeFoulsEl.textContent = homeFouls;
  updateFoulStatus("home");
  checkGameEnd();
}

function addFoulGuest() {
  if (gameOver) return;
  if (guestFouls >= FOUL_LIMIT) return;
  guestFouls = guestFouls + 1;
  guestFoulsEl.textContent = guestFouls;
  updateFoulStatus("guest");
  checkGameEnd();
}

function updateFoulStatus(team) {
  let fouls = team === "home" ? homeFouls : guestFouls;
  let foulsEl = team === "home" ? homeFoulsEl : guestFoulsEl;
  let statusEl = team === "home" ? homeStatusEl : guestStatusEl;

  // reset class warna
  foulsEl.classList.remove("warning", "danger");

  // aturan fiksi
  if (fouls >= FOUL_LIMIT) {
    foulsEl.classList.add("danger");
    statusEl.textContent = "FOULED OUT";
    disableTeamButtons(team, true);
    (team === "home" ? homeTeam : guestTeam).classList.add("out");
  } else if (fouls === 4) {
    foulsEl.classList.add("danger");
    statusEl.textContent = "Danger!";
  } else if (fouls === 3) {
    foulsEl.classList.add("warning");
    statusEl.textContent = "Warning";
  } else {
    statusEl.textContent = "";
  }
}

// disabling n enabling button team

function disableTeamButtons(team, disabled) {
  let prefix = team === "home" ? "home" : "guest";

  document.getElementById(prefix + "-btn-1").disabled = disabled;
  document.getElementById(prefix + "-btn-2").disabled = disabled;
  document.getElementById(prefix + "-btn-3").disabled = disabled;
  document.getElementById(prefix + "-foul-btn").disabled = disabled;
}

//utk highlight leader

function updateLeader() {
  homeTeam.classList.remove("leader");
  guestTeam.classList.remove("leader");

  if (homeScore > guestScore) {
    homeTeam.classList.add("leader");
  } else if (guestScore > homeScore) {
    guestTeam.classList.add("leader");
  }
}

// next period, tapi dibatasi MAX_PERIOD
// fouls TIDAK di-reset, biar team yg foul out tetap kunci skornya

function nextPeriod() {
  if (gameOver) return;
  if (period >= MAX_PERIOD) return; // udah period terakhir

  period = period + 1;
  periodEl.textContent = period;

  // kalau udah nyentuh period terakhir, langsung cek game end
  if (period >= MAX_PERIOD) {
    nextPeriodBtn.disabled = true;
    endGame();
  }
}

// cek kapan pertandingan selesai
// selesai kalau: period udah max, ATAU kedua tim foul out

function checkGameEnd() {
  if (gameOver) return;

  if (period >= MAX_PERIOD) {
    endGame();
    return;
  }

  if (homeFouls >= FOUL_LIMIT && guestFouls >= FOUL_LIMIT) {
    endGame();
  }
}

// akhiri pertandingan n tentuin pemenang

function endGame() {
  gameOver = true;

  if (homeScore > guestScore) {
    winnerEl.textContent = "HOME WINS!";
  } else if (guestScore > homeScore) {
    winnerEl.textContent = "GUEST WINS!";
  } else {
    winnerEl.textContent = "DRAW!";
  }

  nextPeriodBtn.disabled = true;
  disableTeamButtons("home", true);
  disableTeamButtons("guest", true);
}

function newGame() {
  homeScore = 0;
  guestScore = 0;
  homeFouls = 0;
  guestFouls = 0;
  period = 1;
  gameOver = false;

  homeEl.textContent = 0;
  guestEl.textContent = 0;
  homeFoulsEl.textContent = 0;
  guestFoulsEl.textContent = 0;
  periodEl.textContent = 1;
  winnerEl.textContent = "";

  homeFoulsEl.classList.remove("warning", "danger");
  guestFoulsEl.classList.remove("warning", "danger");
  homeStatusEl.textContent = "";
  guestStatusEl.textContent = "";

  homeTeam.classList.remove("leader", "out");
  guestTeam.classList.remove("leader", "out");

  disableTeamButtons("home", false);
  disableTeamButtons("guest", false);
  nextPeriodBtn.disabled = false;
}
