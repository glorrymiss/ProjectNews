import { createMarkupFavorite } from './createMarkupFavorite';
const STORAGE_KEY = 'favoriteNews';
const favoriteNews = JSON.parse(localStorage.getItem(STORAGE_KEY));
const errorRequest = document.querySelector('.errorRequest');
const serachForm = document.querySelector('.search-form');

serachForm.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();
  const query = evt.currentTarget.elements.searchQuery.value.trim();

  if (!Boolean(query)) {
    createMarkupFavorite(favoriteNews);
    errorRequest.classList.add('visually-hidden');
    return;
  }
  let markup = '';
  let foundNews = [];
  markup = favoriteNews.map(
    ({ id, section, imgUrl, title, abstract, newDateStr, url }) => {
      if (title.toLowerCase().includes(query.toLowerCase())) {
        foundNews.push({
          id: `${id}`,
          url: `${url}`,
          title: `${title}`,
          section: `${section}`,
          abstract: `${abstract}`,
          newDateStr: `${newDateStr}`,
          imgUrl: `${imgUrl}`,
        });
      }
    }
  );
  createMarkupFavorite(foundNews);
  if (foundNews.length === 0) {
    errorRequest.classList.remove('visually-hidden');
  }
}
