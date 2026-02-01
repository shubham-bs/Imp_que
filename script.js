// Elements
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

let moveCount = 0;

// lock initial position once
const startRect = noBtn.getBoundingClientRect();
const startX = startRect.left;
const startY = startRect.top;

noBtn.addEventListener("mouseenter", () => {

    if (moveCount >= 4) return;
    moveCount++;

    const minX = startX - 100;  // left
    const maxX = startX + 100;  // right

    const minY = startY - 200;  // up
    const maxY = startY + 50;   // down

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    const currentRect = noBtn.getBoundingClientRect();

    const moveX = randomX - currentRect.left;
    const moveY = randomY - currentRect.top;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});





// Logic to make YES btn to grow

 let yesScale = 1;

 yesBtn.style.position = "relative"
 yesBtn.style.transformOrigin = "center center";
 yesBtn.style.transition = "transform 0.3s ease";

 noBtn.addEventListener("click", () => {
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
