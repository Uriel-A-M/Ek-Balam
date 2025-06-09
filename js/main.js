// js/main.js
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
  
    toggleBtn.addEventListener('click', function () {
      navbarLinks.classList.toggle('active');
      this.setAttribute('aria-expanded', navbarLinks.classList.contains('active'));
    });
  
    const navLinks = document.querySelectorAll('.navbar-links a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navbarLinks.classList.remove('active');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  
    // Scroll suave + enfoque accesible
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
  
        if (targetElement) {
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus({ preventScroll: true });
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Animaciones con IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Solo una vez
        }
      });
    }, {
      threshold: 0.2
    });
  
    document.querySelectorAll('.card, .letra-svg, .testimonio').forEach(el => {
      observer.observe(el);
    });
  
    // Cambiar navbar al hacer scroll (con requestAnimationFrame)
    const navbar = document.querySelector('.navbar');
    function toggleNavbarStyle() {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          toggleNavbarStyle();
          ticking = false;
        });
        ticking = true;
      }
    });
  
    // Ejecutar también al cargar
    toggleNavbarStyle();
  });
  