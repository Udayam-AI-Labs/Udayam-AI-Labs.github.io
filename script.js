
      // Smooth scrolling for navigation links
      document.querySelectorAll("nav a").forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);

          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth",
          });
        });
      });

      // Add animation classes to elements when they come into view
      document.addEventListener("DOMContentLoaded", function () {
        const animatedElements = document.querySelectorAll(
          ".service-card, .photo-card, .about-content p"
        );

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("animate-in");
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.2,
          }
        );

        animatedElements.forEach((element) => {
          observer.observe(element);
          element.classList.add("pre-animation");
        });
      });

      
