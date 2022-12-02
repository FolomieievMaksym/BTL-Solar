let viewportHeight = document.documentElement.clientHeight;
window.addEventListener("scroll", showPictures);
showPictures();
function showPictures(e) {
   document.querySelectorAll("[data-srcset]").forEach((el) => {
      if (el.getBoundingClientRect().top <= viewportHeight * 1.1) {
         el.setAttribute("srcset", el.getAttribute("data-srcset"));
      }
   });
   document.querySelectorAll("[data-img-src]").forEach((el) => {
      if (el.getBoundingClientRect().top <= viewportHeight * 1.1) {
         el.setAttribute("src", el.getAttribute("data-img-src"));
         // el.removeAttribute("style"); // ? А нужны ли вообще стили..?
      }
   });
   document.querySelectorAll("[data-video-src]").forEach((el) => {
      if (el.getBoundingClientRect().top <= viewportHeight * 1.1) {
         el.setAttribute("src", el.getAttribute("data-video-src"));
      }
   });
}
