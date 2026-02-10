// =======================
// Hamburger menu
// =======================
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
const worksItem = document.getElementById("works-item");
const popup = document.getElementById("popup");

if (hamMenu && offScreenMenu) {
  hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
  });

  // Optional: allow Enter/Space to toggle (since it's role="button")
  hamMenu.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      hamMenu.click();
    }
  });
}

// =======================
// Works popup
// =======================
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

// =======================
// Lightbox (images)
// =======================
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".lightbox__close");

function openLightbox(src, alt) {
  if (!lightboxImg || !lightbox) return;

  lightboxImg.src = src;
  lightboxImg.alt = alt || "";

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightboxImg || !lightbox) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

if (gallery) {
  gallery.addEventListener("click", (e) => {
    const btn = e.target.closest("button.thumb");
    if (!btn) return;

    const img = btn.querySelector("img");
    if (!img) return;

    openLightbox(img.src, img.alt);
  });
}

if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target.dataset.close === "true") closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});
