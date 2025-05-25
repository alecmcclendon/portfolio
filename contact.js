const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
const worksItem = document.getElementById("works-item");
const popup = document.getElementById("popup");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

// -----------------------------------------------------------


if (worksItem && popup) {
  // Toggle selected class and popup
  worksItem.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent click from bubbling to document

    const isSelected = worksItem.classList.contains("selected");

    // Remove all other selected classes
    document.querySelectorAll(".off-screen-menu li").forEach((li) => {
      li.classList.remove("selected");
    });

    // Hide popup by default
    popup.style.display = "none";

    // Toggle based on previous state
    if (!isSelected) {
      worksItem.classList.add("selected");
      popup.style.display = "block";
    }
  });

// --------------------------------------------------

  // Click outside to close
  document.addEventListener("click", function (e) {
    if (
      !popup.contains(e.target) &&
      !worksItem.contains(e.target)
    ) {
      worksItem.classList.remove("selected");
      popup.style.display = "none";
    }
  });
}

// --------------------------------------------------------


// helper to wire up one button
function makeCopyBtn(btnId, textElId) {
  const btn    = document.getElementById(btnId);
  const txtEl  = document.getElementById(textElId);
  const parent = btn.parentElement; // .tooltip

  btn.addEventListener("click", () => {
    const toCopy = txtEl.innerText.trim();
    navigator.clipboard.writeText(toCopy)
      .then(() => {
        // show the popup
        parent.classList.add("show");
        // hide after 1.5 seconds
        setTimeout(() => parent.classList.remove("show"), 1500);
      })
      .catch(err => console.error("Copy failed:", err));
  });
}

// wire up both email and phone
makeCopyBtn("copyEmailBtn", "emailText");
makeCopyBtn("copyPhoneBtn", "phoneText");

