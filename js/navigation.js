// Mobile Navigation toggle for component demos
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function (event) {
            event.stopPropagation();
            mainNav.classList.toggle('active');

            const isExpanded = mainNav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded.toString());
            updateHamburgerIcon(isExpanded);
        });

        document.addEventListener('click', function (event) {
            const isClickInside = mainNav.contains(event.target);

            if (!isClickInside && mainNav.classList.contains('active')) {
                closeMenu();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 1160 && mainNav.classList.contains('active')) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && mainNav.classList.contains('active')) {
                closeMenu();
                menuToggle.focus();
            }
        });

        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-controls', 'main-navigation');

        if (!mainNav.id) {
            mainNav.id = 'main-navigation';
        }
    }

    function closeMenu() {
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        updateHamburgerIcon(false);
    }

    function updateHamburgerIcon(isActive) {
        const hamburgerIcon = menuToggle.querySelector('.hamburger-icon');
        if (hamburgerIcon) {
            hamburgerIcon.classList.toggle('active', isActive);
        }
    }
});
