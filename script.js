// ===========================================================
// APPARENCE PANEL — theme, ambiance, accessibility
// ===========================================================
const root = document.documentElement;

const paletteToggle = document.getElementById("paletteToggle");
const paletteClose = document.getElementById("paletteClose");
const palettePanel = document.getElementById("palettePanel");
const paletteBackdrop = document.getElementById("paletteBackdrop");
const ambianceRows = document.querySelectorAll(".ambiance-row");
const themeSwitch = document.getElementById("themeSwitch");
const contrastToggle = document.getElementById("contrastToggle");
const motionToggle = document.getElementById("motionToggle");

function openPanel() {
  palettePanel.classList.add("open");
  paletteBackdrop.classList.add("open");
}
function closePanel() {
  palettePanel.classList.remove("open");
  paletteBackdrop.classList.remove("open");
}

paletteToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  palettePanel.classList.contains("open") ? closePanel() : openPanel();
});
paletteClose.addEventListener("click", closePanel);
paletteBackdrop.addEventListener("click", closePanel);

document.addEventListener("click", (e) => {
  if (!palettePanel.contains(e.target) && e.target !== paletteToggle) closePanel();
});

// Ambiance (color palette)
ambianceRows.forEach(row => {
  row.addEventListener("click", () => {
    root.setAttribute("data-palette", row.dataset.palette);
    ambianceRows.forEach(r => r.classList.remove("active"));
    row.classList.add("active");
  });
});

// Thème clair / sombre
themeSwitch.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  themeSwitch.classList.toggle("active", !isDark);
  themeSwitch.setAttribute("aria-checked", String(!isDark));
});

// Contraste élevé
contrastToggle.addEventListener("click", () => {
  const isHigh = root.getAttribute("data-contrast") === "high";
  root.setAttribute("data-contrast", isHigh ? "normal" : "high");
  contrastToggle.classList.toggle("active", !isHigh);
  contrastToggle.setAttribute("aria-checked", String(!isHigh));
});

// Réduire les animations
let reduceMotion = false;
motionToggle.addEventListener("click", () => {
  reduceMotion = !reduceMotion;
  root.setAttribute("data-motion", reduceMotion ? "reduced" : "normal");
  motionToggle.classList.toggle("active", reduceMotion);
  motionToggle.setAttribute("aria-checked", String(reduceMotion));
});

// ===========================================================
// HEADER SHRINK ON SCROLL
// ===========================================================
const header = document.getElementById("siteHeader");
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 30);
  topBtn.classList.toggle("visible", y > 400);
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===========================================================
// MOBILE NAV
// ===========================================================
const burgerBtn = document.getElementById("burgerBtn");
const mainNav = document.getElementById("mainNav");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("open");
  mainNav.classList.toggle("open");
});

document.querySelectorAll("[data-nav]").forEach(link => {
  link.addEventListener("click", () => {
    burgerBtn.classList.remove("open");
    mainNav.classList.remove("open");
  });
});

// ===========================================================
// SCROLLSPY — active nav link
// ===========================================================
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("[data-nav]");

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove("active"));
      const active = document.querySelector(`[data-nav][href="#${entry.target.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach(s => spyObserver.observe(s));

// ===========================================================
// REVEAL ON SCROLL
// ===========================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ===========================================================
// HERO TERMINAL TYPING EFFECT
// ===========================================================
const codeLines = [
  "const dev = {",
  "  name: \"Fabère Bamba\",",
  "  role: \"Développeur Full-Stack\",",
  "  location: \"Abidjan, CI\",",
  "  formation: \"BTS IDA @ AIBS\",",
  "  stack: [\"JavaScript\", \"PHP\", \"Node.js\", \"MySQL\"],",
  "  currentGoal: \"Licence Informatique (L3)\",",
  "};",
  "",
  "export default dev;"
];

const typedEl = document.getElementById("typedCode");
let lineIndex = 0;
let charIndex = 0;
let output = "";

function typeCode() {
  if (lineIndex >= codeLines.length) return;
  const currentLine = codeLines[lineIndex];

  if (charIndex < currentLine.length) {
    output += currentLine[charIndex];
    charIndex++;
    typedEl.textContent = output;
    setTimeout(typeCode, 18 + Math.random() * 22);
  } else {
    output += "\n";
    lineIndex++;
    charIndex = 0;
    typedEl.textContent = output;
    setTimeout(typeCode, 90);
  }
}
setTimeout(typeCode, 500);

// ===========================================================
// CONTACT FORM — mailto handoff
// ===========================================================
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const subject = encodeURIComponent(`Contact portfolio — ${fname} ${lname}`);
  const body = encodeURIComponent(`${message}\n\n— ${fname} ${lname} (${email})`);

  window.location.href = `mailto:votre.email@exemple.com?subject=${subject}&body=${body}`;
  formNote.textContent = "Votre client mail va s'ouvrir avec le message pré-rempli.";
});

// ===========================================================
// FAQ ACCORDION
// ===========================================================
document.querySelectorAll(".accordion-item").forEach(item => {
  const trigger = item.querySelector(".accordion-trigger");
  const panel = item.querySelector(".accordion-panel");

  trigger.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".accordion-item.open").forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove("open");
        openItem.querySelector(".accordion-panel").style.maxHeight = null;
      }
    });

    if (isOpen) {
      item.classList.remove("open");
      panel.style.maxHeight = null;
    } else {
      item.classList.add("open");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

// ===========================================================
// CUSTOM CURSOR
// ===========================================================
const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

if (!isCoarsePointer) {
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll("a, button, [data-tilt], [data-tilt-soft]").forEach(el => {
    el.addEventListener("mouseenter", () => cursorRing.classList.add("hovering"));
    el.addEventListener("mouseleave", () => cursorRing.classList.remove("hovering"));
  });
}

// ===========================================================
// TILT — cards react to cursor position (desktop only)
// ===========================================================
if (!isCoarsePointer) {
  document.querySelectorAll("[data-tilt]").forEach(el => {
    el.addEventListener("mousemove", (e) => {
      if (reduceMotion) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(700px) rotateY(0) rotateX(0) translateY(0)";
    });
  });

  document.querySelectorAll("[data-tilt-soft]").forEach(el => {
    el.addEventListener("mousemove", (e) => {
      if (reduceMotion) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-6px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "translateY(0)";
    });
  });
}

// ===========================================================
// MAGNETIC BUTTONS
// ===========================================================
if (!isCoarsePointer) {
  document.querySelectorAll("[data-magnetic]").forEach(el => {
    el.addEventListener("mousemove", (e) => {
      if (reduceMotion) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.28}px, ${y * 0.5}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0, 0)";
    });
  });
}

// ===========================================================
// PLAYGROUND — interactive 3D cube
// ===========================================================
const cube = document.getElementById("cube3d");
const rotOnBtn = document.getElementById("rotOn");
const rotOffBtn = document.getElementById("rotOff");
const speedSlider = document.getElementById("speedSlider");
const axisBtns = document.querySelectorAll("[data-axis]");

let rotating = true;
let axis = "free";
let speed = Number(speedSlider.value) / 10;
let rotX = 25, rotY = -35;

rotOnBtn.addEventListener("click", () => {
  rotating = true;
  rotOnBtn.classList.add("active");
  rotOffBtn.classList.remove("active");
});
rotOffBtn.addEventListener("click", () => {
  rotating = false;
  rotOffBtn.classList.add("active");
  rotOnBtn.classList.remove("active");
});

speedSlider.addEventListener("input", () => {
  speed = Number(speedSlider.value) / 10;
});

axisBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    axis = btn.dataset.axis;
    axisBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

function animateCube() {
  if (rotating && !reduceMotion) {
    if (axis === "x" || axis === "free") rotX += speed;
    if (axis === "y" || axis === "free") rotY += speed * 0.75;
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }
  requestAnimationFrame(animateCube);
}
cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
animateCube();

// let the visitor also drag the cube directly
let dragging = false;
let lastX = 0, lastY = 0;
const cubeScene = document.querySelector(".cube-scene");

cubeScene.addEventListener("mousedown", (e) => {
  dragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});
window.addEventListener("mouseup", () => { dragging = false; });
window.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  rotY += dx * 0.4;
  rotX -= dy * 0.4;
  lastX = e.clientX;
  lastY = e.clientY;
});
cubeScene.style.cursor = "grab";

// ===========================================================
// HERO CANVAS — interactive constellation of points
// ===========================================================
const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");
const heroSection = document.getElementById("accueil");
let points = [];
let pointer = { x: null, y: null };

function resizeCanvas() {
  const rect = heroSection.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  const count = Math.floor((rect.width * rect.height) / 22000);
  points = Array.from({ length: count }, () => ({
    x: Math.random() * rect.width,
    y: Math.random() * rect.height,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
  }));
}

function getAccentColor() {
  return getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#22b573";
}

function drawCanvas() {
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  const accent = getAccentColor();

  points.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    if (pointer.x !== null) {
      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.x += (dx / dist) * force * 2.2;
        p.y += (dy / dist) * force * 2.2;
      }
    }
  });

  ctx.fillStyle = accent;
  points.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  });

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110) {
        ctx.strokeStyle = accent;
        ctx.globalAlpha = (1 - dist / 110) * 0.35;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
  requestAnimationFrame(drawCanvas);
}

heroSection.addEventListener("mousemove", (e) => {
  const rect = heroSection.getBoundingClientRect();
  pointer.x = e.clientX - rect.left;
  pointer.y = e.clientY - rect.top;
});
heroSection.addEventListener("mouseleave", () => { pointer.x = null; pointer.y = null; });

resizeCanvas();
drawCanvas();
window.addEventListener("resize", resizeCanvas);
