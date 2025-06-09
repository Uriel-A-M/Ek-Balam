
document.getElementById('miFormulario').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Inputs
  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const telefono = document.getElementById('telefono');
  const asunto = document.getElementById('asunto');
  const mensaje = document.getElementById('mensaje');

  // Spans de error
  const errorNombre = document.getElementById('error-nombre');
  const errorEmail = document.getElementById('error-email');
  const errorTelefono = document.getElementById('error-telefono');
  const errorAsunto = document.getElementById('error-asunto');
  const errorMensaje = document.getElementById('error-mensaje');

  // Reset de errores
  [nombre, email, telefono, asunto, mensaje].forEach(input => input.classList.remove('input-error'));
  [errorNombre, errorEmail, errorTelefono, errorAsunto, errorMensaje].forEach(span => span.textContent = '');

  let hayErrores = false;

  if (!nombre.value.trim()) {
    errorNombre.textContent = 'Por favor, escribe tu nombre.';
    nombre.classList.add('input-error');
    hayErrores = true;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    errorEmail.textContent = 'Ingresa un correo válido.';
    email.classList.add('input-error');
    hayErrores = true;
  }

  if (telefono.value && !/^\d{10}$/.test(telefono.value)) {
    errorTelefono.textContent = 'Debe tener 10 dígitos (solo números).';
    telefono.classList.add('input-error');
    hayErrores = true;
  }

  if (!asunto.value) {
    errorAsunto.textContent = 'Selecciona un asunto.';
    asunto.classList.add('input-error');
    hayErrores = true;
  }

  if (!mensaje.value.trim()) {
    errorMensaje.textContent = 'Escribe un mensaje.';
    mensaje.classList.add('input-error');
    hayErrores = true;
  }

  if (hayErrores) return;

  // Envío con Formspree
  try {
    const response = await fetch('https://formspree.io/f/xvgrkbgy', {
      method: 'POST',
      body: new FormData(e.target),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      document.getElementById('popupGracias').classList.add('active');
      e.target.reset();
    } else {
      const errorData = await response.json();
      alert('Error al enviar: ' + (errorData.error || 'Intenta más tarde'));
    }
  } catch (error) {
    alert('Error de conexión. Revisa tu internet.');
    console.error(error);
  }
});

// Botones para cerrar el popup
document.getElementById('cerrarPopup').addEventListener('click', () => {
  document.getElementById('popupGracias').classList.remove('active');
});
document.getElementById('aceptarPopup').addEventListener('click', () => {
  document.getElementById('popupGracias').classList.remove('active');
});

