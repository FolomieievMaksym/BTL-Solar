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

if (document.querySelector(".gallery-images__swiper")) {
   const swiperHorizontalBig = new Swiper(".gallery-images__swiper", {
      speed: 500,
      slidesPerView: 1,
      spaceBetween: 12,
      sliderPerColumn: 1,
      simulateTouch: true,
      autoHeight: true,
      loop: true,
      pagination: {
         el: ".swiper-pagination",
         type: "bullets",
         clickable: true,
      },
      breakpoints: {
         600: {
            slidesPerView: 2,
         },
         990: {
            slidesPerView: 3,
         },
      },
   });
}
