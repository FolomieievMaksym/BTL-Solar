// Базовые стили для спойлера
document.querySelectorAll("[data-spoiler]").forEach((el) => {
   el.parentElement.addEventListener("click", toggleSpoiler);
   // el.children[0].style.cursor = "pointer";
   // el.children[1].style.height = "0px";
   // el.children[1].style.overflow = "hidden";
   // el.children[1].style.transition = "height 0.5s ease";
});

// ? Если нужно открыть спойлер при загрузке страницы - нужно добавить класс 'opened' к элементу data-spoiler
if (document.querySelector("[data-spoiler].opened")) {
   document.querySelectorAll("[data-spoiler].opened").forEach((el) => {
      el.children[1].style.height = el.children[1].scrollHeight + "px";
   });
}

function toggleSpoiler(e) {
   if (e.target.closest("[data-spoiler]  > div:first-child")) {
      if (e.target.closest("[data-spoiler]").classList.contains("opened")) {
         e.target.closest("[data-spoiler]").children[1].style.height = "0px";
         e.target.closest("[data-spoiler]").classList.remove("opened");
      } else {
         e.target.closest("[data-spoiler]").children[1].style.height =
            e.target.closest("[data-spoiler]").children[1].scrollHeight + "px";
         e.target.closest("[data-spoiler]").classList.add("opened");
      }
   }
}
