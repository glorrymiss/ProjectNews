const menuBtn = document.querySelector('.mobile__menu-btn');
const menu = document.querySelector('.mobile__menu');
const bodyScroll = document.querySelector('body');

menuBtn.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu(event) {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;

  menuBtn.classList.toggle('isMenuOpen');
  menuBtn.setAttribute('aria-expanded', !expanded);

  menu.classList.toggle('isMenuOpen');
  bodyScroll.classList.toggle('body-scroll');
}

const links = document.querySelectorAll('.mobile__menu-link');
const currentPath = window.location.pathname;

links.forEach(link => {
  if (link.pathname === currentPath) {
    link.parentElement.classList.add('active');
  }
});
