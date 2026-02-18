console.log("✅ contact.js loaded");

/* ==================
FULLSCREEN MENU
================== */
const hamMenu = document.querySelector(".ham-menu");
const menuOverlay = document.getElementById("menuOverlay");

const worksItem = document.getElementById("worksItem");
const worksToggle = worksItem ? worksItem.querySelector(".submenu-toggle") : null;

function openMenu() {
  if (!menuOverlay) return;
  menuOverlay.classList.add("is-open");
  menuOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("menu-open");
  hamMenu?.classList.add("active");
}

function closeMenu() {
  if (!menuOverlay) return;
  menuOverlay.classList.remove("is-open");
  menuOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
  hamMenu?.classList.remove("active");

  if (worksItem && worksToggle) {
    worksItem.classList.remove("open");
    worksToggle.setAttribute("aria-expanded", "false");
  }
}

function toggleMenu() {
  if (!menuOverlay) return;
  menuOverlay.classList.contains("is-open") ? closeMenu() : openMenu();
}

if (hamMenu) {
  hamMenu.addEventListener("click", toggleMenu);
  hamMenu.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", (e) => {
    if (e.target?.dataset?.close === "true") closeMenu();
  });

  menuOverlay.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuOverlay?.classList.contains("is-open")) closeMenu();
});

if (worksItem && worksToggle) {
  worksToggle.addEventListener("click", () => {
    const willOpen = !worksItem.classList.contains("open");
    worksItem.classList.toggle("open", willOpen);
    worksToggle.setAttribute("aria-expanded", String(willOpen));
  });
}

/* ==================
WEBHOOK SUBMIT
================== */
const webhookURL = "https://port-mail.malec7858.workers.dev";

const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("statusMsg");

if (form && statusMsg) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formEl = e.currentTarget;

    const fd = new FormData(formEl);
    const payload = {
      name: (fd.get("name") || "").toString().trim(),
      message: (fd.get("message") || "").toString().trim(),
    };

    try {
      const res = await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      console.log("status:", res.status, "body:", text);

      if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
      if (!text.includes("Success")) throw new Error(`Unexpected response: ${text}`);

      statusMsg.innerText = "✅ メッセージを送信しました！";
      statusMsg.style.color = "green";
      statusMsg.style.display = "block";

      formEl.reset();
    } catch (err) {
      console.error("webhook error:", err);

      statusMsg.innerText = "❌ メッセージを送信できませんでした。";
      statusMsg.style.color = "red";
      statusMsg.style.display = "block";
    }
  });
}
