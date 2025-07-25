// shop.js
import page from "//unpkg.com/page/page.mjs";
import { fetchProducts } from '../interface/api.js';

console.log('shop.js cargado');

export async function init() {
  const products = await fetchProducts();
  const view = document.getElementById('view');

  if (!view) {
    console.error('No se encontró el elemento con id="view"');
    return;
  }

  if (!products.length) {
    view.innerHTML = '<p class="text-center p-10 text-red-600 col-span-4">No se encontraron productos.</p>';
    return;
  }

  const html = products.map(product => `
    <div class="bg-white flex flex-col justify-between rounded-xl shadow-md border overflow-hidden">
      <a href="/detail" data-id="${product.id}" class="product-link focus:outline-none">
        <div class="relative flex justify-center items-center p-2 md:p-6">
          <img src="${product.image}" alt="${product.name}" class="w-auto h-32 sm:h-40 md:h-48 object-cover">
          ${product.price_end < product.price ? '<span class="absolute top-2 right-2 bg-white text-red-500 font-semibold border py-0 md:py-1 px-2 rounded-full  font-tiktok-offert">Oferta</span>' : ''}
        </div>
      </a>

        <div class="p-4">
          
          <h2 class="truncate-text font-tiktok-product ">${product.name}</h2>
          <p class="text-gray-500 font-tiktok-category mt-1 mb-2 truncate-description ">${product.description}</p>
          <p class="text-gray-500 font-tiktok-category mt-1 mb-2"> <span class="border px-2 rounded-full">${product.category}</span></p>
          <div class="flex justify-between items-center ">
            <div class="flex flex-wrap items-center">
              <p class="font-tiktok-price mr-2">S/ ${product.price_end.toFixed(2)}</p>
              ${product.price_end < product.price ? `<p class="text-gray-500 font-tiktok-category line-through text-sm">S/ ${product.price.toFixed(2)}</p>` : ''}
            </div>
          </div>
          
          <div class="flex flex-wrap justify-between items-center gap-2 mt-4">
              <a href="/detail" data-id="${product.id}" class="product-link font-tiktok-category bg-white border  py-2 px-4 rounded-lg flex items-center justify-center w-full">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye mr-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                Ver detalle
              </a>
              <button class="add-to-cart-btn bg-black font-tiktok-category text-white py-2 px-4 rounded-lg w-full flex items-center justify-center" data-id="${product.id}">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="#ffffff"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart mr-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                Agregar
              </button>
          </div>
        </div>
      
    </div>
  `).join('');

  view.innerHTML = html;

  //Product detail storage
  document.querySelectorAll('.product-link').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const id = link.dataset.id;
      const product = products.find(p => p.id == id); // usa == o convierte id a string/int

      if (product) {
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        page.show('/detail');
      }
    });
  });

  // Agregar al carrito desde listado
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const product = products.find(p => p.id == id); // Asegura tipo

      if (!product) return;

      const item = {
        id: product.id,
        name: product.name,
        brand: product.brand || '',
        image: product.image,
        price: product.price_end,
        quantity: 1
      };

      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      const existing = cart.find(p => p.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push(item);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Producto agregado al carrito');
    });
  });


}
