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


// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

// slider

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let isMouseDown = false;
let startX;
let scrollLeft;
let walk = 0;

const slider = document.querySelector('.slider');

function changeSlide(direction) {
    currentSlideIndex += direction;

    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;  // Loop back to the first slide
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;  // Loop to the last slide
    }

    updateSliderPosition();
}

function updateSliderPosition() {
    const newTransformValue = -currentSlideIndex * 100 + '%';
    slider.style.transition = 'transform 0.3s ease';  // Smooth transition for slide changes
    slider.style.transform = `translateX(${newTransformValue})`;
}

// Add mouse down, move, and up events for dragging functionality
slider.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    walk = 0; // Reset walk distance
    slider.style.transition = 'none'; // Disable transition during drag
});

// Prevent default image dragging behavior (the "little image of the world" issue)
slider.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

slider.addEventListener('mouseleave', () => {
    isMouseDown = false;
});

slider.addEventListener('mouseup', () => {
    isMouseDown = false;
    
    // Snap to the nearest slide after mouse release
    if (Math.abs(walk) > window.innerWidth / 4) {
        if (walk > 0) {
            changeSlide(-1); // Move to previous slide
        } else {
            changeSlide(1); // Move to next slide
        }
    } else {
        updateSliderPosition(); // Return to the current slide
    }
});

slider.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    walk = (x - startX);  // This is the distance the mouse has moved

    // Update slider's transform property to reflect dragging motion
    slider.style.transform = `translateX(${-(currentSlideIndex * 100) + (walk / window.innerWidth) * 100}%)`;
});

slider.addEventListener('dragstart', (e) => {
    e.preventDefault();
});