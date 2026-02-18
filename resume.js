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
PRINT
================== */
const printBtn = document.getElementById("printBtn");

function printImage() {
  const win = window.open("", "_blank");
  if (!win) return;

  win.document.write(`
    <html>
      <head><title>Print</title></head>
      <body style="margin:0">
        <img src="resume/履歴書1.png" style="width:95%; display:block; margin:24px auto;">
        <img src="resume/履歴書2.png" style="width:95%; display:block; margin:24px auto;">
        <script>
          window.onload = () => { window.print(); window.close(); };
        </script>
      </body>
    </html>
  `);
  win.document.close();
}

if (printBtn) {
  printBtn.addEventListener("click", printImage);
}
