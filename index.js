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
    // makeItem.id = index;

    console.log(makeItem);

    return makeItem;
  });
};

const createGalery = makeGallery(images);
gallery.append(...createGalery);
console.log(gallery);

// ОТКЛЮЧАЮ ССЫЛКУ

const galleryLink = document.querySelectorAll('.gallery__link');
galleryLink.forEach((element) =>
  element.addEventListener('click', function (event) {
    event.preventDefault();
  })
);

// OPEN MODAL WINDOW

gallery.addEventListener('click', openModal);

function openModal(event) {
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  selectedItemIndex = +event.target.dataset.id;
  lightbox.classList.add('is-open');

  lightBoxImage.src = event.target.dataset.source;
}
//KEYS LEFT AND RIGHT

window.onkeydown = function (event) {
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
    }
    {
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
}











