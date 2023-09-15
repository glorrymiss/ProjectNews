import { KEY } from './api-key';

const API_KEY = KEY;

export const countSearch = {
  sectionCount: 0,
  rowCount: 0,
  perPage: 8,
  maxHits: 500,
  newsCount: 20,
};
export const sectionList = {
  baseUrl: `https://api.nytimes.com/svc/news/v3/content/`,
  subUrl: 'section-list',
  params: {
    'api-key': API_KEY,
  },
};

export const sectionNews = {
  baseUrl: `https://api.nytimes.com/svc/news/v3/content/all/`,
  subUrl: '',
  params: {
    'api-key': API_KEY,
    limit: countSearch.perPage,
    offset: 0,
  },
};

export const mostPopularNews = {
  baseUrl: `https://api.nytimes.com/svc/mostpopular/v2/viewed/`,
  subUrl: '1',
  params: {
    'api-key': API_KEY,
  },
};

export const articleSearchNews = {
  baseUrl: `https://api.nytimes.com/svc/search/v2/`,
  subUrl: 'articlesearch',
  params: {
    'api-key': API_KEY,
    page: 0,
    q: '',
  },
};

export function makeURL(searhParam) {
  const { baseUrl, subUrl, params } = searhParam;

  const urlParams = new URLSearchParams(params);
  return `${baseUrl}${subUrl}.json?${urlParams}`;
}
