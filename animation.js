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

  // Optional keyboard support
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
// Lightbox (videos)
// =======================
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const mediaBox = document.getElementById("lightboxMedia");
const closeBtn = document.querySelector(".lightbox__close");

function openLightbox() {
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  // Stop video playback by removing the element
  if (mediaBox) mediaBox.innerHTML = "";
}

function showMedia({ type, src, poster }) {
  if (!mediaBox || !src) return;
  mediaBox.innerHTML = "";

  if (type === "video") {
    const vid = document.createElement("video");
    vid.src = src;

    vid.controls = true;
    vid.playsInline = true;

    // Autoplay + loop (auto replay)
    vid.autoplay = true;
    vid.loop = true;

    // Recommended so autoplay works reliably in browsers
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
    if (e.target.dataset.close === "true") closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});
