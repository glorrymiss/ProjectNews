const iconSearch = document.querySelector('.btn-search');

const headerInput = document.querySelector('.input-text');

iconSearch.addEventListener('click', iconSearchClick);

function iconSearchClick() {
  if (document.documentElement.clientWidth < 768) {
    headerInput.classList.toggle('mob-input');
    iconSearch.classList.toggle('mob-icon-position');
  }
}
