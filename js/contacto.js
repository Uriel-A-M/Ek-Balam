document.getElementById('miFormulario').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const data = new FormData(form);
    const action = form.action;
    
    try {
        const response = await fetch(action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            document.getElementById('popupGracias').classList.add('active');
            form.reset();
        } else {
            const errorData = await response.json();
            alert('Error al enviar: ' + (errorData.error || 'Intenta más tarde'));
        }
    } catch (error) {
        alert('Error de conexión. Revisa tu internet.');
    }
});
  
// Botones para cerrar el popup
document.getElementById('cerrarPopup').addEventListener('click', () => {
    document.getElementById('popupGracias').classList.remove('active');
});
document.getElementById('aceptarPopup').addEventListener('click', () => {
    document.getElementById('popupGracias').classList.remove('active');
});
