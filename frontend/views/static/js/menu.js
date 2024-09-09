function añadirCarrito(event, producto) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const form = document.getElementById(`form-${producto}`);
    const formData = new URLSearchParams(new FormData(form));

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Asume que la respuesta es JSON
            }
            throw new Error('Error al añadir al carrito');
        })
        .then(data => {
            // Actualizar el carrito en el offcanvas
            updateOffcanvas(data);
            // Mostrar el offcanvas
            const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasCarrito'));
            offcanvas.show();
        })
        .catch(error => {
            console.error(error);
        });
}

function updateOffcanvas(data) {
    const carritoItems = document.getElementById('carritoItems');
    carritoItems.innerHTML = ''; // Limpiar los ítems actuales

    data.carrito.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
    <div class="d-flex justify-content-between align-items-center">
        <div>
            <h5>${item.nombre}</h5>
            <p>Precio: $${item.precio} x ${item.cantidad}</p>
            <p>Subtotal: $${item.precio * item.cantidad}</p>
        </div>
        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">X</button>
    </div>
`;
        carritoItems.appendChild(li);
    });

    const totalCarrito = document.getElementById('totalCarrito');
    totalCarrito.textContent = `Total: $${data.total}`;
}

function removeFromCart(id) {
    fetch('/carrito/eliminar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
        .then(response => response.json())
        .then(data => {
            updateOffcanvas(data);
        })
        .catch(error => {
            console.error(error);
        });
}

function limpiarCarrito() {
    fetch('/carrito/limpiar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateOffcanvas({ carrito: [], total: 0 });
            }
        })
        .catch(error => {
            console.error(error);
        });
}
function pagar() {
    location.href = '/v1/checkout';
}