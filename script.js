/* ===============================
   HERO SOUND TOGGLE
=============================== */

const heroVideo = document.querySelector(".hero-video");
const soundBtn = document.getElementById("sound-btn");
const soundIcon = document.getElementById("sound-icon");

let isMuted = true;

soundBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  heroVideo.muted = isMuted;

  if (isMuted) {
    soundIcon.src = "assets/svg/sound_off.svg";
  } else {
    soundIcon.src = "assets/svg/sound_on.svg";
  }
});


/* ===============================
   CAR DATA
=============================== */

const cars = [
  {
    title: "MG Cyberster",
    desc: "Driven by vision, not convention.",
    dayCar: "assets/cyberster-day.webp",
    nightCar: "assets/cyberster-night.webp",
    dayBg: "assets/day-bg.webp",
    nightBg: "assets/night-bg.webp"
  },
  {
    title: "MG M9",
    desc: "Luxury, Sculpted.",
    dayCar: "assets/m9-day.webp",
    nightCar: "assets/m9-night.webp",
    dayBg: "assets/day-bg.webp",
    nightBg: "assets/night-bg.webp"
  }
];

let currentIndex = 0;
let nightMode = true;


/* ===============================
   ELEMENT SELECTORS
=============================== */

const carImg = document.querySelector(".car-image");
const bg = document.querySelector(".slider-bg");
const title = document.querySelector(".car-title");
const desc = document.querySelector(".car-desc");

const dayIcon = document.getElementById("day-icon");
const nightIcon = document.getElementById("night-icon");
const toggleMode = document.getElementById("toggle-mode");

const logo = document.getElementById("mg-logo");
const hamburgers = document.querySelectorAll(".hamburger");

nightIcon.style.display = "block";
dayIcon.style.display = "none";


/* ===============================
   AUTO SLIDE CONTROLLER
=============================== */

let autoSlideTimer = null;

function startAutoSlide() {
  stopAutoSlide();

  autoSlideTimer = setTimeout(() => {
    currentIndex = (currentIndex + 1) % cars.length;
    updateSlider("next");
    startAutoSlide();
  }, 5000);
}

function stopAutoSlide() {
  if (autoSlideTimer) {
    clearTimeout(autoSlideTimer);
    autoSlideTimer = null;
  }
}


/* ===============================
   UPDATE SLIDER (DIRECTIONAL)
=============================== */

function updateSlider(direction) {
  const car = cars[currentIndex];

  carImg.classList.remove(
    "slide-out-left",
    "slide-out-right",
    "slide-in-left",
    "slide-in-right"
  );

  if (direction === "prev") {
    carImg.classList.add("slide-out-right");
  } else {
    carImg.classList.add("slide-out-left");
  }

  setTimeout(() => {

    title.textContent = car.title;
    desc.textContent = car.desc;

    if (nightMode) {
      carImg.src = car.nightCar;
      bg.style.backgroundImage = `url(${car.nightBg})`;

      nightIcon.style.display = "block";
      dayIcon.style.display = "none";

      hamburgers.forEach(h => h.classList.remove("dark"));

      logo.style.opacity = 0;
      setTimeout(() => {
        logo.src = "assets/mg-select-final-logo-light.webp";
        logo.style.opacity = 1;
      }, 200);

    } else {
      carImg.src = car.dayCar;
      bg.style.backgroundImage = `url(${car.dayBg})`;

      nightIcon.style.display = "none";
      dayIcon.style.display = "block";

      hamburgers.forEach(h => h.classList.add("dark"));

      logo.style.opacity = 0;
      setTimeout(() => {
        logo.src = "assets/mg-select-final-logo-dark.webp";
        logo.style.opacity = 1;
      }, 200);
    }

    carImg.classList.remove("slide-out-left", "slide-out-right");

    if (direction === "prev") {
      carImg.classList.add("slide-in-left");
    } else {
      carImg.classList.add("slide-in-right");
    }

    requestAnimationFrame(() => {
      carImg.classList.remove("slide-in-left", "slide-in-right");
    });

  }, 450);
}


/* ===============================
   INITIAL LOAD
=============================== */

updateSlider("next");
startAutoSlide();


/* ===============================
   NAVIGATION
=============================== */

document.querySelector(".next").onclick = () => {
  stopAutoSlide();
  currentIndex = (currentIndex + 1) % cars.length;
  updateSlider("next");
  startAutoSlide();
};

document.querySelector(".prev").onclick = () => {
  stopAutoSlide();
  currentIndex = (currentIndex - 1 + cars.length) % cars.length;
  updateSlider("prev");
  startAutoSlide();
};


/* ===============================
   DAY / NIGHT TOGGLE
=============================== */

toggleMode.onclick = () => {
  nightMode = !nightMode;
  updateSlider("next");
  startAutoSlide();
};

const experienceCarousel =
  bootstrap.Carousel.getOrCreateInstance(
    document.getElementById("experienceCarousel"),
    { interval: 5000 }
  );

document.querySelector(".experience-next")
  .addEventListener("click", () => experienceCarousel.next());

document.querySelector(".experience-prev")
  .addEventListener("click", () => experienceCarousel.prev());






/* ===============================
   HAMBURGER MENU
=============================== */

const hamburger = document.getElementById("hamburger");
const menuOverlay = document.getElementById("menuOverlay");

if (hamburger && menuOverlay) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menuOverlay.classList.toggle("open");

    document.body.style.overflow =
      menuOverlay.classList.contains("open") ? "hidden" : "";
  });
}

const hamburgerEls = document.querySelectorAll(".hamburger");
const sections = document.querySelectorAll("section[data-hamburger]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const mode = entry.target.dataset.hamburger;

        hamburgerEls.forEach(hamburger => {
          if (mode === "dark") {
            hamburger.classList.add("dark");
          } else {
            hamburger.classList.remove("dark");
          }
        });
      }
    });
  },
  {
    threshold: 0.6 // section must be mostly visible
  }
);

sections.forEach(section => observer.observe(section));  




