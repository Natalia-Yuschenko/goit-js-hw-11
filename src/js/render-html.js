import { refs } from './refs';

export function renderHtml(arry) {
  let markup = '';
  arry.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    const elementTemplate = `<div class="photo-card"><a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a><div class="info"><p class="info-item"><b>Likes</b><span>${likes}</span></p><p class="info-item"><b>Views</b><span>${views}</span></p><p class="info-item"><b>Comments</b><span>${comments}</span></p><p class="info-item"><b>Downloads</b><span>${downloads}</span></p></div></div> `;
    markup += elementTemplate;
  });
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}