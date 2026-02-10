console.log("✅ contact.js loaded");

// -----------------------------------------------------------
// Hamburger menu
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

if (hamMenu && offScreenMenu) {
  hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
  });
}

// -----------------------------------------------------------
// Works popup
const worksItem = document.getElementById("works-item");
const popup = document.getElementById("popup");

if (worksItem && popup) {
  worksItem.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isSelected = worksItem.classList.contains("selected");

    document.querySelectorAll(".off-screen-menu li").forEach((li) => {
      li.classList.remove("selected");
    });

    popup.style.display = "none";

    if (!isSelected) {
      worksItem.classList.add("selected");
      popup.style.display = "block";
    }
  });

  document.addEventListener("click", (e) => {
    if (!popup.contains(e.target) && !worksItem.contains(e.target)) {
      worksItem.classList.remove("selected");
      popup.style.display = "none";
    }
  });
}

// -----------------------------------------------------------
// Webhook submit
const webhookURL = "https://port-mail.malec7858.workers.dev";

const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("statusMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formEl = e.currentTarget; // ✅ store form reference immediately

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

    formEl.reset(); // ✅ this will not be null
  } catch (err) {
    console.error("webhook error:", err);
    statusMsg.innerText = "❌ メッセージを送信できませんでした。";
    statusMsg.style.color = "red";
    statusMsg.style.display = "block";
  }
});