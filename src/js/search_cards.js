import axios from 'axios';

export async function getSearchCards() {
  const URL =
    'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=7p9CJylKpjl89QHHczOefIddo1AI47yw';
  const requestData = await axios.get(URL);
  return requestData;
}

const iconHeart = new URL('../images/icon.svg', import.meta.url);

async function createSearchCards() {
  try {
    const response = await getSearchCards();
    console.log(response);
    const data = response.data.response.docs;
    createMarkup(data);
  } catch (error) {
    console.error('Error from backend:', error);
  }
}

function createMarkup(arr) {
  const markup = arr
    .map(
      ({
        headline,
        web_url,
        pub_date,
        section_name,
        lead_paragraph,
        _id,
        multimedia,
      }) => {
        let urlImg = multimedia.map(media => media.url);

        return `
         <li class="card js-card-item" data-target-id="${_id}">
          <div class="wrap-image">
            <img
                src="https://static01.nyt.com/${urlImg[0]}"
              alt="photo"
             class="wrap-image__photo"
            />
            <p class="wrap-image__active" hidden>Already read</p>
            <p class="wrap-image__text">${section_name}</p>
            <button type="button" class="wrap-image__btn js-tartet-favorite"><span class="js-tartet-favorite">Add to favorite</span>
           <svg class="wrap-image__icon js-tartet-favorite" width="16" height="16">
                <use href ='${iconHeart}#icon-heart' class="js-tartet-favorite"></use>
              </svg></button>
          </div>
          <h2 class="card__title">${headline.main}</h2>
          <p class="card__description">${
            lead_paragraph.length > 112
              ? lead_paragraph.slice(0, 113) + '...'
              : lead_paragraph
          }</p>
            <p class="wrap-info__time">${pub_date}</p>
            <a href="${web_url}" target="_blank" rel="noreferrer noopener" class="wrap-info__link">Read more</a>
            <p class="wrap-image__active visually-hidden">Already read</p>
        </li>
          `;
      }
    )
    .join('');
}
