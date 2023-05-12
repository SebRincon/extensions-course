// Creating alarm that will run once a second
// other options like delays can be set
chrome.alarms.create("timerAlarm", {
  periodInMinutes: 1 / 60, // Alarm will run every second
});

// Alarm listener
chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(["timer"], (res) => {
    const time = res.timer ?? 0;
    // Increasing the timer state
    chrome.storage.local.set({
      timer: time + 1,
    });

    // Settting the badgeText
    chrome.action.setBadgeText({
      text: `${time + 1}`,
    });
  });
});
