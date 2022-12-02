if (document.querySelectorAll("[data-pop-up-open").length > 1) {
   document.querySelectorAll("[data-pop-up-open").forEach((el) => {
      el.addEventListener("click", showPopUp);
   });
} else if (document.querySelectorAll("[data-pop-up-open").length == 1) {
   document.querySelector("[data-pop-up-open").addEventListener("click", showPopUp);
}
function showPopUp(e) {
   if (e.target.closest("[data-pop-up-open]")) {
      e.target.closest("[data-pop-up-open]").nextElementSibling.classList.add("active");
      document.body.classList.add("lock");
   }
}

if (document.querySelectorAll("[data-pop-up").length > 1) {
   document.querySelectorAll("[data-pop-up").forEach((el) => {
      el.addEventListener("click", closePopUp);
   });
} else if (document.querySelectorAll("[data-pop-up").length == 1) {
   document.querySelector("[data-pop-up").addEventListener("click", closePopUp);
}
function closePopUp(e) {
   if (e.target.closest("[data-pop-up] [data-pop-up-close]")) {
      e.target.closest("[data-pop-up]").classList.remove("active");
      document.body.classList.remove("lock");
   } else if (
      !e.target.closest("[data-pop-up] > div > div") &&
      e.target.closest("[data-pop-up]").classList.contains("active")
   ) {
      e.target.closest("[data-pop-up]").classList.remove("active");
      document.body.classList.remove("lock");
   }
}
