import { preloadImages } from "../../libs/utils.js";
("use strict");
$ = jQuery;
// setup lenis
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
// end lenis

function customDropdown() {
  const dropdowns = document.querySelectorAll(".dropdown-custom");

  dropdowns.forEach((dropdown) => {
    const btnDropdown = dropdown.querySelector(".dropdown-custom-btn");
    const dropdownMenu = dropdown.querySelector(".dropdown-custom-menu");
    const dropdownItems = dropdown.querySelectorAll(".dropdown-custom-item");
    const valueSelect = dropdown.querySelector(".value-select");

    // Toggle dropdown on button click
    btnDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns(dropdown);
      dropdownMenu.classList.toggle("dropdown--active");
      btnDropdown.classList.toggle("--active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function () {
      closeAllDropdowns();
    });

    // Handle item selection
    dropdownItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();

        // Store current values from the button
        const currentImgEl = valueSelect.querySelector("img");
        const currentImg = currentImgEl ? currentImgEl.src : "";
        const currentText = valueSelect.querySelector("span").textContent;
        const currentHtml = valueSelect.innerHTML;

        // Store clicked item values
        const clickedHtml = item.innerHTML;

        // Update the button with clicked item values
        valueSelect.innerHTML = clickedHtml;

        const isSelectTime = currentText.trim() === "Time";

        // Update the clicked item with the previous button values
        if (!isSelectTime) {
          if (currentImg) {
            item.innerHTML = `<img src="${currentImg}" alt="" /><span>${currentText}</span>`;
          } else {
            item.innerHTML = `<span>${currentText}</span>`;
          }
        }

        closeAllDropdowns();
      });
    });

    // Close dropdown on scroll
    window.addEventListener("scroll", function () {
      if (dropdownMenu.closest(".header-lang")) {
        dropdownMenu.classList.remove("dropdown--active");
        btnDropdown.classList.remove("--active");
      }
    });
  });

  function closeAllDropdowns(exception) {
    dropdowns.forEach((dropdown) => {
      const menu = dropdown.querySelector(".dropdown-custom-menu");
      const btn = dropdown.querySelector(".dropdown-custom-btn");

      if (!exception || dropdown !== exception) {
        menu.classList.remove("dropdown--active");
        btn.classList.remove("--active");
      }
    });
  }
}

function marquee() {
  document.querySelectorAll(".marquee-container").forEach((container) => {
    const content = container.querySelector(".marquee-content");
    const items = [...container.querySelectorAll(".marquee-item")];
    const speed = parseFloat(container.getAttribute("data-speed")) || 50;

    content.innerHTML = "";
    items.forEach((item) => content.appendChild(item.cloneNode(true)));

    const clonedItems = [...content.children];
    let totalWidth = 0;

    clonedItems.forEach((item) => (totalWidth += item.offsetWidth));

    const containerWidth = container.offsetWidth;
    const copiesNeeded = Math.ceil(containerWidth / totalWidth) + 2;

    for (let i = 0; i < copiesNeeded; i++) {
      clonedItems.forEach((item) => {
        content.appendChild(item.cloneNode(true));
      });
    }

    let fullWidth = 0;
    [...content.children].forEach((item) => (fullWidth += item.offsetWidth));

    gsap.set(content, {
      x: 0,
      willChange: "transform",
      force3D: true
    });

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(content, {
      x: -fullWidth,
      duration: fullWidth / speed,
      ease: "none",
      modifiers: {
        x: (x) => `${parseFloat(x) % fullWidth}px`
      }
    });

    // Hover pause
    const pause = parseFloat(container.getAttribute("hover-pause")) || false;
    if (pause) {
      container.addEventListener("mouseenter", () => tl.pause());
      container.addEventListener("mouseleave", () => tl.resume());
    }
  });
}

function sectionOurMission() {
  if ($(".our-mission").length < 1) return;
  if ($(window).width() < 991) return;
  const missionItems = $(".our-mission .mission-item");

  missionItems.on("click", function () {
    missionItems.removeClass("active");
    $(this).addClass("active");
  });
}

function personalSwiper() {
  if ($(".personal-swiper").length) {
    new Swiper(".personal-swiper", {
      slidesPerView: 2.5,
      spaceBetween: 16,
      loop: false,
      speed: 600,
      pagination: {
        el: ".personal-swiper .swiper-pagination",
        type: "progressbar"
      },
      navigation: {
        nextEl: ".personal-swiper .swiper-button-next",
        prevEl: ".personal-swiper .swiper-button-prev"
      },
      breakpoints: {
        0: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 2.5
        }
      }
    });
  }
}

function participantsSwiper() {
  if ($(".participants-swiper").length) {
    new Swiper(".participants-swiper", {
      slidesPerView: 2.5,
      spaceBetween: 16,
      loop: false,
      speed: 600,
      pagination: {
        el: ".participants-swiper .swiper-pagination",
        type: "progressbar"
      },
      navigation: {
        nextEl: ".participants-swiper .swiper-button-next",
        prevEl: ".participants-swiper .swiper-button-prev"
      },
      breakpoints: {
        0: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });
  }
}

function footer() {
  if ($(".footer").length < 1) return;

  const footerAgendaCTA = $(".footer-agenda .content-item .cta");
  footerAgendaCTA.on("click", function () {
    const thisItem = $(this);
    const parentItem = thisItem.closest(".content-item");
    const index = parentItem.index();

    $(".footer-agenda .content-item, .agenda-main__image ellipse").removeClass(
      "active"
    );
    parentItem.addClass("active");
    $(`.agenda-main__image ellipse.shadow-${index + 1}`).addClass("active");
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

  let svg = document.querySelector(".draw_svg");
  let path = svg.querySelector("path");

  gsap.set(path, {
    drawSVG: "0%"
  });

  gsap.to(path, {
    drawSVG: "100%",
    duration: 2,
    ease: "none",
    scrollTrigger: {
      trigger: ".intro-line",
      start: "top 80%",
      end: "bottom 80%"
      // markers: true
    }
  });
});

// header
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

  // Click scroll + active
  document.querySelectorAll('#header a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute("href"));
      if (targetElement) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: targetElement, offsetY: 100 },
          ease: "power2.out"
        });
      }

      document
        .querySelectorAll('#header a[href^="#"]')
        .forEach((a) => a.classList.remove("active"));
      this.classList.add("active");
    });
  });

  document.querySelectorAll("section[id]").forEach((section) => {
    const link = document.querySelector(`#header a[href="#${section.id}"]`);

    if (link) {
      ScrollTrigger.create({
        trigger: section,
        start: "top 100px",
        end: "bottom 100px",
        // markers: true,
        onEnter: () => {
          // Remove active từ tất cả links
          document.querySelectorAll('#header a[href^="#"]').forEach((a) => {
            a.classList.remove("active");
          });
          // Add active cho link tương ứng
          link.classList.add("active");
        },
        onEnterBack: () => {
          // Khi scroll ngược lại
          document.querySelectorAll('#header a[href^="#"]').forEach((a) => {
            a.classList.remove("active");
          });
          link.classList.add("active");
        }
      });
    }
  });

  ScrollTrigger.refresh();
});

function effectText() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.utils.toArray(".data-fade-in").forEach((element) => {
    const delay = parseFloat(element.dataset.delay) || 0;

    gsap.fromTo(
      element,
      {
        "will-change": "opacity, transform",
        opacity: 0,
        y: 20
      },
      {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 80%"
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "sine.out",
        delay: delay
      }
    );
  });

  gsap.utils.toArray(".effect-line").forEach((description) => {
    const splitDescription = new SplitText(description, {
      type: "lines",
      linesClass: "line",
      mask: "lines"
    });

    const delay = parseFloat(description.dataset.delay) || 0;

    gsap.fromTo(
      splitDescription.lines,
      {
        yPercent: 100,
        willChange: "transform"
      },
      {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
        delay: delay,

        scrollTrigger: {
          trigger: description,
          start: "top 80%"
          // markers: true,
        }
      }
    );
  });

  gsap.utils.toArray(".effect-line-footer").forEach((description) => {
    const splitDescription = new SplitText(description, {
      type: "lines",
      linesClass: "line",
      mask: "lines"
    });

    const delay = parseFloat(description.dataset.delay) || 0;

    gsap.fromTo(
      splitDescription.lines,
      {
        yPercent: 100,
        willChange: "transform"
      },
      {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
        delay: delay,

        scrollTrigger: {
          trigger: ".footer-main",
          start: "top 75%"
          // markers: true
        }
      }
    );
  });
}

function header() {
  if ($("#header").length < 1) return;

  $(".header-hamburger, .header-menu__overlay").on("click", function () {
    $(this).toggleClass("active");
    $("#header .menu, #header .header-menu__overlay").toggleClass("open");

    if ($(".header-hamburger").hasClass("active")) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  marquee();
  sectionOurMission();
  customDropdown();
  personalSwiper();
  participantsSwiper();
  header();
  footer();
  effectText();
};

preloadImages("img").then(() => {
  // Once images are preloaded, remove the 'loading' indicator/class from the body

  init();
});

// loadpage
let isLinkClicked = false;
$("a").on("click", function (e) {
  // Nếu liên kết dẫn đến trang khác (không phải hash link hoặc javascript void)
  if (this.href && !this.href.match(/^#/) && !this.href.match(/^javascript:/)) {
    isLinkClicked = true;
  }
});

$(window).on("beforeunload", function () {
  if (!isLinkClicked) {
    $(window).scrollTop(0);
  }
  isLinkClicked = false;
});
