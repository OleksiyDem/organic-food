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

  new Glide(".sec5-cards", {
    type: "carousel",
    startAt: 0,
    perView: 1,
  }).mount();

  // Скрипт до модальних вікон

  const btnIdsToOpenModal = ["sec-8-card-1-btn", "sec-8-card-2-btn"];
  const generalModalWrapper = document.querySelector(".modals-wrapper");
  // обирає усі кнопки що призначені для закриття модального вікна
  const closeModalBtns = document.querySelectorAll(".modal-close-btn");

  // методом forEach перебираємо масив що попередньо створили
  btnIdsToOpenModal.forEach((btnId) => {
    // зберігає у собі елемент кнопки з відповідним id, елемент обирається за допомогою метода getElementById
    const btnEl = document.getElementById(btnId);
    // зберігає у собі унікальний ідентифікатор модального вікна, яке має бути відкрито, до елементу btnEl застосовуємо метод getAttribute
    // і зберігаємо в змінну значення атрибуту data-modal-id
    const modalId = btnEl.getAttribute("data-modal-id");
    // зберігає у собі безпосередньо елемент вікна з контентом, за допомогою методу getElementById та змінної modalId отримуємо
    // цей елемент
    const modalEl = document.getElementById(modalId);

    //до кнопки встановлюємо слухач на подію click та всередині ф-ії прописуємо та що має відбутися під час кліку
    btnEl.addEventListener("click", function () {
      // додаємо клас .visible до загальної обгортки
      generalModalWrapper.classList.add("visible");
      // додаємо клас .visible до конкретного модального вікна
      modalEl.classList.add("visible");
      // обираємо елемент body та додаємо до нього клас .overflow - {overflow: hidden;}
      document.querySelector("body").classList.add("overflow");
    });
  });

  // до масиву значень який зберігає усі кнопки, признач. для закр. вікна застос. метод масиву forEach
  closeModalBtns.forEach((closeBtn) => {
    // до кожної кнопки додаємо спостерігача подій, що спрацьовує на клік
    closeBtn.addEventListener("click", function () {
      generalModalWrapper.classList.remove("visible");
      // удаляет класс "visible" с родительского элемента текущего элемента
      this.parentElement.classList.remove("visible");
      // прибирає з body клас .overflow
      document.querySelector("body").classList.remove("overflow");
    });
  });

  // ініціалізуємо роботу сервісу:
  (function () {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
      publicKey: "Yq2p1dRR7X8PohKkF",
    });
  })();

  // Налаштовуємо відправку форми по кліку на кнопку
  const formBtn = document.getElementById("form-submit");
  const emailField = document.getElementById("email-input");

  formBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const currentEmail = emailField.value;
    const isCurrentEmailValid = isEmailValid(currentEmail);

    if (isCurrentEmailValid) {
      emailjs.send("service_r3eclmp", "template_a70660p", {
        user_email: currentEmail,
      });
      alert("Thanks for subscribing!");
      emailField.value = ""; //clear form after submiting
    } else {
      alert("Please type correct email address!");
    }
  });

  // Додаємо функцію, що буде перевіряти true/false
  function isEmailValid(value) {
    const emailValidateRegExp =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    // метод test повертає true або false
    return emailValidateRegExp.test(value);
  }
});
