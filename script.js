// Elements
const noSound = new Audio("NO.mp3");
const moveSound = new Audio("Swoosh.mp3");
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope

envelope.addEventListener("click", () => {

    moveSound.muted = true;
    moveSound.play().then(() => {
        moveSound.pause();
        moveSound.currentTime = 0;
        moveSound.muted = false;
    });
    
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

/*noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
}); */

/*
let moveCount = 0;

const letterWindow = document.querySelector(".letter-window");

noBtn.addEventListener("mouseenter", () => {

    if (moveCount >= 4) return;
    moveCount++;

    const letterRect = letterWindow.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const padding = 15;

    // allowed area inside the letter window
    const minX = letterRect.left + padding;
    const maxX = letterRect.right - btnRect.width - padding;

    const minY = letterRect.top + padding;
    const maxY = letterRect.bottom - btnRect.height - padding;

    const currentX = btnRect.left;
    const currentY = btnRect.top;

    const maxJump = 80; // how far it can jump in one move

    let randomX = currentX + (Math.random() * 2 - 1) * maxJump;
    let randomY = currentY + (Math.random() * 2 - 1) * maxJump;

// clamp inside the letter window
    randomX = Math.min(Math.max(randomX, minX), maxX);
    randomY = Math.min(Math.max(randomY, minY), maxY);


    const moveX = randomX - btnRect.left;
    const moveY = randomY - btnRect.top;

    noBtn.style.transition = "transform 0.2s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});
*/

let moveCount = 0;

const letterWindow = document.querySelector(".letter-window");

noBtn.addEventListener("mouseenter", () => {

    if (moveCount >= 4) return;
    moveCount++;

    moveSound.currentTime = 0;
    moveSound.play();
    
    const letterRect = letterWindow.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const padding = 16; // keep some margin from edges

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




// Logic to make YES btn to grow

 let yesScale = 1;

 yesBtn.style.position = "relative"
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
     }else{
         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
     }
});

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});
