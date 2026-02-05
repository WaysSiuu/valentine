const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const backBtn = document.getElementById("backBtn");

const mainContent = document.getElementById("mainContent");
const gifContainer = document.getElementById("gifContainer");

let scale = 1;

// CLICK SUR NON → OUI GRANDIT
noBtn.addEventListener("click", () => {
    scale += 0.3;
    yesBtn.style.transform = `scale(${scale})`;
});

// CLICK SUR OUI → GIF
yesBtn.addEventListener("click", () => {
    mainContent.style.display = "none";
    gifContainer.style.display = "flex";
});

// RETOUR
backBtn.addEventListener("click", () => {
    gifContainer.style.display = "none";
    mainContent.style.display = "flex";
    scale = 1;
    yesBtn.style.transform = "scale(1)";
});
