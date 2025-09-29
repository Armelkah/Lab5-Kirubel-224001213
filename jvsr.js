/* === Side Panel Toggle === */
function toggleSidePanel() {
  const sidePanel = document.getElementById("sidePanel");
  sidePanel.classList.toggle("open");
}

// ESC closes
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const panel = document.getElementById("sidePanel");
    if (panel.classList.contains("open")) toggleSidePanel();
  }
});

// Outside click closes
document.addEventListener("click", (e) => {
  const panel = document.getElementById("sidePanel");
  const kebabBtn = document.querySelector(".kebab-menu");
  if (
    panel.classList.contains("open") &&
    !panel.contains(e.target) &&
    !kebabBtn.contains(e.target)
  ) {
    toggleSidePanel();
  }
});

/* === Toast === */
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span>${message}</span>
    <span class="toast-close" onclick="this.parentElement.remove()">&times;</span>
  `;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    if (toast.parentElement) {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }
  }, 3000);
}

/* === Customization === */
function changeColor(event, variable, color) {
  document.documentElement.style.setProperty('--${variable}', color);
  document.querySelectorAll(".color-option").forEach(opt => opt.classList.remove("active"));
  event.target.classList.add("active");
  showToast('Color changed to ${color}', "success");
}

function changeTheme(theme) {
  const body = document.body;
  body.classList.remove("dark-theme", "blue-theme", "green-theme");
  if (theme === "dark") body.classList.add("dark-theme");
  else if (theme === "blue") body.classList.add("blue-theme");
  else if (theme === "green") body.classList.add("green-theme");
  showToast('Theme changed to ${theme}', "success");
}

function changeFontSize(size) {
  document.documentElement.style.fontSize = size + "px";
  document.getElementById("fontSizeValue").textContent = size + "px";
  showToast('Font size set to ${size}px', "info");
}

function changeBorderRadius(radius) {
  document.documentElement.style.setProperty("--border-radius", radius + "px");
  document.getElementById("borderRadiusValue").textContent = radius + "px";
  showToast('Border radius set to ${radius}px', "info");
}

function resetStyles() {
  document.documentElement.style.setProperty("--primary", "#4361ee");
  document.documentElement.style.setProperty("--secondary", "#3a0ca3");
  document.body.classList.remove("dark-theme", "blue-theme", "green-theme");
  document.documentElement.style.fontSize = "16px";
  document.getElementById("fontSize").value = "16";
  document.getElementById("fontSizeValue").textContent = "16px";
  document.documentElement.style.setProperty("--border-radius", "5px");
  document.getElementById("borderRadius").value = "5";
  document.getElementById("borderRadiusValue").textContent = "5px";
  document.getElementById("themeSelect").value = "light";
  document.querySelectorAll(".color-option").forEach(opt => opt.classList.remove("active"));
  document.querySelector('.color-option[style*="#4361ee"]').classList.add("active");
  showToast("Styles reset to default", "success");
}/* ========== CLOCK + CALENDAR + MOOD ========== */

// default view
let clockType = "digital";

function setClockType(type) {
  clockType = type;

  const analogWrap = document.getElementById("analog-clock-container");
  const digitalClock = document.getElementById("clock");

  // toggle button states
  document.getElementById("digitalToggle")?.classList.toggle("active", type === "digital");
  document.getElementById("analogToggle")?.classList.toggle("active", type === "analog");

  if (type === "digital") {
    analogWrap.style.display = "none";
    digitalClock.style.display = "block";
  } else {
    analogWrap.style.display = "flex";
    digitalClock.style.display = "none";
    drawAnalogClock(); // immediate draw
  }
}

function updateClock() {
  const now = new Date();

  if (clockType === "digital") {
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    document.getElementById("clock").textContent = time;
  } else {
    drawAnalogClock();
  }

  const dateStr = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  document.getElementById("date").textContent = dateStr;
}

function drawAnalogClock() {
  const canvas = document.getElementById("analog-clock");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const size = Math.min(canvas.width, canvas.height);
  const r = size / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(r, r);

  const css = getComputedStyle(document.documentElement);
  const face = css.getPropertyValue("--card-bg").trim() || "#fff";
  const ring = css.getPropertyValue("--primary").trim() || "#4361ee";
  const marks = css.getPropertyValue("--text-color").trim() || "#212529";

  // face
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.92, 0, Math.PI * 2);
  ctx.fillStyle = face;
  ctx.fill();

  // ring
  ctx.lineWidth = r * 0.06;
  ctx.strokeStyle = ring;
  ctx.stroke();

  // hour marks
  ctx.strokeStyle = marks;
  ctx.lineWidth = r * 0.03;
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * r * 0.72, Math.sin(a) * r * 0.72);
    ctx.lineTo(Math.cos(a) * r * 0.82, Math.sin(a) * r * 0.82);
    ctx.stroke();
  }

  const now = new Date();
  const hour = now.getHours() % 12;
  const minute = now.getMinutes();
  const second = now.getSeconds();

  // hands
  drawHand((hour + minute / 60) * (Math.PI / 6), r * 0.5, r * 0.05, marks);
  drawHand((minute + second / 60) * (Math.PI / 30), r * 0.72, r * 0.035, marks);
  drawHand(second * (Math.PI / 30), r * 0.78, r * 0.02, ring);

  // cap
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.04, 0, Math.PI * 2);
  ctx.fillStyle = ring;
  ctx.fill();

  ctx.restore();

  function drawHand(angle, length, width, color) {
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.restore();
  }
}

/* ===== Mini Calendar ===== */
function generateCalendar(dateObj = new Date()) {
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();
  const today = new Date();

  const title = document.getElementById("current-month");
  const grid = document.getElementById("mini-calendar");
  if (!title || !grid) return;

  title.textContent = '${dateObj.toLocaleString("default", { month: "long" })} ${year}';
  grid.innerHTML = "";

  // headings
  ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].forEach((d) => {
    const el = document.createElement("div");
    el.className = "calendar-day day-name";
    el.textContent = d;
    grid.appendChild(el);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar-day empty";
    grid.appendChild(empty);
  }

  for (let d = 1; d <= total; d++) {
    const el = document.createElement("div");
    el.className = "calendar-day";
    el.textContent = d;

    if (year === today.getFullYear() && month === today.getMonth() && d === today.getDate()) {
      el.classList.add("current");
    }

    el.addEventListener("click", () => {
      grid.querySelectorAll(".calendar-day.selected").forEach((n) => n.classList.remove("selected"));
      el.classList.add("selected");
      const msg = 'Selected ${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}';
      if (typeof showToast === "function") showToast(msg, "info");
    });

    grid.appendChild(el);
  }

  grid.dataset.year = year;
  grid.dataset.month = month;
}

/* ===== Mood reactions ===== */
/*function trackMood(emoji) {
  const responses = {
    "😄": "Great to see you happy! 🎉",
    "🙂": "Looking good — keep it up!",
    "😐": "Neutral vibes. A quick stretch break?",
    "😢": "Sorry you’re down. Sending a hug 💙",
    "😤": "Deep breaths — you’ve got this 💪",
  };
  const out = document.getElementById("mood-response");
  const text = responses[emoji] || 'Mood set to ${emoji}';
*/
// Mood tracking function
function trackMood(emoji) {
  const responses = {
    "😄": "Great to see you happy today!",
    "🙂": "Looking good! Have a nice day.",
    "😐": "Hope your day gets better soon.",
    "😢": "Sorry you're feeling down.",
    "😤": "Take a deep breath, things will improve.",
  };

  document.getElementById("mood-response").textContent = responses[emoji];
  showToast(`Mood set to ${emoji}`, "success");
}
/*
  if (out) {
    out.textContent = text;
    out.classList.remove("pop");
    void out.offsetWidth; // restart animation
    out.classList.add("pop");
  }
  if (typeof showToast === "function") showToast('Mood set to ${emoji}', "success");
}
*/
/* ===== Init ===== */
document.addEventListener("DOMContentLoaded", () => {
  setClockType("digital");       // default
  updateClock();
  setInterval(updateClock, 1000);
  generateCalendar();

  // keep analog crisp on resize
  window.addEventListener("resize", () => {
    if (clockType === "analog") drawAnalogClock();
  });
});
// Alert functionality
function closeAlert(alert) {
  alert.style.display = "none";
}

function showAlert(type) {
  let message = "";
  switch (type) {
    case "success":
      message = "This is a success message!";
      break;
    case "warning":
      message = "This is a warning message!";
      break;
    case "info":
      message = "This is an info message!";
      break;
  }
  showToast(message, type);
}

// Progress bar functionality
function animateProgress(id, targetWidth) {
  const progressBar = document.getElementById(id);
  progressBar.style.width = targetWidth + "%";
  showToast(`Progress updated to ${targetWidth}%`, "success");
}
