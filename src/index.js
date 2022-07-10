import './sass/main.scss';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { requestToServer } from './js/request-to-server';
import { renderHtml } from './js/render-html';
import { refs } from './js/refs';

let page = 1;
let inputValue = '';
let totalHits = 0;
let notificationBtn = 0;

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

refs.formEl.addEventListener('submit', onClickSearch);

async function onClickSearch(e) {
  notificationBtn = 0
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  inputValue = searchQuery.value;
  const photo = await searchPhoto(searchQuery.value);

  totalHits = photo.totalHits;

  if (searchQuery.value.trim() === '') {
    renderClear(refs.galleryEl)
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  } else {
    Notiflix.Notify.success(`Hooray! We found ${photo.totalHits} images.`);
  }
  refs.galleryEl.innerHTML = '';
  renderHtml(photo.hits);
  page = 1;
  refs.formEl.reset();
  lightbox.refresh();
}

async function searchPhoto(value) {
  const res = await requestToServer(value);
  return res.data;
}
async function loadMore() {

  if (refs.galleryEl.children.length >= totalHits) {
    if(notificationBtn === 1){
      return;
    }
    notificationBtn = 1;
    return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
  page += 1;
  const photo = await requestToServer(inputValue, page);

  renderHtml(photo.data.hits);

  lightbox.refresh();
}

// async function loadMore() {
//   if (refs.galleryEl.children.length >= totalHits) {
//     return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//   }
//   page += 1;
//   const photo = await requestToServer(inputValue, page);

//   renderHtml(photo.data.hits);

//   lightbox.refresh();
// }

window.addEventListener('scroll', () => {
  let contentHeight = document.body.offsetHeight;
  let yOffset = window.pageYOffset;
  let windowHeight = window.innerHeight;
  let y = yOffset + windowHeight;
  if (y >= contentHeight) {
    loadMore();
  }
});