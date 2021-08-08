const but = document.getElementById('learnmorebuttdiv');
const learn = document.getElementById('learnmore');
const audio = document.getElementById('rr');
const button = document.getElementById("learnmorebutt").onclick = changeRick;
async function changeRick() {
    but.style.display = "none";
    learn.style.display = "grid";
    audio.play();
};