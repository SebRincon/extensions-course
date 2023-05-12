// Creating alarm that will run once a second
// other options like delays can be set
chrome.alarms.create("timerAlarm", {
  periodInMinutes: 1 / 60, // Alarm will run every second
});

// Alarm listener
chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(["timer", "isRunning"], (res) => {
    const time = res.timer ?? 0;
    const isRunning = res.isRunning ?? true;

    if (!isRunning) {
      return;
    }
    // Increasing the timer state
    chrome.storage.local.set({
      timer: time + 1,
    });

    // Settting the badgeText
    chrome.action.setBadgeText({
      text: `${time + 1}`,
    });
    chrome.storage.sync.get(["notificationTime"], (res) => {
      const notificationTime = res.notificationTime ?? 1000;
      if (time % notificationTime == 0) {
        this.registration.showNotification("Chrome Time Extension", {
          body: `${notificationTime} Seconds Has Passed`,
          icon: "icon.png",
        });
      }
    });
  });
});
