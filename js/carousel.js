// js/carousel.js
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    
    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;
    
    // Organizar las diapositivas una al lado de la otra
    slides.forEach((slide, index) => {
      slide.style.left = `${slideWidth * index}px`;
    });
    
    // Mover al slide específico
    function moveToSlide(index) {
      track.style.transition = 'transform 0.5s ease'; // Agregar transición suave
      track.style.transform = `translateX(-${slideWidth * index}px)`;
      currentIndex = index;
    }
    
    // Siguiente slide
    nextBtn.addEventListener('click', function() {
      if (currentIndex === slides.length - 1) {
        moveToSlide(0);
      } else {
        moveToSlide(currentIndex + 1);
      }
      resetSlideInterval(); // Restablecer el intervalo
    });
    
    // Slide anterior
    prevBtn.addEventListener('click', function() {
      if (currentIndex === 0) {
        moveToSlide(slides.length - 1);
      } else {
        moveToSlide(currentIndex - 1);
      }
      resetSlideInterval(); // Restablecer el intervalo
    });
    
    // Autoavance cada 5 segundos
    let slideInterval = setInterval(() => {
      if (currentIndex === slides.length - 1) {
        moveToSlide(0);
      } else {
        moveToSlide(currentIndex + 1);
      }
    }, 5000);
    
    // Pausar al pasar el mouse
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      slideInterval = setInterval(() => {
        if (currentIndex === slides.length - 1) {
          moveToSlide(0);
        } else {
          moveToSlide(currentIndex + 1);
        }
      }, 5000);
    });
    
    // Adaptar al cambiar tamaño de pantalla
    window.addEventListener('resize', function() {
      const newSlideWidth = slides[0].getBoundingClientRect().width;
      track.style.transition = 'none'; // Deshabilitar transición al redimensionar
      track.style.transform = `translateX(-${newSlideWidth * currentIndex}px)`;
      track.style.transition = 'transform 0.5s ease'; // Rehabilitar transición
    });
    
    // Función para restablecer el intervalo al hacer clic manualmente
    function resetSlideInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        if (currentIndex === slides.length - 1) {
          moveToSlide(0);
        } else {
          moveToSlide(currentIndex + 1);
        }
      }, 5000);
    }
  });
  