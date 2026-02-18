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
LIGHTBOX (IMAGES)
================== */
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".lightbox__close");

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  if (lightboxImg) {
    lightboxImg.src = "";
    lightboxImg.alt = "";
  }

  if (!document.body.classList.contains("menu-open")) {
    document.body.style.overflow = "";
  }
}

if (gallery) {
  gallery.addEventListener("click", (e) => {
    const img = e.target.closest("button.thumb")?.querySelector("img");
    if (!img) return;
    openLightbox(img.src, img.alt);
  });
}

if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target?.dataset?.close === "true") closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox?.classList.contains("is-open")) closeLightbox();
});
