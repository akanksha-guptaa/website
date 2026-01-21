// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Active navigation link highlighting
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function highlightNavLink() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", highlightNavLink);

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".project-card, .timeline-item, .about-content"
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
});

// Contact form handling
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Simple validation
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Simulate form submission (replace with actual form handling)
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
      alert("Thank you for your message! I'll get back to you soon.");
      this.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2000);
  });
}

// Typing animation for hero title
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 100);
  }
});

// Parallax effect for hero section
// window.addEventListener("scroll", () => {
//   const scrolled = window.pageYOffset;
//   const hero = document.querySelector(".hero");
//   if (hero) {
//     hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//   }
// });

// Skill tags hover effect
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
    this.style.transition = "transform 0.3s ease";
  });

  tag.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});

// Project card tilt effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function (e) {
    this.style.transition = "transform 0.3s ease";
  });

  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
  });
});

// Scroll to top functionality
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #3498db;
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollToTopBtn.style.opacity = "1";
    scrollToTopBtn.style.transform = "translateY(0)";
  } else {
    scrollToTopBtn.style.opacity = "0";
    scrollToTopBtn.style.transform = "translateY(10px)";
  }
});

// Add custom cursor effect (optional)
// const cursor = document.createElement('div');
// cursor.className = 'custom-cursor';
// cursor.style.cssText = `
//     width: 20px;
//     height: 20px;
//     border: 2px solid #3498db;
//     border-radius: 50%;
//     position: fixed;
//     pointer-events: none;
//     z-index: 9999;
//     transition: all 0.1s ease;
//     opacity: 0;
// `;

// document.body.appendChild(cursor);

// document.addEventListener('mousemove', (e) => {
//     cursor.style.left = e.clientX - 10 + 'px';
//     cursor.style.top = e.clientY - 10 + 'px';
//     cursor.style.opacity = '1';
// });

// document.addEventListener('mouseleave', () => {
//     cursor.style.opacity = '0';
// });

let cursor = null;
let mouseMoveHandler = null;
let mouseLeaveHandler = null;

const mediaQuery = window.matchMedia("(pointer: fine) and (hover: hover)");

function enableCustomCursor() {
  if (cursor) return; // already enabled

  cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid #3498db;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
    opacity: 0;
  `;

  document.body.appendChild(cursor);

  mouseMoveHandler = (e) => {
    cursor.style.left = e.clientX - 10 + "px";
    cursor.style.top = e.clientY - 10 + "px";
    cursor.style.opacity = "1";
  };

  mouseLeaveHandler = () => {
    cursor.style.opacity = "0";
  };

  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseleave", mouseLeaveHandler);
}

function disableCustomCursor() {
  if (!cursor) return;

  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseleave", mouseLeaveHandler);

  cursor.remove();
  cursor = null;
  mouseMoveHandler = null;
  mouseLeaveHandler = null;
}

function handleCapabilityChange(e) {
  if (e.matches) {
    enableCustomCursor();
  } else {
    disableCustomCursor();
  }
}

/* Initial check */
if (mediaQuery.matches) {
  enableCustomCursor();
}

/* Listen for capability changes */
mediaQuery.addEventListener("change", handleCapabilityChange);

/* Fallback for older browsers */
window.addEventListener("resize", () => {
  if (mediaQuery.matches) {
    enableCustomCursor();
  } else {
    disableCustomCursor();
  }
});

window.addEventListener("orientationchange", () => {
  if (mediaQuery.matches) {
    enableCustomCursor();
  } else {
    disableCustomCursor();
  }
});

// Add hover effects for interactive elements
document
  .querySelectorAll("a, button, .project-card, .skill-tag")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(2)";
      cursor.style.backgroundColor = "rgba(52, 152, 219, 0.1)";
    });

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)";
      cursor.style.backgroundColor = "transparent";
    });
  });
