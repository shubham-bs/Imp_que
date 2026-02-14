// ===== SOUNDS =====
const noSound = new Audio("NO.mp3");
const moveSound = new Audio("Swoosh.mp3");
const yesSound = new Audio("RTC111.m4a");
yesSound.loop = true;

// ===== MEMES =====
const memes = [
    "as1.png",
    "as2.png",
    "as3.png",
    "as4.png",
    "as5.png",
    "as6.png",
    "as7.png",
    "as8.png",
    "as9.png",
    "as10.png",
    "as12.png"
];

let memeIndex = 0;

// ===== ELEMENTS =====
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");
const letterWindow = document.querySelector(".letter-window");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// ===== OPEN ENVELOPE =====
envelope.addEventListener("click", () => {

    moveSound.muted = true;
    moveSound.play().then(() => {
        moveSound.pause();
        moveSound.currentTime = 0;
        moveSound.muted = false;
    });

    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
        letterWindow.classList.add("open");
    }, 50);
});

// ===== SPAWN MEME FUNCTION =====
function spawnMeme() {

    if (memeIndex >= memes.length) return;

    const meme = document.createElement("img");
    meme.src = memes[memeIndex];
    meme.classList.add("floating-meme");

    const padding = 30;
    const spacing = 25;

    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;

    let memeWidth;
    let memeHeight;
    let finalLeft, finalTop;

    // === LEFT COLUMN (0–3) ===
    if (memeIndex < 4) {

        memeWidth = Math.min(screenWidth * 0.18, 360);
        memeHeight = memeWidth * 0.75;

        meme.style.width = memeWidth + "px";

        finalLeft = padding;
        finalTop = padding + memeIndex * (memeHeight + spacing);
    }

    // === RIGHT COLUMN (4–7) ===
    else if (memeIndex < 8) {

        memeWidth = Math.min(screenWidth * 0.18, 360);
        memeHeight = memeWidth * 0.75;

        meme.style.width = memeWidth + "px";

        finalLeft = screenWidth - memeWidth - padding;
        finalTop = padding + (memeIndex - 4) * (memeHeight + spacing);
    }

    // === TOP ROW (8–10) ===
    else {

        memeWidth = Math.min(screenWidth * 0.13, 240);
        memeHeight = memeWidth * 0.75;

        meme.style.width = memeWidth + "px";

        const topIndex = memeIndex - 8;
        const totalWidth = memeWidth * 3 + spacing * 2;
        const startX = (screenWidth - totalWidth) / 2;

        finalLeft = startX + topIndex * (memeWidth + spacing);
        finalTop = padding;
    }

    // Prevent bottom overflow (Windows safety)
    if (finalTop + memeHeight > screenHeight) {
        finalTop = screenHeight - memeHeight - padding;
    }

    // === RANDOM START POSITION ===
    const randomX = Math.random() * (screenWidth - memeWidth);
    const randomY = Math.random() * (screenHeight - memeHeight);

    meme.style.left = `${randomX}px`;
    meme.style.top = `${randomY}px`;

    document.body.appendChild(meme);

    // === ANIMATE TO FINAL POSITION ===
    setTimeout(() => {
        meme.style.left = `${finalLeft}px`;
        meme.style.top = `${finalTop}px`;
    }, 300);

    memeIndex++;
}

// ===== NO BUTTON MOVE =====
let moveCount = 0;

noBtn.addEventListener("mouseenter", () => {

    if (moveCount >= 4) return;

    moveCount++;

    moveSound.currentTime = 0;
    moveSound.play();

    // 10 memes across 4 movements
    if (moveCount === 1) {
        spawnMeme(); spawnMeme(); spawnMeme();
    }
    else if (moveCount === 2) {
        spawnMeme(); spawnMeme(); spawnMeme();
    }
    else if (moveCount === 3) {
        spawnMeme(); spawnMeme();
    }
    else if (moveCount === 4) {
        spawnMeme(); spawnMeme();
    }

    // Move logic
    const letterRect = letterWindow.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const padding = 16;

    const minX = letterRect.left + padding;
    const maxX = letterRect.right - btnRect.width - padding;
    const minY = letterRect.top + padding;
    const maxY = letterRect.bottom - btnRect.height - padding;

    const currentX = btnRect.left;
    const currentY = btnRect.top;

    const maxJump = 110;

    let randomX = currentX + (Math.random() * 2 - 1) * maxJump;
    let randomY = currentY + (Math.random() * 2 - 1) * maxJump;

    randomX = Math.min(Math.max(randomX, minX), maxX);
    randomY = Math.min(Math.max(randomY, minY), maxY);

    const moveX = randomX - currentX;
    const moveY = randomY - currentY;

    noBtn.style.transition = "transform 0.2s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// ===== YES BUTTON GROW =====
let yesScale = 1;

yesBtn.style.position = "relative";
yesBtn.style.transformOrigin = "center center";
yesBtn.style.transition = "transform 0.3s ease";

noBtn.addEventListener("click", () => {

    noSound.currentTime = 0;
    noSound.play();

    yesScale += 2;

    if (yesBtn.style.position !== "fixed") {
        yesBtn.style.position = "fixed";
        yesBtn.style.top = "50%";
        yesBtn.style.left = "50%";
        yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
    } else {
        yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
    }

    // Remaining memes on click
    spawnMeme();
});

// ===== YES CLICKED =====
yesBtn.addEventListener("click", () => {

    yesSound.currentTime = 0;
    yesSound.play();

    title.textContent = "Yippeeee!";
    catImg.src = "cat_dance.gif";

    // Fade out memes
    const allMemes = document.querySelectorAll(".floating-meme");

    allMemes.forEach(meme => {
        meme.classList.add("fade-out");
    });

    setTimeout(() => {
        allMemes.forEach(meme => meme.remove());
    }, 4000);

    letterWindow.classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";
});
