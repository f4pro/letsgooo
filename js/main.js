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
function qs(selector, all = false) {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector)
}

const sections = qs('.section-tl', true);
const timeline = qs('.timeline');
const line = qs('.line');
line.style.bottom = `calc(100% - 20px)`;
let prevScrollY = window.scrollY;
let up, down;
let full = false;
let set = 0;
const targetY = window.innerHeight * 0.8;

function scrollHandler(e) {
    const {
        scrollY
    } = window;
    up = scrollY < prevScrollY;
    down = !up;
    const timelineRect = timeline.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect(); //CONST LINEHEIGHT = lineRect.bottom - lineRect.top

    const dist = targetY - timelineRect.top
    console.log(dist);

    if (down && !full) {
        set = Math.max(set, dist);
        line.style.bottom = `calc(100% - ${set}px)`
    }

    if (dist > timeline.offsetHeight + 50 && !full) {
        full = true;
        line.style.bottom = `-50px`
    }

    sections.forEach(item => {
        //console.log(items);
        const rect = item.getBoundingClientRect();

        if (rect.top + item.offsetHeight / 5 < targetY) {
            item.classList.add('show-me')
        }
    });

    prevScrollY = window.scrollY;
}

scrollHandler();
line.style.display = 'block';
window.addEventListener('scroll', scrollHandler)