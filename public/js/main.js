import page from "//unpkg.com/page/page.mjs";

function render(path) {
  fetch(`/pages/${path}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('app').innerHTML = html;
      // Cargar módulo JS dinámicamente si existe
      import(`./${path}.js`).then(module => {
        if (module.init) module.init();
      }).catch(() => {});
    });
}

// Definir rutas
page('/', () => render('home'));
page('/about', () => render('about'));
page('/shop', () => render('shop'));
page('/detail', () => render('detail'));
page('/cart', () => render('cart'));
page('/pay', () => render('pay'));

page('*', () => render('home'));

// Iniciar enrutamiento
page();

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const href = link.getAttribute('href');
    page.show(href);
  });
});
