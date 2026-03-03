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

if (worksItem && worksToggle) {
  worksToggle.addEventListener("click", () => {
    const willOpen = !worksItem.classList.contains("open");
    worksItem.classList.toggle("open", willOpen);
    worksToggle.setAttribute("aria-expanded", String(willOpen));
  });
}

/* ==================
PROJECT MODAL
================== */
const projectModal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const infoButtons = document.querySelectorAll(".info-btn");

function openProjectModal(title, info) {
  if (!projectModal || !modalTitle || !modalBody) return;

  modalTitle.textContent = title;
  modalBody.innerHTML = info;
  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalClose?.focus();
}

function closeProjectModal() {
  if (!projectModal) return;

  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

infoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const title = button.dataset.title || "";
    const info = button.dataset.info || "あああああああああああああああ";
    openProjectModal(title, info);
  });
});

if (projectModal) {
  projectModal.addEventListener("click", (e) => {
    if (e.target?.dataset?.modalClose === "true") {
      closeProjectModal();
    }
  });
}

if (modalClose) {
  modalClose.addEventListener("click", closeProjectModal);
}

/* ==================
GLOBAL ESCAPE KEY
================== */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (projectModal?.classList.contains("is-open")) {
      closeProjectModal();
      return;
    }

    if (menuOverlay?.classList.contains("is-open")) {
      closeMenu();
    }
  }
});