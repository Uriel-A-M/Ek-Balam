document.getElementById('miFormulario').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('https://formspree.io/f/urielaymena89@gmail.com', {
            method: 'POST',
            body: new FormData(e.target),
            headers: {
                'Accept': 'application/json',
                'Origin': 'https://unique-sawine-b38aa8.netlify.app/' // Reemplaza con tu URL real
            }
        });
        
        if (response.ok) {
            document.getElementById('popupGracias').classList.add('active');
            e.target.reset();
        } else {
            const errorData = await response.json();
            console.error('Error de Formspree:', errorData);
            alert('Error al enviar: ' + (errorData.error || 'Por favor inténtalo más tarde'));
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('Error de conexión. Revisa tu internet.');
    }
});