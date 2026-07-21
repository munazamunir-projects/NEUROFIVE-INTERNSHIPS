// ==============================
// Scroll Reveal Animation
// Using Intersection Observer API
// ==============================

// Select all elements with the "reveal" class
const revealElements = document.querySelectorAll(".reveal");

// Create the observer
const observer = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            // If the element is visible on screen
            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                // Stop observing after animation runs once
                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.2
    }

);

// Observe each reveal element
revealElements.forEach(element => {

    observer.observe(element);

});



// ==============================
// Optional CTA Button Interaction
// ==============================

const ctaButton = document.querySelector(".cta-btn");

ctaButton.addEventListener("click", function () {

    alert("Thank you for your interest! 🚀");

});



// ==============================
// Console Message
// ==============================

console.log("Landing Page Loaded Successfully!");