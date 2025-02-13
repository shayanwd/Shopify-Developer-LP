
gsap.registerPlugin(ScrollTrigger);  

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis({
    smooth: true,
    autoResize: true, // ✅ Ensures Lenis adapts to resizing
});

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);






const traveller = document.querySelector(".traveller")
if (traveller) {
    const travellerWidht = traveller.getBoundingClientRect().width
    const headingWidth = traveller.querySelector(".traveller-inner").getBoundingClientRect().width; 
    const finalWidth = travellerWidht - headingWidth
    gsap.to(traveller.querySelector(".traveller-inner"), {
        scrollTrigger: {
            start: "top 0%",
            end: "bottom bottom",
            trigger: "#projects",
            scrub: 0.7,
            // markers: true,
        },
        x: finalWidth,
    })
}
 















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
        .from(".mm-c1 ul li, .mm-main ul.mm-socials li", {
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


const formmmmm = document.getElementById('contactForm')
if (formmmmm) {
formmmmm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Reset any previous error states
    resetErrorStates();

    // Validate form
    if (!validateForm()) {
        return;
    }

    // Collect form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        website: document.getElementById('website').value,
        service: document.getElementById('service').value,
        budget: document.getElementById('budget').value,
        timeline: document.getElementById('timeline').value,
        message: document.getElementById('message').value
    };

    // Send the form data
    fetch('/rest/contact-form.php', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === "200") {
                showMessage('submitSuccessMessage');
                document.getElementById('contactForm').reset();
            } else {
                showMessage('submitErrorMessage');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('submitErrorMessage');
        });
});

function validateForm() {
    let isValid = true;

    // Required fields validation
    const requiredFields = ['firstName', 'email', 'service', 'message'];
    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            showError(element, 'This field is required');
            isValid = false;
        }
    });

    // Email validation
    const email = document.getElementById('email');
    if (email.value.trim() && !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Website URL validation (if provided)
    const website = document.getElementById('website');
    if (website.value.trim() && !isValidURL(website.value)) {
        showError(website, 'Please enter a valid URL');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function showError(element, message) {
    // Add error class to the parent field-row
    const fieldRow = element.closest('.field-row');
    fieldRow.classList.add('error');

    // Create or update error message
    let errorDiv = fieldRow.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        fieldRow.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

function resetErrorStates() {
    // Remove all error states and messages
    document.querySelectorAll('.field-row.error').forEach(row => {
        row.classList.remove('error');
        const errorMessage = row.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

function showMessage(elementId) {
    // Hide both messages first
    document.getElementById('submitSuccessMessage').classList.add('d-none');
    document.getElementById('submitErrorMessage').classList.add('d-none');

    // Show the requested message
    document.getElementById(elementId).classList.remove('d-none');

    // Scroll message into view
    document.getElementById(elementId).scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Hide message after 5 seconds
    setTimeout(() => {
        document.getElementById(elementId).classList.add('d-none');
    }, 5000);
}

}










function loadAnimations() { 
    let visibleElements = [];

    const revealOnScroll = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (!visibleElements.includes(entry.target)) {
                    visibleElements.push(entry.target);
                }
            }
        });

        if (visibleElements.length > 1) {
            visibleElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('reveal');
                    observer.unobserve(element);

                    visibleElements = visibleElements.filter(el => el !== element);
                }, index * 200);
            });
        } else if (visibleElements.length === 1) {

            const element = visibleElements[0];
            element.classList.add('reveal');
            observer.unobserve(element);
            visibleElements = [];
        }
    };

    const observer = new IntersectionObserver(revealOnScroll, {
        root: null,
        threshold: 0.2
    });

    // Observe all h1, h2, h3, h4, and .bcr-col1 svg elements
    document.querySelectorAll('h1, h2, h3, h4, .masker').forEach((element) => {
        observer.observe(element);
    });
}
window.addEventListener("DOMContentLoaded",loadAnimations )