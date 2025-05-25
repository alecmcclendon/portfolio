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



// ------------------------------------------

// carrousel code

// const carousel = document.querySelector('.carousel');
// const images = document.querySelectorAll('.carousel img');

// // Pause the animation when the mouse enters an image
// images.forEach(image => {
//   image.addEventListener('mouseenter', () => {
//     carousel.style.animationPlayState = 'paused';
//   });

//   // Resume the animation when the mouse leaves an image
//   image.addEventListener('mouseleave', () => {
//     carousel.style.animationPlayState = 'running';
//   });
// });

// --------------------------------------------

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    // Toggle the flipped state (flip the card)
    card.classList.toggle('flipped'); 
    
    // Temporarily remove the shadow by adding the 'no-shadow' class
    card.classList.add('no-shadow');
    
    // After 1 second, restore the shadow by removing the 'no-shadow' class
    setTimeout(() => {
      card.classList.remove('no-shadow');
    }, 800); // 1000ms = 1 second
  });
});