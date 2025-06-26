document.addEventListener('DOMContentLoaded', () => {
  // Inicializa GSAP con ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Animación de la línea central
  gsap.to('.timeline::before', {
    scrollTrigger: {
      trigger: '.timeline-section',
      start: 'top center',
      end: 'bottom center',
      scrub: 0.5
    },
    scaleY: 1,
    duration: 2
  });
  
  // Animación de los items (ahora más suave)
  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    const content = item.querySelector('.timeline-content');
    const direction = i % 2 === 0 ? -50 : 50;
    
    // Configuración inicial para la animación
    gsap.set(content, {
      opacity: 1, // Aseguramos que sea visible
      y: 0        // Eliminamos transformaciones iniciales
    });
    
    // Animación al hacer scroll
    gsap.from(content, {
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      x: direction,
      opacity: 0.5,
      duration: 0.8,
      ease: 'power2.out'
    });
    
    // Efecto interactivo
    content.addEventListener('mouseenter', () => {
      gsap.to(item.querySelector('::after'), {
        scale: 1.2,
        duration: 0.3
      });
    });
    
    content.addEventListener('mouseleave', () => {
      gsap.to(item.querySelector('::after'), {
        scale: 1,
        duration: 0.3
      });
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  // Animación de los testimonios al hacer scroll
  const testimonioCards = document.querySelectorAll('.testimonio-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Efecto escalonado
        const index = Array.from(testimonioCards).indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.15}s`;
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  testimonioCards.forEach(card => {
    observer.observe(card);
    card.style.transitionDelay = '0s'; // Reset inicial
  });

  // Efecto parallax para las imágenes
  testimonioCards.forEach(card => {
    const img = card.querySelector('.testimonio-image img');
    
    card.addEventListener('mousemove', (e) => {
      const x = e.clientX - card.getBoundingClientRect().left;
      const y = e.clientY - card.getBoundingClientRect().top;
      const centerX = card.offsetWidth / 2;
      const centerY = card.offsetHeight / 2;
      
      const moveX = (x - centerX) / 20;
      const moveY = (y - centerY) / 20;
      
      img.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1.05) translate(0, 0)';
    });
  });
});