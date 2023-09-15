const gallery = document.querySelector('.gallery');
import { addRead } from './apiCard';
import { getFavoriteId } from './add-to-favorite';
gallery.addEventListener('click', getFavoriteId);
gallery.addEventListener('click', addRead);
