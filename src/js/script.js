// scripts.js

// Mobile Menu Toggle and Sticky Header
function initializeNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const header = document.getElementById("stickyHeader");
  const placeholder = document.getElementById("stickyHeaderPlaceholder");
  
  if (!header || !placeholder) return;
  
  // Get the original position of the header
  const headerHeight = header.offsetHeight;
  placeholder.style.height = "0px";
  
  // Function to update header position
  function updateHeaderPosition() {
    if (window.scrollY > 0) {
      // Make header fixed
      header.style.position = "fixed";
      header.style.top = "0";
      header.style.left = "0";
      header.style.right = "0";
      header.style.width = "100%";
      header.style.zIndex = "50";
      
      // Update placeholder height to prevent content jump
      placeholder.style.height = headerHeight + "px";
      
      // Ensure mobile menu is positioned correctly when header is fixed
      if (mobileMenu) {
        mobileMenu.style.position = "fixed";
        mobileMenu.style.top = headerHeight + "px";
        mobileMenu.style.left = "0";
        mobileMenu.style.right = "0";
      }
    } else {
      // Reset header to normal position
      header.style.position = "relative";
      placeholder.style.height = "0px";
      
      // Reset mobile menu positioning
      if (mobileMenu) {
        mobileMenu.style.position = "absolute";
        mobileMenu.style.top = "100%";
      }
    }
  }
  
  // Listen for scroll events
  window.addEventListener("scroll", updateHeaderPosition);
  
  // Initial call to set correct state
  updateHeaderPosition();
  
  // Mobile menu toggle
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

// Initialize all components when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  initializeNavigation();
  
});
  
  // Testimonial Slider
  function initializeTestimonialSlider() {
    const track = document.querySelector(".testimonial-track");
    const slides = document.querySelectorAll(".testimonial-slide");
    const prevButton = document.getElementById("testimonialPrev");
    const nextButton = document.getElementById("testimonialNext");
    const indicators = document.querySelectorAll(".testimonial-indicator");
    const swiperContainer = document.querySelector(".testimonial-swiper");
  
    if (!track || !slides.length || !prevButton || !nextButton || !indicators.length) {
      return;
    }
  
    let currentIndex = 0;
    const slideCount = slides.length;
    let slideInterval;
  
    // Set slide widths dynamically
    function setSlideWidth() {
      const slideWidth = document.querySelector(".testimonial-slides").offsetWidth;
      slides.forEach((slide) => {
        slide.style.width = `${slideWidth}px`;
      });
      track.style.width = `${slideWidth * slideCount}px`;
      goToSlide(currentIndex);
    }
  
    // Navigate to a specific slide
    function goToSlide(index) {
      if (index < 0) index = slideCount - 1;
      if (index >= slideCount) index = 0;
  
      currentIndex = index;
      const slideWidth = slides[0].offsetWidth;
      track.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
  
      // Update indicators
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle("bg-white/80", i === currentIndex);
        indicator.classList.toggle("bg-white/30", i !== currentIndex);
        indicator.classList.toggle("hover:bg-white/50", i !== currentIndex);
        indicator.classList.toggle("active", i === currentIndex);
      });
    }
  
    // Auto-advance slides
    function startAutoSlide() {
      slideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 6000);
    }
  
    // Stop auto-advance
    function stopAutoSlide() {
      clearInterval(slideInterval);
    }
  
    // Initialize slide widths
    setSlideWidth();
    window.addEventListener("resize", setSlideWidth);
  
    // Navigation events
    prevButton.addEventListener("click", () => goToSlide(currentIndex - 1));
    nextButton.addEventListener("click", () => goToSlide(currentIndex + 1));
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => goToSlide(index));
    });
  
    // Pause/resume on hover
    swiperContainer.addEventListener("mouseenter", stopAutoSlide);
    swiperContainer.addEventListener("mouseleave", startAutoSlide);
  
    // Start auto-advance
    startAutoSlide();
  }
  
  // Product Filter
  function initializeProductFilter() {
    const filterButtons = document.querySelectorAll(".category-filter");
    const productCards = document.querySelectorAll(".product-card");
  
    if (!filterButtons.length || !productCards.length) {
      return;
    }
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Update button styles
        filterButtons.forEach((btn) => {
          btn.classList.remove("active", "bg-primary", "text-white");
          btn.classList.add("text-gray-600", "hover:text-primary");
        });
        button.classList.add("active", "bg-primary", "text-white");
        button.classList.remove("text-gray-600", "hover:text-primary");
  
        // Filter products
        const category = button.getAttribute("data-category");
        productCards.forEach((card) => {
          card.style.display =
            category === "all" || card.getAttribute("data-category") === category
              ? "block"
              : "none";
        });
      });
    });
  }
  
  // Initialize all features when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    initializeMobileMenu();
    initializeTestimonialSlider();
    initializeProductFilter();
  });