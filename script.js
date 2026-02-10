
gsap.registerPlugin(ScrollTrigger);

const heroVideo = document.querySelector(".hero__video");
const soundToggle = document.getElementById("soundToggle");
const soundIcon = document.getElementById("soundIcon");
let isMuted = true;

if (soundToggle && heroVideo) {
  soundToggle.addEventListener("click", () => {
    isMuted = !isMuted;
    heroVideo.muted = isMuted;
    soundIcon.src = isMuted ? "assets/svg/sound_off.svg" : "assets/svg/sound_on.svg";
  });
}

const carData = {
  cyberster: {
    title: "MG Cyberster",
    desc: "Driven by vision, not convention.",
    dayCar: "assets/cyberster-day.webp",
    nightCar: "assets/cyberster-night.webp",
    dayBg: "assets/day-bg.webp",
    nightBg: "assets/night-bg.webp"
  },
  m9: {
    title: "MG M9",
    desc: "Luxury, Sculpted.",
    dayCar: "assets/m9-day.webp",
    nightCar: "assets/m9-night.webp",
    dayBg: "assets/day-bg.webp",
    nightBg: "assets/night-bg.webp"
  }
};

let isNightMode = false;

function preloadImages() {
  Object.values(carData).forEach(car => {
    new Image().src = car.dayCar;
    new Image().src = car.nightCar;
    new Image().src = car.dayBg;
    new Image().src = car.nightBg;
  });
}
preloadImages();

const carSwiper = new Swiper('.inventory__swiper', {
  effect: 'slide',
  speed: 600,
  loop: true,
  navigation: {
    nextEl: '.inventory__nav--next',
    prevEl: '.inventory__nav--prev',
  },
  on: {
    slideChange: function () {
      updateBackground(this.realIndex);
      updateCarContent(this.realIndex);
      updateProgressBar(this.realIndex);
    }
  }
});

function updateBackground(realIndex) {
  const slides = document.querySelectorAll('.inventory__swiper .swiper-slide:not(.swiper-slide-duplicate)');
  let slide = slides[realIndex] || document.querySelector(`.inventory__swiper .swiper-slide[data-swiper-slide-index="${realIndex}"]`);
  if (!slide) return;

  const carKey = slide.getAttribute('data-car');
  const data = carData[carKey];
  if (!data) return;

  const nextBgImage = isNightMode ? data.nightBg : data.dayBg;
  const bgCurrent = document.querySelector('.inventory__bg--current');
  const bgNext = document.querySelector('.inventory__bg--next');

  bgNext.style.backgroundImage = `url(${nextBgImage})`;

  gsap.to(bgNext, {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      bgCurrent.style.backgroundImage = `url(${nextBgImage})`;
      bgNext.style.opacity = 0;
    }
  });
}

function updateCarContent(realIndex) {
  const slides = document.querySelectorAll('.inventory__swiper .swiper-slide:not(.swiper-slide-duplicate)');
  let slide = slides[realIndex] || document.querySelector(`.inventory__swiper .swiper-slide[data-swiper-slide-index="${realIndex}"]`);
  if (!slide) return;

  const carKey = slide.getAttribute('data-car');
  const data = carData[carKey];
  if (!data) return;

  const titleEl = document.getElementById('carTitle');
  const descEl = document.getElementById('carDesc');

  if (titleEl && descEl) {
    gsap.to([titleEl, descEl], {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
        gsap.to([titleEl, descEl], { opacity: 1, duration: 0.3 });
      }
    });
  }
}

function updateProgressBar(realIndex) {
  const progressFill = document.getElementById('carProgressFill');
  if (!progressFill) return;
  progressFill.style.width = realIndex === 0 ? '50%' : '100%';
}


const modeToggle = document.getElementById("modeToggle");
const sliderLogo = document.getElementById("sliderLogo");

if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    isNightMode = !isNightMode;
    applyMode();
  });
}

function applyMode() {
  const dayIcon = document.getElementById("modeDay");
  const nightIcon = document.getElementById("modeNight");
  if (dayIcon) dayIcon.style.display = isNightMode ? "none" : "block";
  if (nightIcon) nightIcon.style.display = isNightMode ? "block" : "none";

  document.querySelectorAll('.inventory__car-img').forEach(img => {
    const slide = img.closest('.swiper-slide');
    const key = slide.getAttribute('data-car');
    if (carData[key]) {
      img.src = isNightMode ? carData[key].nightCar : carData[key].dayCar;
    }
  });

  if (carSwiper) updateBackground(carSwiper.realIndex);

  const hamburgers = document.querySelectorAll(".hamburger");
  if (isNightMode) {
    hamburgers.forEach(h => h.classList.remove("dark"));
    if (sliderLogo) {
      gsap.to(sliderLogo, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          sliderLogo.src = "assets/mg-select-final-logo-light.webp";
          gsap.to(sliderLogo, { opacity: 1, duration: 0.2 });
        }
      });
    }
  } else {
    hamburgers.forEach(h => h.classList.add("dark"));
    if (sliderLogo) {
      gsap.to(sliderLogo, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          sliderLogo.src = "assets/mg-select-final-logo-dark.webp";
          gsap.to(sliderLogo, { opacity: 1, duration: 0.2 });
        }
      });
    }
  }
}

if (carSwiper) {
  updateBackground(carSwiper.realIndex);
  updateCarContent(carSwiper.realIndex);
  updateProgressBar(carSwiper.realIndex);
}
applyMode();

const experienceSwiper = new Swiper('.experience__swiper', {
  slidesPerView: 1,
  speed: 800,
  loop: true,
  navigation: {
    nextEl: '#expNext',
    prevEl: '#expPrev',
  }
});

const hamburger = document.querySelector(".hamburger");
const menuOverlay = document.getElementById("menuOverlay");
const modalTabs = document.querySelectorAll(".modal__tab");
const modalContents = document.querySelectorAll(".modal__content");
const carItems = document.querySelectorAll("[data-car-target]");
const menuCarImg = document.getElementById("menuCarImg");
const menuCarTitle = document.getElementById("menuCarTitle");
const menuCarDesc = document.getElementById("menuCarDesc");

const menuCarData = {
  cyberster: {
    title: "CYBERSTER",
    desc: "Meet the boldest expressions of MG innovation.",
    img: "assets/cybie-header.webp"
  },
  m9: {
    title: "M9",
    desc: "Experience the pinnacle of sculpted luxury with the MG M9.",
    img: "assets/m9-burger-menu.webp"
  }
};

function toggleMenu() {
  if (!hamburger || !menuOverlay) return;
  const isOpen = menuOverlay.classList.toggle("open");
  hamburger.classList.toggle("active", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
}

if (hamburger) hamburger.addEventListener("click", toggleMenu);

modalTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const targetTab = tab.getAttribute("data-tab");

    modalTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    modalContents.forEach(content => {
      content.classList.remove("active");

      if (targetTab === "cars" && content.id === "menuCarsContent") {
        content.classList.add("active");
      } else if (targetTab === "about" && content.id === "menuAboutContent") {
        content.classList.add("active");
      } else if (targetTab === "contact" && content.id === "menuContactContent") {
        content.classList.add("active");
      }
    });
  });
});


carItems.forEach(item => {
  item.addEventListener("click", () => {
    const carKey = item.getAttribute("data-car-target");
    const data = menuCarData[carKey];

    if (data) {
      carItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      gsap.to("#carDetailArea", {
        opacity: 0,
        x: -20,
        duration: 0.3,
        onComplete: () => {
          menuCarTitle.innerText = data.title;
          menuCarDesc.innerText = data.desc;
          menuCarImg.src = data.img;
          gsap.to("#carDetailArea", { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" });
        }
      });
    }
  });
});

const heritageSwiper = new Swiper('.heritage__swiper', {
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 60,
  speed: 800,
  on: {
    init: function () { generateHeritageScale(this); },
    slideChange: function () { updateHeritageScale(this); }
  }
});

function generateHeritageScale(swiper) {
  const scale = document.getElementById('heritageScale');
  if (!scale) return;
  scale.innerHTML = '';
  swiper.slides.forEach((slide, index) => {
    const major = document.createElement('span');
    major.className = 'major';
    major.setAttribute('data-index', index);
    scale.appendChild(major);
    if (index < swiper.slides.length - 1) {
      for (let i = 0; i < 4; i++) scale.appendChild(document.createElement('span'));
    }
  });
  updateHeritageScale(swiper);
}

function updateHeritageScale(swiper) {
  const scale = document.getElementById('heritageScale');
  if (!scale) return;
  const majorTicks = scale.querySelectorAll('.major');
  majorTicks.forEach((tick, i) => tick.classList.toggle('active', i === swiper.activeIndex));
}
