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
PROJECT MODAL
================== */
const infoButtons = document.querySelectorAll(".info-btn");

let activeModal = null;

function closeProjectModal() {
  if (!activeModal) return;

  activeModal.classList.remove("is-open");
  document.body.classList.remove("modal-open");

  activeModal.remove();
  activeModal = null;
}

function openProjectModal(title, infoHtml) {
  closeProjectModal();

  const modal = document.createElement("div");
  modal.className = "project-modal is-open";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.innerHTML = `
    <div class="project-modal-backdrop" data-close="true"></div>
    <div class="project-modal-panel">
      <button type="button" class="modal-close" aria-label="閉じる">×</button>
      <h2>${title}</h2>
      <div class="modal-body">${infoHtml}</div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.classList.add("modal-open");
  activeModal = modal;

  modal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("project-modal-backdrop") ||
      e.target.classList.contains("modal-close")
    ) {
      closeProjectModal();
    }
  });
}

infoButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const title = btn.dataset.title || "";
    const infoHtml = btn.dataset.info || "";
    openProjectModal(title, infoHtml);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && activeModal) {
    closeProjectModal();
  }
});

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