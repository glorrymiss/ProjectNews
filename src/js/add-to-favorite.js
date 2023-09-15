import { savedApiData } from './cards';

const STORAGE_KEY = 'favoriteNews';
const gallery = document.querySelector('.gallery');

gallery.addEventListener('click', getFavoriteId);

// export function getFavoriteId(evt) {
//   if (evt.target.classList.contains('js-tartet-favorite')) {
//     const id = evt.target.closest('.js-card-item').dataset.targetId;

//     saveFavotiteNew(id);
//     return;
//   }
//   if (evt.target.classList.contains('js-is-favorite')) {
//     const id = evt.target.closest('.js-card-item').dataset.targetId;
//     removeFromFavorite(id);
//   }
// }

export function getFavoriteId(evt) {
  //console.log('====');
  if (evt.target.classList.contains('favorit-bth')) {
    // const targetS = evt.target.classList.contains('js-tartet-favorite');
    const targetR = evt.target.classList.contains('js-is-favorite');
    const itemNews = evt.target.closest('.js-card-item');
    const id = itemNews.dataset.targetId;
    const targetF = itemNews.classList.contains('inFavorite');
    // console.log(targetF);
    // console.log(targetR);
    if (targetF || targetR) {
      //console.log('remove');
      removeFromFavorite(id);
      return;
    }

    saveFavotiteNew(id);
  }
}

function saveFavotiteNew(id) {
  const favoriteNew = savedApiData.find(item => item.id === id);

  const favoriteBtnText = document.querySelector(
    `li[data-target-id='${id}'] span.js-tartet-favorite`
  );
  const favoriteBtn = document.querySelector(
    `li[data-target-id='${id}'] button.js-tartet-favorite`
  );
  const favoriteSvg = document.querySelector(
    `li[data-target-id='${id}'] svg.js-tartet-favorite`
  );
  const favoriteUse = document.querySelector(
    `li[data-target-id='${id}'] use.js-tartet-favorite`
  );
  const storageNews = JSON.parse(localStorage.getItem(STORAGE_KEY));

  const targetF = document.querySelector(`li[data-target-id='${id}']`);

  if (!storageNews) {
    const firstNew = [];
    firstNew.push(favoriteNew);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(firstNew));
  } else if (!storageNews.find(el => el.id === id)) {
    storageNews.push(favoriteNew);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageNews));
  }
  targetF.classList.add('inFavorite');
  favoriteBtnText.classList.replace('js-tartet-favorite', 'js-is-favorite');
  favoriteBtn.classList.replace('js-tartet-favorite', 'js-is-favorite');
  favoriteSvg.classList.replace('js-tartet-favorite', 'js-is-favorite');
  favoriteUse.classList.replace('js-tartet-favorite', 'js-is-favorite');

  changeFavoriteBtnText(favoriteBtnText);
  //favoriteSvg.classList.replace(oldClass, newClass)
  favoriteSvg.classList.replace('wrap-image__icon', 'fill-heard');
}

function removeFromFavorite(id) {
  const favoriteBtnText = document.querySelector(
    `li[data-target-id='${id}'] span.js-is-favorite`
  );
  const favoriteBtn = document.querySelector(
    `li[data-target-id='${id}'] button.js-is-favorite`
  );
  const favoriteSvg = document.querySelector(
    `li[data-target-id='${id}'] svg.js-is-favorite`
  );
  const favoriteUse = document.querySelector(
    `li[data-target-id='${id}'] use.js-is-favorite`
  );
  const targetF = document.querySelector(`li[data-target-id='${id}']`);
  let storageNews = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const removedNewIndex = storageNews.findIndex(item => item.id === id);
  storageNews.splice(removedNewIndex, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storageNews));
  storageNews = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (storageNews.length === 0) {
    localStorage.removeItem(STORAGE_KEY);
  }

  targetF.classList.remove('inFavorite');
  favoriteBtnText.classList.replace('js-is-favorite', 'js-tartet-favorite');
  favoriteBtn.classList.replace('js-is-favorite', 'js-tartet-favorite');
  favoriteSvg.classList.replace('js-is-favorite', 'js-tartet-favorite');
  favoriteUse.classList.replace('js-is-favorite', 'js-tartet-favorite');

  changeFavoriteBtnText(favoriteBtnText);
  
  favoriteSvg.classList.replace('fill-heard', 'wrap-image__icon');
}

export function changeFavoriteBtnText(ref) {
  ref.textContent =
    ref.textContent === 'Add to favorite'
      ? 'Remove from favorite'
      : 'Add to favorite';
}
