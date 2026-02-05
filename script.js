const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const loader = document.getElementById("loader");
const loaderText = document.getElementById("loaderText");
const app = document.getElementById("app");

let noClickedOnce = false;
let dodgeCount = 0;
const MAX_DODGES = 15;
let activeToast = null;

/* FIRST NO CLICK — FAKE LOADER */
noBtn.addEventListener("click", () => {
  if (noClickedOnce) return;

  noClickedOnce = true;
  loader.classList.remove("hidden");

  const delay = Math.random() * 500 + 2500;

  setTimeout(() => {
    loaderText.textContent = "PSYCH 😏";
    loaderText.classList.add("psych");

    setTimeout(() => {
      loader.classList.add("hidden");
      loaderText.classList.remove("psych");
      loaderText.textContent = "Loading...";
      activateNoEvasion();
    }, 1500);
  }, delay);
});

/* NO BUTTON — EVASION MODE */
function activateNoEvasion() {
  const messages = [
    "Nice try 😌",
    "Not happening 😘",
    "Wahe guruji already decided",
    "Nope! 🙅‍♀️",
    "Keep dreaming 💭",
    "Try again 😏",
    "Still no 😤",
    "Seriously? 🤨",
    "Not today 💅",
    "You wish! 😆",
    "Nah 😏",
    "No way 🚫",
    "Dream on 🌙",
    "Not a chance 🙄",
    "Absolutely not 😤",
    "Good effort though 😅",
    "Maybe in another life 👻",
    "Hahaha no 🤣"
  ];

  noBtn.addEventListener("mouseenter", dodge);
  noBtn.addEventListener("touchstart", dodge);

  function dodge() {
    dodgeCount++;

    if (dodgeCount >= MAX_DODGES) {
      noBtn.remove();
      yesBtn.classList.add("super-yes");
      showToast("Okay okay 😌 you have only one choice now");
      return;
    }

    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 60);

    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    noBtn.style.transform = "scale(" + (Math.random() * 0.6 + 0.7) + ")";

    showToast(messages[Math.floor(Math.random() * messages.length)]);
  }

  noBtn.addEventListener("click", e => e.preventDefault());
}

/* TOAST */
function showToast(text) {
  if (activeToast) {
    activeToast.remove();
    activeToast = null;
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = text;

  activeToast = toast;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
    if (activeToast === toast) {
      activeToast = null;
    }
  }, 1800);
}

/* YES BUTTON — CELEBRATION */
yesBtn.addEventListener("click", () => {
  launchHearts();
  launchConfetti();

  setTimeout(() => {
    app.innerHTML = `
      <h1>Congratulations! 💘</h1>
      <p>Your date with your beba is officially confirmed 🥰</p>
      <p>I love you ❤️</p>
      <p style="margin-top:16px;">
        Movie + food + you = my perfect Valentine's Day 💕
      </p>
    `;
  }, 1500);
});

/* HEART RAIN */
function launchHearts() {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-30px";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s";

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }
}

/* CONFETTI CANNONS */
function launchConfetti() {
  const colors = ["#ff5c8a", "#ffd1dc", "#ffb3c6", "#fff"];

  for (let i = 0; i < 60; i++) {
    createConfetti(20, window.innerHeight - 20, 1, colors);
    createConfetti(window.innerWidth - 20, window.innerHeight - 20, -1, colors);
  }
}

function createConfetti(x, y, direction, colors) {
  const confetti = document.createElement("div");
  confetti.className = "confetti";
  confetti.style.left = x + "px";
  confetti.style.top = y + "px";
  confetti.style.background =
    colors[Math.floor(Math.random() * colors.length)];

  const xMove = direction * (Math.random() * 300 + 100);
  const yMove = -(Math.random() * 400 + 200);

  confetti.style.setProperty("--x", xMove + "px");
  confetti.style.setProperty("--y", yMove + "px");
  confetti.style.animationDuration = Math.random() * 1.5 + 1 + "s";

  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 3000);
}
