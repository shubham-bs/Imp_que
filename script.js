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
    "as11.png",
    "as12.png"
];

let memeIndex = 0;
let leftCount = 0;
let rightCount = 0;

const memeWidth = 200;
const verticalSpacing = 15;


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

// ===== SPAWN MEME FUNCTION =====
function spawnMeme() {

    if (memeIndex >= memes.length) return;

    const meme = document.createElement("img");
    meme.src = memes[memeIndex];
    meme.classList.add("floating-meme");

    // Random initial position
    const randomX = Math.random() * (window.innerWidth - memeWidth);
    const randomY = Math.random() * (window.innerHeight - 300);

    meme.style.left = `${randomX}px`;
    meme.style.top = `${randomY}px`;

    document.body.appendChild(meme);

    // Decide final side
    const side = memeIndex % 2 === 0 ? "left" : "right";

    let finalTop;

    if (side === "left") {
        finalTop = 20 + leftCount * (memeWidth * 0.75 + verticalSpacing);
        leftCount++;
    } else {
        finalTop = 20 + rightCount * (memeWidth * 0.75 + verticalSpacing);
        rightCount++;
    }

    // Animate to column after short delay
    setTimeout(() => {

        meme.style.top = `${finalTop}px`;

        if (side === "left") {
            meme.style.left = "20px";
        } else {
            meme.style.left = "";
            meme.style.right = "20px";
        }

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

// ===== NO CLICK =====
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

    letterWindow.classList.add("final");

    buttons.style.display = "none";
    finalText.style.display = "block";
});

