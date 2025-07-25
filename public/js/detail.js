export function init() {
   console.log('details cargado');

  const product = JSON.parse(localStorage.getItem('selectedProduct'));
  const container = document.getElementById('detail');

  if (!product || !container) {
    container.innerHTML = '<p class="text-center p-10 text-red-600 col-span-4">Producto no encontrado.</p>';
    return;
  }

  container.innerHTML = `
    <!-- Grid Layout: Imagen a la izquierda, detalles a la derecha -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      
      <!-- Imagen del producto -->
      <div class="order-1 lg:order-1 flex items-center justify-center">
        <div class="bg-gray-50 rounded-xl overflow-hidden aspect-square relative w-full md:w-2/3 lg:w-3/4">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          >
          ${product.price_end < product.price ? '<span class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">Oferta</span>' : ''}
        </div>
      </div>

      <!-- Detalles del producto -->
      <div class="order-2 lg:order-2 flex flex-col justify-center space-y-6">
        
        <!-- Título -->
        <div>
          <h1 class="text-2xl lg:text-4xl font-light text-gray-900 mb-2">
            ${product.name}
          </h1>
          ${product.brand ? `<p class="text-gray-500 text-sm uppercase tracking-wide">${product.brand}</p>` : ''}
        </div>

        <!-- Precio -->
        <div class="space-y-1">
          <div class="flex items-baseline space-x-3">
            <span class="text-3xl font-semibold text-gray-900">
              S/ ${product.price_end.toFixed(2)}
            </span>
            ${product.price_end < product.price ? 
              `<span class="text-lg text-gray-400 line-through">S/ ${product.price.toFixed(2)}</span>` : 
              ''
            }
          </div>
          ${product.price_end < product.price ? 
            `<p class="text-sm text-red-500 font-medium">
              Ahorra S/ ${(product.price - product.price_end).toFixed(2)}
            </p>` : 
            ''
          }
        </div>

        <!-- Descripción -->
        <div>
          <p class="text-gray-600 leading-relaxed">
            ${product.description}
          </p>
        </div>

        <!-- Stock -->
        <div class="border-t pt-4">
          <div class="flex items-center justify-between">
              <span class="${product.message_stock === 'Disponible' ? 'text-green-500' : product.message_stock === 'Limitado' ? 'text-yellow-500' : 'text-red-500'} text-sm font-medium">
                ${product.message_stock}
              </span>
          </div>
        </div>

        <!-- Cantidad y botón -->
        <div class="space-y-4 pt-4">
          <div class="flex items-center space-x-4">
            <label class="text-sm font-medium text-gray-700">Cantidad:</label>
            <div class="flex items-center border rounded-lg">
              <button class="px-3 py-2 hover:bg-gray-100 text-gray-600">-</button>
              <input 
                type="number" 
                value="1" 
                min="1" 
                max="${product.stock || 1}"
                class="w-16 text-center py-2 border-0 focus:ring-0"
              >
              <button class="px-3 py-2 hover:bg-gray-100 text-gray-600">+</button>
            </div>
          </div>

          <!-- Botones de acción -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button id="addToCartBtn" class="flex-1 bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Agregar al carrito
            </button>
            <a href="/cart" class="flex-1 text-center border border-gray-300 text-gray-700 py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Ver mi lista
            </a>
          </div>
        </div>

        <!-- Información adicional -->
        <div class="border-t pt-6 space-y-3">
          <div class="flex items-center space-x-3 text-sm text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            <span>Envío gratis en compras mayores a S/100</span>
          </div>
          <div class="flex items-center space-x-3 text-sm text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Garantía de 30 días</span>
          </div>
        </div>
      </div>
    </div>
  `;

  //FUNCION AGREGAR A LA LISTA DE CART (BOTON CART)
  document.getElementById('addToCartBtn').addEventListener('click', () => {
    const qtyInput = container.querySelector('input[type="number"]');
    const quantity = parseInt(qtyInput.value) || 1;

    const item = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      price: product.price_end,
      quantity
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cart.find(p => p.id === item.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Producto agregado al carrito');
  });

}
