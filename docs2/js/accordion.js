// Базовые стили для элементов аккордеона
document.querySelectorAll("[data-accordion]").forEach((el) => {
   el.parentElement.addEventListener("click", toggleAccordion);
   // el.children[0].style.cursor = "pointer";
   // el.children[1].style.height = "0px";
   // el.children[1].style.overflow = "hidden";
   // el.children[1].style.transition = "height 0.5s ease";
});

// ? Если нужно открыть элемент аккордеона при загрузке страницы - нужно добавить класс 'opened' к элементу data-accordion
if (document.querySelector("[data-accordion].opened")) {
   document.querySelectorAll("[data-accordion].opened").forEach((el) => {
      el.children[1].style.height = el.children[1].scrollHeight + "px";
   });
}

function toggleAccordion(e) {
   if (e.target.closest("[data-accordion] > div:first-child")) {
      if (e.target.closest("[data-accordion]").classList.contains("opened")) {
         e.target.closest("[data-accordion]").classList.remove("opened");
         e.target.closest("[data-accordion]").children[1].style.height = "0px";
      } else {
         document.querySelectorAll("[data-accordion]").forEach(function (el) {
            el.classList.remove("opened");
            el.children[1].style.height = "0px";
         });
         e.target.closest("[data-accordion]").classList.toggle("opened");
         e.target.closest("[data-accordion]").children[1].style.height =
            e.target.closest("[data-accordion]").children[1].scrollHeight + "px";
      }
   }
}
