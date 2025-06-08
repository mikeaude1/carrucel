let currentIndex = 0;
document.addEventListener('DOMContentLoaded', () => {
  // 1. Cargar la vista activa cuando la página termina de cargar
  cargarVistaActiva();

  // 2. Configurar clics en los puntos
  const pages = document.querySelectorAll('.page');
  pages.forEach((dot) => {
    dot.addEventListener('click', () => {
      pages.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      cargarVistaActiva();
    });
  });
});

function cargarVistaActiva() {
  const activePage = document.querySelector('.page.active');
  if (!activePage) return;

  const headerDiv = document.querySelector('.header');
  const pageId = activePage.id; // "page1", "page2", etc.
  const url = `/${pageId}.html`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('No se pudo cargar la vista');
      return res.text();
    })
    .then(html => {
      headerDiv.innerHTML = html;
    })
    .catch(err => {
      headerDiv.innerHTML = `<p style="color: red;">Error al cargar: ${err.message}</p>`;
    });
}

function paginar(direccion) {
  const pages = document.querySelectorAll('.page');
  pages[currentIndex].classList.remove('active');

  // dirección: 1 = siguiente, 0 = anterior
  if (direccion === 1) {
    currentIndex = (currentIndex + 1) % pages.length;
  } else if (direccion === 0) {
    currentIndex = (currentIndex - 1 + pages.length) % pages.length;
  }

  pages[currentIndex].classList.add('active');
  cargarVistaActiva();
}

