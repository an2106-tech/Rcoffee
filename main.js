import './style.css';

// 0. Preloader
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    preloader.style.pointerEvents = 'none';
    setTimeout(() => { preloader.style.display = 'none'; }, 800);
  }
}

window.addEventListener('load', () => {
  setTimeout(hidePreloader, 1800); // Bắt buộc màn hình chờ hiện ít nhất 1.8s
});
setTimeout(hidePreloader, 3000); // Tối đa 3s là tự tắt (phòng hờ lỗi)

document.addEventListener('DOMContentLoaded', () => {

  // 1. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 3. Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optional: unobserve after animating once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all elements to animate
  const animateElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .fade-in');
  animateElements.forEach(el => observer.observe(el));

  // 4. Mobile Menu Tabs
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuGroups = document.querySelectorAll('.menu-category-group');

  if (menuTabs.length > 0 && menuGroups.length > 0) {
    menuTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs and groups
        menuTabs.forEach(t => t.classList.remove('active'));
        menuGroups.forEach(g => g.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Show corresponding group
        const targetId = tab.getAttribute('data-target');
        const targetGroup = document.getElementById(targetId);
        if (targetGroup) {
          targetGroup.classList.add('active');
        }
      });
    });
  }
});
