import { savedApiData } from './cards';

const STORAGE_KEY = 'readNews';

let readNews = [];

const gallery = document.querySelector('.gallery');

export default function getReadNewsId(event) {
  if (event.target.classList.contains('wrap-info__link')) {
    event.target.parentNode.style.opacity = '60%';
    event.target.nextElementSibling.classList.remove('visually-hidden');
    const id = event.target.closest('.js-card-item').dataset.targetId;
    saveReadNew(id);
  }
}

export function saveReadNew(id) {
  const readDate = new Date().toLocaleDateString().replaceAll('.', '/');
  const readNew = savedApiData.find(item => item.id === id);
  readNew.readDateNew = readDate;

  if (readNews.length < 0) {
    readNews.push(readNew);
  }

  if (readNews.every(el => Number(el.id) !== Number(id))) {
    readNews.push(readNew);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(readNews));
  }
}
