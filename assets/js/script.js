

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
        setTimeout(() => {
            myMenu.classList.add("active")
        }, 400);
    })
    mmClose.addEventListener("click", function () {
        menuTL.reverse()
        myMenu.classList.remove("active")
    })
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            menuTL.reverse()
            myMenu.classList.remove("active")
        }
    });

    menuLinks.forEach((menuLink)=>{
        menuLink.addEventListener("click", ()=>{
            menuTL.reverse()
            myMenu.classList.remove("active")
        })
    })
}
menuAnimation()