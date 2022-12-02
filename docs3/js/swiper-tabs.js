const swiperTabs = new Swiper(".tabs-swiper__body", {
   speed: 500,
   slidesPerView: 1,
   initialSlide: 1,
   spaceBetween: 25,
   simulateTouch: true,
   thumbs: {
      swiper: {
         el: ".tabs-swiper__head",
         slidesPerView: 3,
      },
   },
});
