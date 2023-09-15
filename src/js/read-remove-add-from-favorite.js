const STORAGE_KEY_FAVORITE = 'favoriteNews';
const STORAGE_KEY_READ = 'readNews';
const itemListRef = document.querySelector('.item-list');

itemListRef.addEventListener('click', getFavoriteId);

function getFavoriteId(evt) {
  if (evt.target.classList.contains('js-tartet-favorite')) {
    const id = evt.target.closest('.js-card-item').dataset.targetId;
    saveFavotiteNew(id);
    return;
  }

  if (evt.target.classList.contains('js-is-favorite')) {
    const id = evt.target.closest('.js-card-item').dataset.targetId;
    console.log('🚀 ~ getFavoriteId ~ id:', id);
    removeFromFavorite(id);
  }
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
  console.log('🚀 ~ removeFromFavorite ~ favoriteSvg:', favoriteSvg);
  const favoriteUse = document.querySelector(
    `li[data-target-id='${id}'] use.js-is-favorite`
  );

  let storageNews = JSON.parse(localStorage.getItem(STORAGE_KEY_FAVORITE));
  const removedNewIndex = storageNews.findIndex(item => item.id === id);
  storageNews.splice(removedNewIndex, 1);
  localStorage.setItem(STORAGE_KEY_FAVORITE, JSON.stringify(storageNews));
  storageNews = JSON.parse(localStorage.getItem(STORAGE_KEY_FAVORITE));
  if (storageNews.length === 0) {
    localStorage.removeItem(STORAGE_KEY_FAVORITE);
    errorRequest.classList.remove('visually-hidden');
  }

  favoriteBtnText.classList.replace('js-is-favorite', 'js-tartet-favorite');
  favoriteBtnText.textContent = 'Add to favorite';
  favoriteBtn.classList.replace('js-is-favorite', 'js-tartet-favorite');
  favoriteSvg.classList.replace('js-is-favorite', 'js-tartet-favorite');
  favoriteSvg.classList.replace('fill-heard', 'wrap-image__icon');
  favoriteUse.classList.replace('js-is-favorite', 'js-tartet-favorite');
}

function saveFavotiteNew(id) {
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

  const favoriteNews = JSON.parse(localStorage.getItem(STORAGE_KEY_FAVORITE));
  const ReadNews = JSON.parse(localStorage.getItem(STORAGE_KEY_READ));

  const favoriteNew = ReadNews.find(item => item.id === id);

  if (!favoriteNews) {
    const firstNew = [];
    firstNew.push(favoriteNew);
    localStorage.setItem(STORAGE_KEY_FAVORITE, JSON.stringify(firstNew));
  } else if (!favoriteNews.find(el => el.id === id)) {
    favoriteNews.push(favoriteNew);
    localStorage.setItem(STORAGE_KEY_FAVORITE, JSON.stringify(favoriteNews));
  }

  favoriteBtnText.classList.replace('js-tartet-favorite', 'js-is-favorite');
  favoriteBtn.classList.replace('js-tartet-favorite', 'js-is-favorite');
  favoriteSvg.classList.replace('js-tartet-favorite', 'js-is-favorite');
  favoriteUse.classList.replace('js-tartet-favorite', 'js-is-favorite');

  favoriteBtnText.textContent = 'Remove from favorite';
  favoriteSvg.classList.replace('wrap-image__icon', 'fill-heard');
}
