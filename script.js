/*
jumpNoButton(messages[Math.floor(rand(0, messages.length))]);
});


// occasional teasing micro-jumps every few seconds
setInterval(() => {
if (!document.body.contains(noBtn)) return;
if (Math.random() < 0.45) {
const msg = messages[Math.floor(rand(0, messages.length))];
jumpNoButton(msg);
}
}, 2500);
}


// YES button logic: heart-rain, confetti, and final confirmation screen
yesBtn.addEventListener('click', async () => {
// run the celebration
celebrate();


// replace content after a short delay with the confirmation message
setTimeout(() => showConfirmation(), 1800);
});


function celebrate() {
// create hearts
const number = 24;
for (let i = 0; i < number; i++) createFallingHeart();


// create confetti
for (let i = 0; i < 40; i++) createConfettiPiece();
}


function createFallingHeart() {
const el = document.createElement('div');
el.className = 'heart';
const size = rand(18, 44);
el.style.width = size + 'px';
el.style.height = size + 'px';
el.style.left = rand(6, window.innerWidth - size - 6) + 'px';
el.style.top = -rand(40, 120) + 'px';
el.style.opacity = rand(.8, 1);
const duration = rand(2500, 6000);
el.style.animation = `fall ${duration}ms linear forwards`;
el.style.transform = `rotate(${rand(-200, 200)}deg)`;
document.body.appendChild(el);
setTimeout(() => el.remove(), duration + 800);
}


function createConfettiPiece() {
const el = document.createElement('div');
el.className = 'confetti';
const size = Math.floor(rand(6, 12));
el.style.width = size + 'px';
el.style.height = size + 'px';
el.style.left = rand(6, window.innerWidth - size - 6) + 'px';
el.style.top = -rand(10, 200) + 'px';
el.style.background = `linear-gradient(45deg, hsl(${rand(330, 360)},80%,65%), hsl(${rand(0, 30)},90%,65%))`;
el.style.animation = `confettiFall ${rand(2000, 4800)}ms linear forwards`;
document.body.appendChild(el);
setTimeout(() => el.remove(), 5200);
}


function showConfirmation() {
// clear main content and show romantic message
document.body.querySelector('.page').innerHTML = `
<div class="confirm">
<h2>Congratulations! 💘</h2>
<p>Your date with your beba is officially confirmed 🥰</p>
<p>I love you ❤️</p>
<p class="sub">Movie + food + you = my perfect Valentine\'s Day 💕</p>
</div>
`;
}


// Small UX nicety: clicking anywhere near YES triggers a small heart pulse
yesBtn.addEventListener('mouseenter', () => showToast('Yesss 💕', 800));


// Accessibility: allow keyboard answers
document.addEventListener('keydown', (e) => {
if (e.key === 'y' || e.key === 'Y') yesBtn.click();
if ((e.key === 'n' || e.key === 'N') && !noLocked) noBtn.click();
});


// Prevent accidental selection while running
window.addEventListener('selectstart', (e) => { if (noLocked) e.preventDefault(); });


// --- End of script.js ---