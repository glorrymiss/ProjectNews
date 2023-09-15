import debounce from 'lodash.debounce';
import {
  makeData,
  createCard,
  dataSectionNormalize,
  arrLastData,
} from './apiNews';
import { perPage } from './apiUrl';
import { sectionList, sectionNews, countSearch } from './apiUrl';
import { saveLS, loadLS } from './lStorage';
import { valuePage, makePaginationsBtnMurkUp } from './pagination';
import { savedApiData } from './cards';
import { addRead, checkFavorites, checkRead } from './apiCard';

const LS_KEY = 'lastSearch';
const FAIVORIT_NEWS = 'favoriteNews';
const READ_NEWS = 'readNews';

const gallery = document.querySelector('.gallery');
const categories = document.querySelector('.categories');
const listShow = document.getElementById('categories-show');
const showHideCategoriesBtn = document.getElementById('categories-toggler');
const categoriesContainer = document.querySelector('.categories__container');
const categoriesIcon = document.querySelector(
  '#categories-toggler .categories__icon'
);
const filterItems = document.querySelector('.filter');
const calendarBtn = document.getElementById('menu-calendar');
const calendarText = document.querySelector('.calendar__text');
const calendarIcon = document.querySelector('#menu-calendar .categories__icon');

function rendeSection(item) {
  const { display_name, section } = item;
  return `<li class="categories__item" data-section=${section}>${display_name}</li>
  `;
}

async function makeSection(url) {
  try {
    const Data = await makeData(url);
    listShow.innerHTML = Data.map(rendeSection).join('');
    restart();
    sortSections();
  } catch (error) {}
}

export async function makeSectionNews(url) {
  const weather = document.querySelector('.weather__thumb');
  const sectionHome = document.querySelector('.section_home');
  const errorRequest = document.querySelector('.errorRequest');
  arrLastData.length = 0;
  savedApiData.length = 0;

  try {
    sectionNews.params.limit = countSearch.perPage;
    const news = await makeData(url);
    arrLastData.push(...news.map(dataSectionNormalize));
    savedApiData.push(...arrLastData);
    gallery.innerHTML = arrLastData.map(createCard).join('');
    gallery.prepend(weather);

    errorRequest.classList.add('visually-hidden');
    sectionHome.classList.remove('visually-hidden');
    checkRead(READ_NEWS);
    checkFavorites(FAIVORIT_NEWS);
  } catch (error) {
    console.log(error);
  }
}

//?===== function  render

export function restart() {
  const element = document.querySelector('.gallery');
  const style = window.getComputedStyle(element, null);
  valuePage.totalPage = Math.floor(countSearch.newsCount / countSearch.perPage);

  if (countSearch.rowCount === +style.getPropertyValue('--countCard')) return;
  countSearch.rowCount = +style.getPropertyValue('--countCard');

  switch (countSearch.rowCount) {
    case 1:
      countSearch.sectionCount = 0;
      countSearch.perPage = 4;
      break;
    case 2:
      countSearch.sectionCount = 4;
      countSearch.perPage = 7;
      break;
    case 3:
      countSearch.sectionCount = 6;
      countSearch.perPage = 8;
      break;
  }
  valuePage.totalPage = Math.floor(countSearch.newsCount / countSearch.perPage);
  sortSections();
  makePaginationsBtnMurkUp();

  console.log(countSearch.rowCount);
}

function sortSections() {
  let elementShow = Array.from(
    document.querySelectorAll('#categories-show .categories__item')
  );
  let elementHide = Array.from(
    document.querySelectorAll('#categories-hide .categories__item')
  );
  const list = [...elementShow, ...elementHide];

  const listShow = document.getElementById('categories-show');
  const listHide = document.getElementById('categories-hide');

  if (!countSearch.sectionCount) {
    showHideCategoriesBtn.querySelector('span').textContent = 'Categories';
    categoriesContainer.classList.add('no-categories');
  } else {
    showHideCategoriesBtn.querySelector('span').textContent = 'Others';
    categoriesContainer.classList.remove('no-categories');
  }
  elementShow = [];
  elementHide = [];

  for (let i = 0; i < list.length; i++) {
    if (i < countSearch.sectionCount) {
      elementShow.push(list[i]);
    } else elementHide.push(list[i]);
  }
  listShow.innerHTML = '';
  listHide.innerHTML = '';
  listShow.append(...elementShow);
  listHide.append(...elementHide);
}

showHideCategoriesBtn.addEventListener('click', () => {
  filterItems.classList.toggle('filter-show');
  categoriesIcon.classList.toggle('rotate');
});

calendarBtn.addEventListener('click', () => {
  calendarIcon.classList.toggle('rotate');
});

categories.addEventListener('click', e => {
  if (
    e.target.nodeName === 'LI' &&
    e.target.classList.contains('categories__item')
  ) {
    const listItem = categories.querySelectorAll('.categories__item');
    listItem.forEach(item => item.classList.remove('activ'));
    e.target.classList.add('activ');
    categoriesIcon.classList.remove('rotate');
    filterItems.classList.remove('filter-show');

    sectionNews.subUrl = e.target.dataset.section;
    sectionNews.type = 'SECTION';
    valuePage.curPage = 1;

    saveLS(LS_KEY, sectionNews);

    (async () => {
      try {
        sectionNews.params.limit = countSearch.perPage;
        makeSectionNews(sectionNews);

        sectionNews.params.limit = countSearch.maxHits;
        const news = await makeData(sectionNews);
        countSearch.newsCount = news.length;
        restart();
        sortSections();
        makePaginationsBtnMurkUp();
      } catch (error) {
        console.log(error);
      }
    })();
  }
});

window.addEventListener('load', () => {
  makeSection(sectionList);
});

window.addEventListener(
  'resize',
  debounce(() => {
    restart();
  }, 250)
);
window.addEventListener('click', e => {
  if (
    !e.target.closest('.filter-wrapper') &&
    !e.target.closest('.filter__btn')
  ) {
    if (filterItems.classList.contains('filter-show')) {
      categoriesIcon.classList.remove('rotate');
      filterItems.classList.remove('filter-show');
    }
  }
});

gallery.addEventListener('click', addRead);
