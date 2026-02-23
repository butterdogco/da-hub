const notificationsElement = document.getElementById("notifications");

function notify(info) {
  info.Text = info.Text || "No text for notification.";
  info.ShowTime = info.ShowTime || 3000;

  const p = document.createElement("p");
  p.classList.add("backdropBlur", "notification");
  p.innerHTML = info.Text;

  notificationsElement.appendChild(p);

  setTimeout(() => {
    p.style.animation = "notificationFadeOut 0.5s ease";
    setTimeout(() => p.remove(), 500);
  }, info.ShowTime);
}

function unlockAchievement(text) {
  notify({
    Text: `Achievement Unlock<br>${text}`,
    ShowTime: 5000,
  });
}