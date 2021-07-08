import images from './gallery-items.js';

const gallery = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.lightbox');
const lightBoxImage = document.querySelector('.lightbox__image');
let selectedItemIndex = null;

const makeGallery = (options) => {
  return options.map((image, index) => {
    const makeItem = document.createElement('li');
    makeItem.classList = 'gallery__item';
    makeItem.insertAdjacentHTML(
      'beforeend',
      `<a class="gallery__link" href="${image.original}"><img class="gallery__image" data-id="${index}" src="${image.preview}" data-source="${image.original}" alt="${image.description}"/></a>`
    );
    console.log(makeItem);

    return makeItem;
  });
};

const createGalery = makeGallery(images);
gallery.append(...createGalery);
console.log(gallery);

// OPEN MODAL WINDOW

gallery.addEventListener('click', openModal);

function openModal(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  lightbox.classList.add('is-open');
  window.addEventListener('keydown', turnOnKeys);

  selectedItemIndex = +event.target.dataset.id;
  console.log(event.target.dataset);

  lightBoxImage.src = event.target.dataset.source;
}

const turnOnKeys = (event) => {
  if (event.keyCode === 27) {
    modalClose(event);
    return;
  }
  // arrow right
  if (event.keyCode === 39) {
    if (selectedItemIndex === images.length - 1) {
      selectedItemIndex = 0;
    } else {
      selectedItemIndex++;
    }
    lightBoxImage.src = images[selectedItemIndex].original;
  }
  // arrow left
  if (event.keyCode === 37) {
    if (selectedItemIndex === 0) {
      selectedItemIndex = images.length;
    } else {
      selectedItemIndex--;
    }
    lightBoxImage.src = images[selectedItemIndex].original;
  }
};

// CLOSE MODAL WINDOW

const btnClose = document.querySelector('.lightbox__button');
btnClose.addEventListener('click', modalClose);

const closeByClickOverlay = document.querySelector('.lightbox__overlay');
closeByClickOverlay.addEventListener('click', modalClose);

function modalClose(event) {
  lightBoxImage.src = '';
  lightbox.classList.remove('is-open');
  window.removeEventListener('keydown', turnOnKeys);
}
