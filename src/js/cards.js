import axios from 'axios';
import { KEY } from './api-key';
import { arrLastData } from './apiNews';
import { checkRead } from './apiCard';
import { loadLS, saveLS } from './lStorage';
import { checkFavorites } from './apiCard';
import { valuePage } from './pagination';
import { makePaginationsBtnMurkUp } from './pagination';
import { countSearch } from './apiUrl';
import { restart } from './filter-categories';

let LS_KEY = 'lastSearch';

export async function getCards() {
  const URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${KEY}`;
  const request = await axios.get(URL);
  const requestData = request;
  return requestData;
}
const gallery = document.querySelector('.gallery');
const READ_NEWS = 'readNews';
const STORAGE_KEY_FAVORITE = 'favoriteNews';
const favoriteNews = JSON.parse(localStorage.getItem(STORAGE_KEY_FAVORITE));
const iconHeart = new URL('../images/icon.svg', import.meta.url);
const backPhoto = new URL('../images/blank.webp', import.meta.url);
const refs = {
  gallery: document.querySelector('.gallery'),
};

export let savedApiData = [];

export async function createCards(page) {
  try {
    restart();
    const response = await getCards();
    let currentPage = page || 1;
    let cardsPerPage = countSearch.perPage;

    let totalHits = response.data.num_results;
    valuePage.totalPages = Math.ceil(totalHits / cardsPerPage);
    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    makePaginationsBtnMurkUp();
    const data = response.data.results.slice(start, end);
    const weather = document.querySelector('.weather__thumb');
    savedApiData = [];
    let someOne = {
      type: '',
    };

    saveApiData(data);
    saveLS(LS_KEY, someOne);
    let lastsearch = loadLS(LS_KEY);
    lastsearch.type = 'POPULAR';
    saveLS(LS_KEY, lastsearch);
    arrLastData.length = 0;
    arrLastData.push(...savedApiData);
    const markup = createMarkup(savedApiData);
    refs.gallery.innerHTML = '';
    gallery.prepend(weather);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    checkRead(READ_NEWS);
    checkFavorites(STORAGE_KEY_FAVORITE);
  } catch (error) {
    console.error('Error from backend:', error);
  }
}
createCards();
export function createMarkup(arr) {
  const markup = arr
    .map(({ id, url, title, section, abstract, newDateStr, imgUrl }) => {
      return `
         <li class="card  js-card-item" data-target-id="${id}">
      <div class="wrap-image">
          <img
            src="${imgUrl.length === 0 ? backPhoto : imgUrl}"
            alt="photo"
           class="wrap-image__photo"
          />
          <p class="wrap-image__text">${section}</p>
          <button type="button" id="favorit-bth" class="wrap-image__btn js-tartet-favorite favorit-bth">
          <span class="wrap-image__btn-text js-tartet-favorite" id='favorit-txt'>Add to favorite</span>
           <svg class="wrap-image__icon js-tartet-favorite" width="16" height="16">
                <use href ='${iconHeart}#icon-heart' class="js-tartet-favorite"></use>
              </svg></button>
        </div>
        <h2 class="card__title">${title}</h2>
        <p class="card__description">${
          abstract.length > 112 ? abstract.slice(0, 113) + '...' : abstract
        }</p>
          <p class="wrap-info__time">${newDateStr
            .split('-')
            .reverse()
            .join('/')}</p>
          <a href="${url}" class="wrap-info__link" target="_blank" rel="noreferrer noopener">Read more</a>
          <p class="wrap-image__active visually-hidden">Already read</p>
      </li>
     `;
    })
    .join('');

  return markup;
}
function saveApiData(arrey) {
  arrey.map(({ id, url, title, section, abstract, published_date, media }) => {
    const item = {};
    let imgUrl = media.map(media => media['media-metadata'][2].url);
    let newDateStr = published_date;
    //.replace(/-/g, '/');
    item['id'] = `${id}`;
    item['url'] = `${url}`;
    item['title'] = `${title}`;
    item['section'] = `${section}`;
    item['abstract'] = `${abstract}`;
    item['newDateStr'] = newDateStr;
    item['imgUrl'] = imgUrl;
    savedApiData.push(item);
  });
}
