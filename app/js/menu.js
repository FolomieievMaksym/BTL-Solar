const body = document.querySelector("body");
const header = document.querySelector(".header");
const menu = document.querySelector(".header__right");
const burger = document.querySelector(".burger");
if (window.innerWidth < 769) {
   menu.style.top = header.scrollHeight + "px";
   menu.style.height = `calc(100vh - ${header.scrollHeight}px)`;
}
// ! Burger

body.addEventListener("click", burgerToggle);
function burgerToggle(e) {
   if (e.target.closest(".burger")) {
      if (burger.classList.contains("active")) {
         closeBurger();
      } else {
         openBurger();
      }
   } else if (!e.target.closest(".burger")) {
      closeBurger();
   }
}
function openBurger() {
   body.classList.add("lock");
   header.classList.add("active");
   menu.classList.add("active");
   burger.classList.add("active");
   window.addEventListener("scroll", closeBurger);
}
function closeBurger() {
   body.classList.remove("lock");
   header.classList.remove("active");
   menu.classList.remove("active");
   burger.classList.remove("active");
   window.removeEventListener("scroll", closeBurger);
}

// ! <main></main>
document.querySelector(".hero__container").style.paddingTop = header.scrollHeight + "px";

// ! Header

const headerToHide = document.querySelectorAll("[data-to-hide]");
headerToHide.forEach((el) => {
   el.style.overflow = "hidden";
   el.style.transition = "height 0.3s ease 0s";
});

window.addEventListener("scroll", hideHeaderPart);
hideHeaderPart();
function hideHeaderPart() {
   if (window.pageYOffset > header.scrollHeight / 2) {
      headerToHide.forEach((el) => {
         el.style.height = "0px";
      });
      header.style.opacity = "0.95";
   } else if (window.pageYOffset < header.scrollHeight) {
      headerToHide.forEach((el) => {
         el.style.height = el.scrollHeight + "px";
      });
      header.style.opacity = "1";
   }
}
