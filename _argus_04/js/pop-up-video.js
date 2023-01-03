document.querySelectorAll("[data-video]").forEach((el) => {
   el.addEventListener("click", toggleVideo);
});
function toggleVideo(e) {
   if (e.target.closest("[data-video-play]")) {
      if (window.innerWidth < 769) {
         if (document.fullscreenEnabled) {
            e.target.closest("[data-video]  > div > div").lastElementChild.lastElementChild.requestFullscreen();
         }
      }
      e.target.closest("[data-video] [data-video-preview]").style.display = "none";
      let src = e.target
         .closest("[data-video] > div > div")
         .lastElementChild.lastElementChild.getAttribute("data-src-video");
      e.target
         .closest("[data-video] > div > div")
         .lastElementChild.lastElementChild.setAttribute("src", `${src}?rel=0&autoplay=1`);
   } else if (e.target.closest("[data-video-close]")) {
      let src = e.target
         .closest("[data-video] > div > div")
         .lastElementChild.lastElementChild.getAttribute("data-src-video");
      e.target
         .closest("[data-video] > div > div")
         .lastElementChild.lastElementChild.setAttribute("src", `${src}?rel=0&autoplay=0`);
   } else if (
      e.target.closest("[data-video]").classList.contains("active") &&
      !e.target.closest("[data-video] > div > div")
   ) {
      let src = e.target
         .closest("[data-video] > div")
         .firstElementChild.lastElementChild.lastElementChild.getAttribute("data-src-video");
      e.target
         .closest("[data-video] > div")
         .firstElementChild.lastElementChild.lastElementChild.setAttribute("src", `${src}?rel=0&autoplay=0`);
   }
}
