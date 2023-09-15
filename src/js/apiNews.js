import axios from 'axios';
import { makeURL } from './apiUrl';
const DEFAULT_PLUG = new URL('../images/blank.webp', import.meta.url);


export const arrLastData = [];

let preLoader = document.querySelector('.preloader');
preLoader.classList.add('loaded');

export async function getData(url, timeout = 5000) {
  preLoader.classList.remove('loaded');
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await axios.get(url, {
    signal: controller.signal,
  });
  clearTimeout(id);
  setTimeout(() => {
    preLoader.classList.add('loaded');
  }, 400);

  return response;
}


export async function makeData(url) {
  const URL = makeURL(url);
  try {
    const Data = await getData(URL);

    if (Data.data.status !== 'OK') {
      throw new Error(Data.data.status);
    }

    if (typeof Data.data['response'] !== 'undefined') {
      if (!Data.data.response.docs.length) {
        throw new Error('Нічого не знайшлось');
      }
      return Data.data.response.docs;
    }
    if (!Data.data.results.length) {
      throw new Error('Нічого не знайшлось');
    }
    return Data.data.results;
  } catch (error) {
    console.log(error);
    const sectionHome = document.querySelector('.section_home');
    const errorRequest = document.querySelector('.errorRequest');

    errorRequest.classList.remove('visually-hidden');
    sectionHome.classList.add('visually-hidden');
  }
}

export function dataSectionNormalize(item) {
  const { uri, url, title, section, abstract, published_date, multimedia } =
    item;
  const imgUrl = multimedia !== null ? multimedia[2].url : DEFAULT_PLUG;
  const newDateStr = published_date
    .slice(0, published_date.indexOf('T'))
    .trim()
    .split('-')
    .reverse()
    .join('/');
  return { id: uri, url, title, section, abstract, imgUrl, newDateStr };
}

export function dataArticleSearchNormalize(item) {
  const {
    uri,
    web_url,
    headline: { main },
    section_name,
    abstract,
    pub_date,
    multimedia,
  } = item;

  const imgUrl =
    multimedia.length !== 0
      ? `https://static01.nyt.com/${multimedia[2].url}`
      : DEFAULT_PLUG;
  const newDateStr = pub_date
    .slice(0, pub_date.indexOf('T'))
    .trim()
    .split('-')
    .reverse()
    .join('/');
  return {
    id: uri,
    url: web_url,
    title: main,
    section: section_name,
    abstract,
    imgUrl,
    newDateStr,
  };
}


export function dataMostPopularNormalize(item) {
  const { uri, url, title, section, abstract, published_date, media } = item;
  const imgUrl =
    media.length !== 0 ? media[0]['media-metadata'][2].url : DEFAULT_PLUG;
  const newDateStr = published_date
    .slice(0, published_date.indexOf('T'))
    .trim()
    .split('-')
    .reverse()
    .join('/');
  return { id: uri, url, title, section, abstract, imgUrl, newDateStr };
}

const iconHeart = new URL('../images/icon.svg', import.meta.url);

export function createCard(item) {
  const { id, url, title, section, abstract, imgUrl, newDateStr } = item;

  return `
         <li class="card  js-card-item" data-target-id="${id}">
      <div class="wrap-image">
          <img
            src="${imgUrl}"
            alt="photo"
           class="wrap-image__photo"
          />
          <p class="wrap-image__text">${section}</p>
          <button type="button" class="wrap-image__btn js-tartet-favorite favorit-bth">
          <span id="favorit-txt" class="wrap-image__btn-text js-tartet-favorite">Add to favorite</span>
           <svg class="wrap-image__icon js-tartet-favorite" width="16" height="16">
                <use href ='${iconHeart}#icon-heart' class="js-tartet-favorite"></use>
              </svg></button>
        </div>
        <h2 class="card__title">${title}</h2>
        <p class="card__description">${
          abstract.length > 112 ? abstract.slice(0, 113) + '...' : abstract
        }</p>
          <p class="wrap-info__time">${newDateStr}</p>
          <a href="${url}" class="wrap-info__link" target="_blank" rel="noreferrer noopener">Read more</a>
          <p class="wrap-image__active visually-hidden">Already read</p>
      </li>
     `;
}
