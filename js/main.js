//Swiper slider
var swiper = new Swiper(".bg-slider-thumbs", {
    loop: true,
    autoplay: {
        delay: 5500,
        disableOnInteraction: false,
    },
    spaceBetween: 0,
    slidesPerView: 0,
});
var swiper2 = new Swiper(".bg-slider", {
    loop: true,
    autoplay: {
        delay: 5500,
        disableOnInteraction: false,
    },
    spaceBetween: 30,
    thumbs: {
        swiper: swiper,
    },
});

//Navigation bar effects on scroll
window.addEventListener("scroll", function () {
    const header = document.querySelector("nav");
    header.classList.toggle("sticky", window.scrollY > 0);
});

var menu = document.querySelector('.menu');
var menuBtn = document.querySelector('.menu-btn');
var closeBtn = document.querySelector('.close-btn');

menuBtn.addEventListener("click", () => {
    menu.classList.add('active');
});

closeBtn.addEventListener("click", () => {
    menu.classList.remove('active');
});

// Navbar bootsrap
var nav = document.querySelector('nav');
window.addEventListener('scroll', function () {
    if (this.window.pageYOffset > 100) {
        nav.classList.add('bg-dark', 'shadow');
    } else {
        nav.classList.remove('bg-dark');
    }
});

// jquery for toggle dropdown menus
$(document).ready(function () {
    //toggle sub-menus
    $(".sub-btn").click(function () {
        $(this).next(".sub-menu").slideToggle();
    });

    //toggle more-menus
    $(".more-btn").click(function () {
        $(this).next(".more-menu").slideToggle();
    });
});


// Timeline
// function qs(selector, all = false) {
//     return all ? document.querySelectorAll(selector) : document.querySelector(selector)
// }

// const sections = qs('.section-tl', true);
// const timeline = qs('.timeline');
// const line = qs('.line');
// line.style.bottom = `calc(100% - 20px)`;
// let prevScrollY = window.scrollY;
// let up, down;
// let full = false;
// let set = 0;
// const targetY = window.innerHeight * 0.8;

// function scrollHandler(e) {
//     const {
//         scrollY
//     } = window;
//     up = scrollY < prevScrollY;
//     down = !up;
//     const timelineRect = timeline.getBoundingClientRect();
//     const lineRect = line.getBoundingClientRect(); //CONST LINEHEIGHT = lineRect.bottom - lineRect.top

//     const dist = targetY - timelineRect.top
//     console.log(dist);

//     if (down && !full) {
//         set = Math.max(set, dist);
//         line.style.bottom = `calc(100% - ${set}px)`
//     }

//     if (dist > timeline.offsetHeight + 50 && !full) {
//         full = true;
//         line.style.bottom = `-50px`
//     }

//     sections.forEach(item => {
//         //console.log(items);
//         const rect = item.getBoundingClientRect();

//         if (rect.top + item.offsetHeight / 5 < targetY) {
//             item.classList.add('show-me')
//         }
//     });

//     prevScrollY = window.scrollY;
// }
// scrollHandler();
// line.style.display = 'block';
// window.addEventListener('scroll', scrollHandler);

//carousel spmi
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

// const autoPlay = () => {
//     if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
//     // Autoplay the carousel after every 2500 ms
//     timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
// }
// autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
// wrapper.addEventListener("mouseleave", autoPlay);


// FAQ funct
