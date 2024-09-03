document.addEventListener('DOMContentLoaded', () => {
    // Manejo de eventos para añadir productos al carrito
    document.querySelectorAll('button[data-id]').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            // Aquí podrías enviar una solicitud al servidor para añadir el producto al carrito
            console.log(`Producto con ID ${id} añadido al carrito`);
        });
    });
});
