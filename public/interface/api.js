// public/interface/api.js o src/interface/api.js (según tu estructura)
const API_URL = "https://social-bussines-back.vercel.app/api/products/active";
const IMAGE_BASE_URL = "https://qiziyaqqptpwcarbywsx.supabase.co/storage/v1/object/public/imagenes/products/";

export async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    return data.map(product => ({
      id: product.id_product,
      name: product.name,
      brand: product.brand,
      category: product.category,
      section: product.section,
      description: product.description,
      image: IMAGE_BASE_URL + product.image, // construir ruta completa
      price: product.price,
      price_end: product.price_end,
      stock: product.stock,
      message_stock: product.message_stock,
      state: product.state
    }));
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
}
