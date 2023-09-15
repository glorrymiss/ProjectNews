const btnsContainer = document.getElementById('pagination');
const btnForward = document.querySelector('.next-page');
const btnBackPage = document.querySelector('.prev-page');
const paginContainer = document.querySelector('.pagination');
import { paginationAll } from './apiPagination.js';
import { createCards } from './cards.js';

btnForward.disabled = true;
function smoothScroll() {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 50,
      behavior: 'smooth',
    });
  }, 500);
}
export const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  totalPages: 20,
  set totalPage(newTotalPages) {
    this.totalPages = newTotalPages;
  },
  get totalPage() {
    return this.totalPages;
  },
};

paginContainer.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('pg-link--border')) {
    return;
  } else if (
    e.target.classList.contains('prev-page') ||
    e.target.classList.contains('next-page')
  ) {
    smoothScroll();
    handleButton(e.target);
    makePaginationsBtnMurkUp(valuePage);
    paginationAll(valuePage.curPage);
    return;
  } else if (!e.target.classList.contains('pg-link')) {
    return;
  }
  smoothScroll();
  valuePage.curPage = parseInt(e.target.dataset.page);
  makePaginationsBtnMurkUp(valuePage);
  paginationAll(valuePage.curPage);
});

export function makePaginationsBtnMurkUp() {
  const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;
  let numberTruncateLeft = curPage - delta;
  let numberTruncateRight = curPage + delta;

  let widthPage = document.querySelector('body').getBoundingClientRect().width;
  if (widthPage < 767) {
    numberTruncateLeft = curPage;
    numberTruncateRight = curPage;
  }

  let range = delta + 4;
  if (widthPage < 767) {
    range = delta + 1;
  }
  let render = '';
  let renderTwoSide = '';
  let dot = `<li class="pg-item"><a class="pg-link pg-link--border">...</a></li>`;
  let countTruncate = 0;
  let active = '';
  for (let pos = 1; pos <= totalPages; pos++) {
    active = pos === curPage ? 'active' : '';
    if (totalPages >= 2 * range - 1) {
      if (numberTruncateLeft > 1 && numberTruncateRight < totalPages - 1) {
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          renderTwoSide += renderPage(pos, active);
        }
      } else {
        if (
          (curPage < range && pos <= range) ||
          (curPage > totalPages - range && pos >= totalPages - range + 1) ||
          pos === totalPages ||
          pos === 1
        ) {
          render += renderPage(pos, active);
        } else {
          countTruncate++;
          if (countTruncate === 1) render += dot;
        }
      }
    } else {
      render += renderPage(pos, active);
    }
  }
  if (renderTwoSide) {
    renderTwoSide =
      renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
    btnsContainer.innerHTML = renderTwoSide;
  } else {
    btnsContainer.innerHTML = render;
  }
  handleButtonLeft();
  handleButtonRight();
}
function renderPage(index, active = '') {
  return ` <li class="pg-item " >
        <a class="pg-link ${active} " href="#"data-page="${index}">${index}</a>
    </li>`;
}

function handleButton(element) {
  smoothScroll();
  if (element.classList.contains('prev-page')) {
    valuePage.curPage--;
    handleButtonLeft();
    btnForward.disabled = false;
  } else if (element.classList.contains('next-page')) {
    valuePage.curPage++;
    handleButtonRight();
    btnBackPage.disabled = false;
  }

  makePaginationsBtnMurkUp();
}
function handleButtonLeft() {
  if (valuePage.curPage === 1) {
    btnBackPage.disabled = true;
  } else {
    btnBackPage.disabled = false;
  }
}
function handleButtonRight() {
  if (valuePage.curPage === valuePage.totalPages) {
    btnForward.disabled = true;
  } else {
    btnForward.disabled = false;
  }
}
