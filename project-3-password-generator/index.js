// ===== CHARACTERS POOL =====
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
  "",
);
const numbers = "0123456789".split("");
const symbols = "~`!@#$%^&*()_-+={[}]|:;<>.?/".split("");

const passEl1 = document.getElementById("password-1");
const passEl2 = document.getElementById("password-2");
const lengthInput = document.getElementById("length-input");
const numbersToggle = document.getElementById("numbers-toggle");
const symbolsToggle = document.getElementById("symbols-toggle");
const generateBtn = document.getElementById("generate-btn");
const toast = document.getElementById("toast");

function generatePassword(length, includeNumbers, includeSymbols) {
  // Gabung pool berdasarkan toggle
  let pool = [...letters];
  if (includeNumbers) pool = [...pool, ...numbers];
  if (includeSymbols) pool = [...pool, ...symbols];

  // Generate password
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    password += pool[randomIndex];
  }
  return password;
}

function handleGenerate() {
  // Ambil input user
  const length = Number(lengthInput.value) || 15;
  const includeNumbers = numbersToggle.checked;
  const includeSymbols = symbolsToggle.checked;

  // Generate 2 password berbeda
  passEl1.textContent = generatePassword(
    length,
    includeNumbers,
    includeSymbols,
  );
  passEl2.textContent = generatePassword(
    length,
    includeNumbers,
    includeSymbols,
  );
}

function copyToClipboard(element) {
  // Kalau password masih kosong, jangan copy
  if (!element.textContent) return;

  navigator.clipboard
    .writeText(element.textContent)
    .then(() => showToast("Copied!"))
    .catch(() => showToast("Failed to copy"));
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1500);
}

// ===== EVENT LISTENERS =====
generateBtn.addEventListener("click", handleGenerate);

passEl1.addEventListener("click", () => copyToClipboard(passEl1));
passEl2.addEventListener("click", () => copyToClipboard(passEl2));

// ===== INITIAL GENERATE =====
handleGenerate();
