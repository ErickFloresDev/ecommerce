export function init() {
  console.log('cart cargado');

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const tbody = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');

  if (!cart.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center mt-20 p-6 text-gray-600">Tu carrito está vacío.</td></tr>`;
    totalEl.textContent = 'Total: S/ 0.00';
    return;
  }

  function renderCart() {
    let total = 0;

    const rows = cart.map((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      return `
        <tr class="border-b text-center">
          <td class="p-4">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover mx-auto">
          </td>
          <td class="p-4 font-tiktok-cart-name">${item.name} <br> <span class="text-gray-400 font-tiktok-cart-brand">${item.brand}</span> </td>
          <td class="p-4 font-tiktok-cart-name">S/ ${item.price.toFixed(2)}</td>
          <td class="p-4">
            <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input w-16 text-center p-1 border rounded font-tiktok-cart-name" />
          </td>
          <td class="p-4 font-tiktok-cart-name">S/ ${(subtotal).toFixed(2)}</td>
          <td class="p-4">
            <button class="delete-btn text-red-500 hover:text-red-700" data-index="${index}">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.innerHTML = rows;
    totalEl.textContent = `Total: S/ ${total.toFixed(2)}`;
    
    const btnContainer = document.getElementById('cart-pay-btn');
    btnContainer.innerHTML = `
      <div class="text-right mt-6">
        <a href="/pay" class="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition nav-link">Ir a Pagar</a>
      </div>
    `;


    // Eventos de cantidad
    tbody.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', () => {
        const index = parseInt(input.dataset.index);
        let value = parseInt(input.value);
        if (value < 1 || isNaN(value)) value = 1;
        cart[index].quantity = value;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart(); // Re-renderiza
      });
    });

    // Eventos de eliminar
    tbody.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart(); // Re-renderiza
      });
    });
  }

  renderCart();
}
