const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const loader = document.getElementById("loader");
const loaderText = document.getElementById("loaderText");
const app = document.getElementById("app");

let noClickedOnce = false;
let dodgeCount = 0;
const MAX_DODGES = 15;

/* FIRST NO CLICK — FAKE LOADER */
noBtn.addEventListener("click", () => {
  if (noClickedOnce) return;

  noClickedOnce = true;
  loader.classList.remove("hidden");

  const delay = Math.floor(Math.random() * 3000) + 5000;

  setTimeout(() => {
    loaderText.textContent = "PSYCH 😏";

    setTimeout(() => {
      loader.classList.add("hidden");
      activateNoEvasion();
    }, 1500);
  }, delay);
});

/* NO BUTTON — EVASION MODE */
function activateNoEvasion() {
  const messages = [
    "Nice try 😌",
    "Not happening 😘",
    "Wahe guruji already decided"
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

/* TOAST MESSAGE */
function showToast(text) {
  const toast = document.createElement("div");
  toast.textContent = text;
  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.right = "20px";
  toast.style.background = "white";
  toast.style.padding = "10px 14px";
  toast.style.borderRadius = "12px";
  toast.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
  toast.style.fontWeight = "600";
  toast.style.zIndex = "999";

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1800);
}

/* YES BUTTON — CELEBRATION */
yesBtn.addEventListener("click", () => {
  launchHearts();

  setTimeout(() => {
    app.innerHTML = `
      <h1>Congratulations! 💘</h1>
      <p>Your date with your beba is officially confirmed 🥰</p>
      <p>I love you ❤️</p>
      <p style="margin-top:16px;">
        Movie + food + you = my perfect Valentine’s Day 💕
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
