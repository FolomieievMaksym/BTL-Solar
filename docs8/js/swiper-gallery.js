if (document.querySelector(".horizontal-gallery__swiper-big")) {
   const swiperHorizontalBig = new Swiper(".horizontal-gallery__swiper-big", {
      speed: 500,
      slidesPerView: 1,
      spaceBetween: 12,
      sliderPerColumn: 1,
      simulateTouch: true,
      breakpoints: {
         1000: {
            spaceBetween: 20,
         },
      },
      thumbs: {
         swiper: {
            el: ".horizontal-gallery__swiper-small",
            slidesPerView: 3,
            spaceBetween: 12,
            breakpoints: {
               500: {
                  slidesPerView: 4,
                  spaceBetween: 10,
               },
               600: {
                  slidesPerView: 5,
               },
            },
         },
      },
   });
}
