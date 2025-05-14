document.addEventListener("DOMContentLoaded", function () {
  // DOMContentLoaded - тип події який спрацьовує коли весь HTML код завантажено та проаналізовано, але ресурси по типу зображень,
  // стилів, шрифтів ще не завантажені
  const burgerBtn = document.querySelector("header button.burger");
  const burgerBtnIcons = document.querySelectorAll("header button.burger img");

  burgerBtn.addEventListener("click", function () {
    burgerBtnIcons.forEach((icon) => {
      icon.classList.toggle("hidden");
    });
    document
      .querySelector("header .mobile-menu .nav")
      .classList.toggle("visible");
  });
  const searchBtn = document.querySelector("header button.search-btn");

  searchBtn.addEventListener("click", function () {
    document
      .querySelector("header .mobile-menu .features .search")
      .classList.toggle("expanded");
  });

  // JS розгортання прихованих карток

  // 1. оголошення змінних

  // змінна отримує елемент з ідентифікатором load-more-cards (кнопку розгортання/згортання)
  const loadMoreProductCards = document.getElementById("load-more-cards");
  // містить колекцію всіх карток продуктів
  const productCards = document.querySelectorAll(".sec-4-card");
  // змінна що зберігає кількість карток, які є видимими на сторінці на момент виконання коду
  let visibleCards = getVisibleCardValue();
  // містить поточну кількість активних видимих карток
  let activeVisibleCards = visibleCards;
  // визначає скільки карток буде відкрито за 1 раз
  let cardToOpen = visibleCards / 2;

  // 2. Написання допоміжних функцій

  // обчислює к-ть карток які зараз видимі на сторінці
  function getVisibleCardValue() {
    return Array.from(productCards).filter(
      (card) => getComputedStyle(card).display !== "none"
    ).length;
  }
  // дозволяє обмежити частоту виклику іншої функції
  function debounce(func, wait = 100) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, arguments);
      }, wait);
    };
  }

  // 3. Функція відкриття карток

  // використовується для керування видимості карток на сторінці
  // обчислює кількість карток, які потрібно показати, показує відповідну к-ть карток на сторінці
  // оновлює стан кнопки в залежності від того чи потрібно показувати більше карток, або вже
  // немає карток для завантаження
  function showCards() {
    const remainingCards = productCards.length - activeVisibleCards;
    const cardsToShow = Math.min(cardToOpen, remainingCards);

    for (
      let i = activeVisibleCards;
      i < activeVisibleCards + cardsToShow && i < productCards.length;
      i++
    ) {
      productCards[i].style.display = "block";
    }

    activeVisibleCards += cardsToShow;

    if (activeVisibleCards >= productCards.length) {
      loadMoreProductCards.querySelector("span").textContent = "Load Less";
    }
  }

  // 4. Функція закриття карток
  // зворотній процес
  function hideCards() {
    activeVisibleCards = visibleCards;

    for (let i = productCards.length - 1; i >= visibleCards; i--) {
      productCards[i].style.display = "none";
    }

    loadMoreProductCards.querySelector("span").textContent = "Load More";
    // автоматична прокрутка до початку блоку з картками
    const offset = 60;
    const section = document.querySelector(".sec-4");
    const sectionPosition =
      section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: sectionPosition + offset,
      // робить прокручування плавним
      behavior: "smooth",
    });
  }
  // 5. Слухання подій

  // додає слухача подій на зміну розміру екрану браузера
  window.addEventListener(
    "resize",
    debounce(() => {
      visibleCards = getVisibleCardValue();
      activeVisibleCards = visibleCards;
      cardToOpen = visibleCards / 2;
    }, 200)
  );

  // додаємо слухача події click до елементу loadMoreProductCards
  loadMoreProductCards.addEventListener("click", function () {
    if (activeVisibleCards < productCards.length) {
      showCards();
    } else {
      hideCards();
    }
  });
});
