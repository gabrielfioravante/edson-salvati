AOS.init();

const menu = document.querySelector('.js-menu');
const links = document.querySelector('.js-links');

menu.addEventListener('click', () => {
  links.classList.toggle('links--open');
  menu.classList.toggle('menu--open');
});
