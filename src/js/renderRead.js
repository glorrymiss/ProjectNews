import { createCard, arrLastData } from './apiNews';
import { loadLS } from './lStorage';
import { checkFavorites, togleFaforite } from './apiCard';

const READ_NEWS = 'readNews';
const FAIVORIT_NEWS = 'favoriteNews';

const dataBlock = document.querySelector('.date-block');
const errorRequest = document.querySelector('.errorRequest');
const icon = new URL('../images/icon.svg', import.meta.url);

export function renderFromLS(key) {
  let favoritNews = loadLS(key);

  let readDate = '0000/00/00';

  if (!favoritNews) {
    return;
  }
  arrLastData.length = 0;
  arrLastData.push(...favoritNews);
  errorRequest.classList.add('visually-hidden');
  dataBlock.classList.remove('visually-hidden');

  readDate = favoritNews[0].readDate;
  favoritNews.push({ readDate: '0' });
  const tempBlock = [];
  favoritNews.forEach(i => {
    if (readDate !== i.readDate) {
      const dateTitle = document.createElement('div');
      dateTitle.innerHTML = `<span class="btn-span">${readDate}</span>
                                    <svg class="icon-down-read-pg icon-rotate" width="15" height="15">
                                         <use href="${icon}#icon-arrow-down"></use>
                                    </svg>`;
      dataBlock.append(dateTitle);
      const dateBlock = document.createElement('UL');
      // ***********************
      dateTitle.classList.add('date-title');
      // **********************
      dateBlock.classList.add('gallery');
      dateBlock.classList.add('visually-hidden');
      dateBlock.innerHTML = tempBlock.map(createCard).join('');
      dataBlock.append(dateBlock);
      readDate = i.readDate;
      tempBlock.length = 0;
    }
    tempBlock.push(i);
  });
  checkFavorites(FAIVORIT_NEWS);
  favoritNews.pop();
  loadLS(READ_NEWS, favoritNews);
}

window.addEventListener('load', () => {
  renderFromLS(READ_NEWS);
});

function lostFavorite() {
  let favoritNews = loadLS(key);
  arrLastData.length = 0;
  arrLastData.push(...favoritNews);
}

const readBlock = document.querySelector('#readNews');
readBlock.addEventListener('click', togleFaforite);
