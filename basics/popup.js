// Display Elements
const timeElement = document.getElementById("time");
const timerElement = document.getElementById("timer");
const nameElement = document.getElementById("name");

// Setting the time setting function to activate on HTML popup every 1 sec
function updateTimeElements() {
  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = `The time is: ${currentTime}`;

  chrome.storage.local.get(["timer"], (res) => {
    const time = res.timer ?? 0;
    timerElement.textContent = `The Timer is at: ${time}`;
  });
}

updateTimeElements();
setInterval(updateTimeElements, 1000);

chrome.storage.sync.get(["name"], (res) => {
  const name = res.name ?? "??";
  nameElement.textContent = `Your name is: ${name}`;
});

// Button Elements
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

startBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: true,
  });
});

stopBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
  });
});

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
  });
});
