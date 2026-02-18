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
LIGHTBOX (VIDEOS)
================== */
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const mediaBox = document.getElementById("lightboxMedia");
const closeBtn = document.querySelector(".lightbox__close");

function openLightbox() {
  if (!lightbox) return;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  if (mediaBox) mediaBox.innerHTML = "";

  if (!document.body.classList.contains("menu-open")) {
    document.body.style.overflow = "";
  }
}

function showMedia({ type, src, poster }) {
  if (!mediaBox || !src) return;
  mediaBox.innerHTML = "";

  if (type === "video") {
    const vid = document.createElement("video");
    vid.src = src;
    vid.controls = true;
    vid.playsInline = true;
    vid.autoplay = true;
    vid.loop = true;
    vid.muted = true;
    vid.poster = poster || "";
    mediaBox.appendChild(vid);
  }

  openLightbox();
}

if (gallery) {
  gallery.addEventListener("click", (e) => {
    const btn = e.target.closest("button.thumb");
    if (!btn) return;

    showMedia({
      type: btn.dataset.type || "video",
      src: btn.dataset.src,
      poster: btn.dataset.poster || ""
    });
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
