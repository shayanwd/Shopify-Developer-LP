new WOW().init();

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);





















function menuAnimation() {
    const myMenu = document.querySelector(".mm-main")
    const mmOpen = document.querySelector(".mm-toggle")
    const mmClose = document.querySelector(".mm-close")
    const menuLinks = document.querySelectorAll(".mm-c1 ul li a")

    let menuTL = gsap.timeline({ paused: true })
        .to(".mm-main", {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 0.4,
        })
        .from(".mm-c1 h3, .mm-close", {
            scale: 1.2,
            opacity: 0,
            stagger: 0.08,
            duration: 0.2,
            delay: -0.2,
        })
        .from(".mm-c1 ul li, ul.mm-socials li", {
            y: 20,
            opacity: 0,
            stagger: 0.04,
            duration: 0.2,
        })

    menuTL.pause()
    mmOpen.addEventListener("click", function () {
        menuTL.play()
        lenis.stop()
        setTimeout(() => {
            myMenu.classList.add("active")
        }, 400);
    })
    mmClose.addEventListener("click", function () {
        menuTL.reverse()
        lenis.start()
        myMenu.classList.remove("active")
    })
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            menuTL.reverse()
            lenis.start()
            myMenu.classList.remove("active")
        }
    });

    menuLinks.forEach((menuLink)=>{
        menuLink.addEventListener("click", ()=>{
            menuTL.reverse()
            lenis.start()
            myMenu.classList.remove("active")
        })
    })
}
menuAnimation()

var swiper = new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: false,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}