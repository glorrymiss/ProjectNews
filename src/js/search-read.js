import {renderFromLS} from './renderRead'

const STORAGE_KEY = 'readNews';
const STORAGE_KEY_FOUND_NEWS = 'foundNews';
const readNews = JSON.parse(localStorage.getItem(STORAGE_KEY));
const errorRequest = document.querySelector(".errorRequest");
const serachForm = document.querySelector('.search-form');
const dataBlock = document.querySelector('.date-block');

serachForm.addEventListener('submit', onSearch)

function onSearch(evt) {
    evt.preventDefault();
    const query = evt.currentTarget.elements.searchQuery.value.trim();
    
    if (!Boolean(query)){
      console.log('єто ф-ция onSearch');
      dataBlock.innerHTML=''
      renderFromLS(STORAGE_KEY)
      return
      }
    
    let foundNews=[]
   readNews
    .map(({ id, section, imgUrl, title, abstract, newDateStr, url, readDate }) =>{
        
        if(title.toLowerCase().includes(query.toLowerCase())) {
          foundNews.push({id:`${id}`,
          url :`${url}`,
          title : `${title}`,
          section: `${section}`,
          abstract : `${abstract}`,
          newDateStr : `${newDateStr}`,
          imgUrl : `${imgUrl}`,
          readDate: `${readDate}`,})
        }
        
    })

    if (foundNews.length>0){
      dataBlock.innerHTML=''
      localStorage.setItem(STORAGE_KEY_FOUND_NEWS, JSON.stringify(foundNews));
      renderFromLS(STORAGE_KEY_FOUND_NEWS)
      const ulGallery = document.querySelector('.gallery');
      const divDataTitle=document.querySelector('.date-title')

      ulGallery.classList.remove('visually-hidden')
      divDataTitle.classList.add('rotate')
    }
  
    if (foundNews.length===0) {
        errorRequest.classList.remove('visually-hidden')
        dataBlock.classList.add('visually-hidden')
      }
}


