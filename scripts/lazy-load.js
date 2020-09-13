"use strict";

const lazyLoad = (target) => {
  const options = {
    rootMargin: "50px 0px",
    threshold: 0.01,
  };

  const intersectionObs = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      //console.log(entry.target);
      if (entry.isIntersecting) {
        const img = entry.target;
        const imageUrl = img.dataset.lazy;

        img.setAttribute("src", imageUrl);

        // console.log(observer);
        observer.disconnect();
      }
    });
  }, options);

  intersectionObs.observe(target);
};

const images = document.querySelectorAll(".js-gallery img");

images.forEach((image) => {
  lazyLoad(image);
});
