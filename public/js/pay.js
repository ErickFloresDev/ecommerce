export function init() {
    console.log('pay cargado');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('pay-total').textContent = `Total: S/ ${total.toFixed(2)}`;

    const qrImages = {
        yape: './images/qr/yape.png',
        plin: './images/qr/plin.png',
        bbva: './images/qr/bbva.png'
    };

    let selectedMethod = '';

    document.querySelectorAll('.qr-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedMethod = btn.dataset.method;
            document.getElementById('qr-image').src = qrImages[selectedMethod];
            document.getElementById('qr-display').classList.remove('hidden');
        });
    });



    document.getElementById('payment-form').addEventListener('submit', async e => {
        e.preventDefault();

        const [nombres, apellidos, correo, telefono] = Array.from(document.querySelectorAll('input')).map(el => el.value);
        const direccion = document.querySelector('textarea').value;
        const evidencia = document.querySelector('input[type="file"]').files[0];

        const data = {
            nombres,
            apellidos,
            correo,
            telefono,
            direccion,
            metodoPago: selectedMethod,
            total: total.toFixed(2),
            productos: cart,
            evidenciaNombre: evidencia?.name || ''
        };

        const formData = new FormData();
        formData.append("payload", JSON.stringify(data));

        try {
            await fetch('https://script.google.com/macros/s/AKfycbw4fzjHEmkYsiL-jXT3tnZjNSehGUg4NGNVKFR3V2ixgGUbIaZnDw23e_D3EdrRsqWY/exec', {
                method: 'POST',
                body: formData
            });

            alert('Tu pedido fue enviado. Gracias por tu compra!');
            localStorage.removeItem('cart');
            location.href = '/';
        } catch (err) {
            alert('Error al enviar el pedido. Intenta nuevamente.');
            console.error(err);
        }
    });


}
