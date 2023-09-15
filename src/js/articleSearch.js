import {
  makeData,
  createCard,
  dataArticleSearchNormalize,
  arrLastData,
} from './apiNews';
import { articleSearchNews, countSearch } from './apiUrl';
import { saveLS } from './lStorage';
import { savedApiData } from './cards';
import { valuePage, makePaginationsBtnMurkUp } from './pagination';


const LS_KEY = 'lastSearch';
const gallery = document.querySelector('.gallery');
const searhForm = document.querySelector('#search-form');
const categories = document.querySelector('.categories');
const weather = document.querySelector('.weather__thumb');
const sectionHome = document.querySelector('.section_home');
const errorRequest = document.querySelector('.errorRequest');

export async function makeArticleSectionNews(url) {
  arrLastData.length = 0;
  savedApiData.length = 0;
  try {
    const news = await makeData(url);
    arrLastData.push(...news.map(dataArticleSearchNormalize));

    arrLastData.splice(countSearch.perPage);

    savedApiData.push(...arrLastData);
    gallery.innerHTML = arrLastData.map(createCard).join('');
    gallery.prepend(weather);
    errorRequest.classList.add('visually-hidden');
    sectionHome.classList.remove('visually-hidden');
  } catch (error) {}
}

searhForm.addEventListener('submit', e => {
  e.preventDefault();

  const searchNews = e.target.searchQuery.value.trim();
  e.currentTarget.reset();

  if (!searchNews) {
    return;
  }

  const listItem = categories.querySelectorAll('.categories__item');
  listItem.forEach(item => item.classList.remove('activ'));

  let selectedDate = document.querySelector('.calendar-btn-span').textContent;
  selectedDate = selectedDate.trim().split('/').reverse().join('');

  articleSearchNews.params.q = searchNews;
  articleSearchNews.params.page = 0;

  if (/\d{8}/.test(selectedDate)) {
    articleSearchNews.params.begin_date = selectedDate;
    articleSearchNews.params.end_date = selectedDate;
  }

  articleSearchNews.type = 'SEARCHE';
  saveLS(LS_KEY, articleSearchNews);
  makeArticleSectionNews(articleSearchNews);
  valuePage.curPage = 1;
  makePaginationsBtnMurkUp();
});
