"use strict";

import galleryItems from "./gallery-items.js";
//console.log(galleryItems);

//!!! ======= find method opposite closest =========

{
  //     <li class="gallery__item">
  //       <a
  //         class="gallery__link"
  //         href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  //       >
  //         <img
  //           class="gallery__image"
  //           src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
  //           data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  //           alt="Tulips"
  //         />
  //       </a>
  //     </li>;
}

const refs = {
  gallery: document.querySelector(".js-gallery"),
  modalWindow: document.querySelector(".js-lightbox"),
  lightboxImage: document.querySelector(".js-lightbox .lightbox__image"),
  lightBoxCloseButton: document.querySelector(
    'button[data-action="close-lightbox"]'
  ),
  overlay: document.querySelector("div.lightbox__content"),
};

//Создание и рендер разметки по массиву данных и предоставленному шаблону.
const markup = buildGalleryItems(galleryItems);

refs.gallery.insertAdjacentHTML("beforeend", markup);

function buildGalleryItems(photos) {
  return photos.map((photo) => buildGalleryItemMarkup(photo)).join("");
}

function buildGalleryItemMarkup({ preview, original, description }) {
  const galleryItem = `
  <li class="gallery__item">
    <a
        class="gallery__link"
        href="${original}"
    >
    <img
      class="gallery__image"
      src=""
      data-source="${original}"
      data-lazy='${preview}'
      alt="${description}"
    />
    </a>
  </li>
  `;
  return galleryItem;
}

//Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
refs.gallery.addEventListener("click", handleClick);

function handleClick(e) {
  // console.log(e.target);
  // console.log(e.currentTarget);
  if (e.target === e.currentTarget) return;
  e.preventDefault();
  getOriginalBigImage(e);
  //console.log(getOriginalBigImage(e));
  openModal();
  substituteAtrSrc(getOriginalBigImage(e));
}

function getOriginalBigImage(element) {
  const originalBigImage = element.target.dataset.source;
  return originalBigImage;
}

//Открытие модального окна по клику на элементе галереи.
function openModal() {
  refs.modalWindow.classList.add("is-open");
  //console.log(refs.modalWindow.classList);

  window.addEventListener("keydown", handleKeyPress);
}

//Подмена значения атрибута src элемента img.lightbox__image.
function substituteAtrSrc(originalBigImage) {
  // console.log(originalBigImage);
  refs.lightboxImage.setAttribute("src", originalBigImage);
  // console.log(refs.lightboxImage);
}

// Закрытие модального окна по клику на кнопку button[data-action="close-modal"].
refs.lightBoxCloseButton.addEventListener("click", closeModal);

function closeModal() {
  refs.modalWindow.classList.remove("is-open");
  clearAtrSrcOfImg();

  window.removeEventListener("keydown", handleKeyPress);
}

//Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
function clearAtrSrcOfImg() {
  refs.lightboxImage.setAttribute("src", "");
}

//Закрытие модального окна по клику на div.lightbox__overlay.
refs.overlay.addEventListener("click", handleOverlayClick);

function handleOverlayClick(event) {
  // console.log(event.target);
  // console.log(event.currentTarget);
  if (event.target !== event.currentTarget) {
    return;
  }
  // console.log("click");
  closeModal();
}

//Закрытие модального окна по нажатию клавиши ESC.

// (Будем слушать только тогда, когда открыли модальку)

function handleKeyPress(event) {
  // console.log(event.target);
  // console.log(event.currentTarget);
  // console.log(event.code);
  if (event.code !== "Escape") {
    return;
  }
  // console.log(event.code);
  closeModal();
}
