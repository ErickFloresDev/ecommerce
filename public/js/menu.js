
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    sidebar.classList.toggle('translate-x-full');

    if (!sidebar.classList.contains('translate-x-full')) {
    body.classList.add('no-scroll');
    } else {
    body.classList.remove('no-scroll');
    }
}

// FUNCIONALIDAD: acordeón
let currentOpenAccordion = null;

function toggleAccordion(id) {
    const submenu = document.getElementById('submenu-' + id);
    const icon = document.getElementById('icon-' + id);

    if (currentOpenAccordion && currentOpenAccordion !== id) {
    const openSubmenu = document.getElementById('submenu-' + currentOpenAccordion);
    const openIcon = document.getElementById('icon-' + currentOpenAccordion);
    openSubmenu.classList.remove('open');
    openIcon.classList.remove('rotate-180');

    setTimeout(() => {
        submenu.classList.toggle('open');
        icon.classList.toggle('rotate-180');
        currentOpenAccordion = submenu.classList.contains('open') ? id : null;
    }, 300);
    } else {
    submenu.classList.toggle('open');
    icon.classList.toggle('rotate-180');
    currentOpenAccordion = submenu.classList.contains('open') ? id : null;
    }
}

// Cierra el sidebar si se hace clic fuera
document.addEventListener('click', function (event) {
    const sidebar = document.getElementById('sidebar');
    const isClickInside = sidebar.contains(event.target);
    const isSidebarVisible = !sidebar.classList.contains('translate-x-full');
    const isToggleButton = event.target.closest('button[onclick="toggleSidebar()"]');

    if (!isClickInside && isSidebarVisible && !isToggleButton) {
    toggleSidebar();
    }
});