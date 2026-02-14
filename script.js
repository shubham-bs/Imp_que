const noSound = new Audio("NO.mp3");
const moveSound = new Audio("Swoosh.mp3");
const yesSound = new Audio("RTC111.m4a");
yesSound.loop = true;

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
let leftCount = 0;
let rightCount = 0;

const memeWidth = 200;
const verticalSpacing = 15;


const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");
const letterWindow = document.querySelector(".letter-window");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");


envelope.addEventListener("click", () => {

    // unlock audio
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

function spawnMeme() {

    if (memeIndex >= memes.length) return;

    const meme = document.createElement("img");
    meme.src = memes[memeIndex];
    meme.classList.add("floating-meme");

    const memeWidth = 180;
    const memeHeight = 180;
    const padding = 20;

    meme.style.width = memeWidth + "px";

    // Random initial position
    const randomX = Math.random() * (window.innerWidth - memeWidth);
    const randomY = Math.random() * (window.innerHeight - memeHeight);

    meme.style.left = `${randomX}px`;
    meme.style.top = `${randomY}px`;

    document.body.appendChild(meme);

    let finalLeft, finalTop;

    // LEFT COLUMN (0–3)
    if (memeIndex < 4) {

        finalLeft = padding;
        finalTop = padding + memeIndex * (memeHeight + 15);

    }
    // RIGHT COLUMN (4–7)
    else if (memeIndex < 8) {

        finalLeft = window.innerWidth - memeWidth - padding;
        finalTop = padding + (memeIndex - 4) * (memeHeight + 15);

    }
    // TOP ROW (8–10)
    else {

        const topIndex = memeIndex - 8;
        const totalWidth = memeWidth * 3 + 30;
        const startX = (window.innerWidth - totalWidth) / 2;

        finalLeft = startX + topIndex * (memeWidth + 15);
        finalTop = padding;

    }

    // Animate to final slot
    setTimeout(() => {
        meme.style.left = `${finalLeft}px`;
        meme.style.top = `${finalTop}px`;
    }, 300);

    memeIndex++;
}


let moveCount = 0;

noBtn.addEventListener("mouseenter", () => {

    if (moveCount >= 4) return;

    moveCount++;

    moveSound.currentTime = 0;
    moveSound.play();

    if (moveCount === 1) {
        spawnMeme(); spawnMeme(); spawnMeme(); // 3
    }
    else if (moveCount === 2) {
        spawnMeme(); spawnMeme(); spawnMeme(); // 3
    }
    else if (moveCount === 3) {
        spawnMeme(); spawnMeme(); // 2
    }
    else if (moveCount === 4) {
        spawnMeme(); spawnMeme(); // 2
    }

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

    // Last 2 memes appear on click
    spawnMeme();
});

// ===== YES CLICKED =====
yesBtn.addEventListener("click", () => {

    yesSound.currentTime = 0;
    yesSound.play();

    title.textContent = "Yippeeee!";
    catImg.src = "cat_dance.gif";

    // Fade out all memes slowly
const allMemes = document.querySelectorAll(".floating-meme");

allMemes.forEach(meme => {
    meme.classList.add("fade-out");
});

// Optional: remove them from DOM after fade
setTimeout(() => {
    allMemes.forEach(meme => meme.remove());
}, 4000);


    letterWindow.classList.add("final");

    buttons.style.display = "none";
    finalText.style.display = "block";
});

