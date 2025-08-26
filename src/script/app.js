// Підготовка масиву з інформацією для створення карток
const productInfo = [
  {
    id: 1,
    category: "Vegetable",
    imgSrc: "./assets/images/product-photo-1.png",
    title: "Calabrese Broccoli",
    price: "$20.00",
    discountPrice: "$13.00",
    rating: 4.7,
  },
  {
    id: 2,
    category: "Fresh",
    imgSrc: "./assets/images/product-photo-2.png",
    title: "Fresh Banana Fruits",
    price: "$20.00",
    discountPrice: "$14.00",
    rating: 5,
  },
  {
    id: 3,
    category: "Millets",
    imgSrc: "./assets/images/product-photo-3.png",
    title: "White Nuts",
    price: "$20.00",
    discountPrice: "$15.00",
    rating: 4.5,
  },
  {
    id: 4,
    category: "Vegetable",
    imgSrc: "./assets/images/product-photo-4.png",
    title: "Vegan Red Tomato",
    price: "$20.00",
    discountPrice: "$17.00",
    rating: 4,
  },
  {
    id: 5,
    category: "Health",
    imgSrc: "./assets/images/product-photo-5.png",
    title: "Mung Bean",
    price: "$20.00",
    discountPrice: "$11.00",
    rating: 3.3,
  },
  {
    id: 6,
    category: "Nuts",
    imgSrc: "./assets/images/product-photo-6.png",
    title: "Brown Hazelnut",
    price: "$20.00",
    discountPrice: "$12.00",
    rating: 4.6,
  },
  {
    id: 7,
    category: "Fresh",
    imgSrc: "./assets/images/product-photo-7.png",
    title: "Eggs",
    price: "$20.00",
    discountPrice: "$17.00",
    rating: 4.3,
  },
  {
    id: 8,
    category: "Fresh",
    imgSrc: "./assets/images/product-photo-8.png",
    title: "Zelco Suji Elaichi Rusk",
    price: "$20.00",
    discountPrice: "$15.00",
    rating: 4.7,
  },
  {
    id: 9,
    category: "Fruit",
    imgSrc: "./assets/images/product-photo-9.png",
    title: "Organic Apples",
    price: "$25.00",
    discountPrice: "$20.00",
    rating: 4.9,
  },
  {
    id: 10,
    category: "Dairy",
    imgSrc: "./assets/images/product-photo-10.png",
    title: "Greek Yogurt",
    price: "$15.00",
    discountPrice: "$10.00",
    rating: 4.8,
  },
  {
    id: 11,
    category: "Vegetable",
    imgSrc: "./assets/images/product-photo-11.png",
    title: "Fresh Spinach",
    price: "$18.00",
    discountPrice: "$12.00",
    rating: 4.6,
  },
  {
    id: 12,
    category: "Grains",
    imgSrc: "./assets/images/product-photo-12.png",
    title: "Brown Rice",
    price: "$22.00",
    discountPrice: "$16.00",
    rating: 4.4,
  },
  {
    id: 13,
    category: "Herbs",
    imgSrc: "./assets/images/product-photo-13.png",
    title: "Fresh Basil",
    price: "$10.00",
    discountPrice: "$8.00",
    rating: 4.7,
  },
  {
    id: 14,
    category: "Snack",
    imgSrc: "./assets/images/product-photo-14.png",
    title: "Trail Mix",
    price: "$18.00",
    discountPrice: "$14.00",
    rating: 4.5,
  },
  {
    id: 15,
    category: "Beverage",
    imgSrc: "./assets/images/product-photo-15.png",
    title: "Green Tea",
    price: "$12.00",
    discountPrice: "$9.00",
    rating: 4.8,
  },
  {
    id: 16,
    category: "Frozen",
    imgSrc: "./assets/images/product-photo-16.png",
    title: "Frozen Berries",
    price: "$15.00",
    discountPrice: "$11.00",
    rating: 4.6,
  },
];

document.addEventListener("DOMContentLoaded", function () {
  // DOMContentLoaded - тип події який спрацьовує коли весь HTML код завантажено та проаналізовано, але ресурси по типу зображень,
  // стилів, шрифтів ще не завантажені

  // Функція створення картки

  //1. функція що створює окрему картку
  function createProductCard(product, classOfSection) {
    // обчислює ширину активного рейтингу у %-у співвідношенні
    // далі у span class="active" обмежує span по ширині, візуально виокремлюючи його для користувача
    const activeRatingWidth = (product.rating * 100) / 5;
    return `
        <div class="sec-${classOfSection}-card product-card" data-product-id="${product.id}">
          <p class="badge">${product.category}</p>
          <div class="photo">
            <img src="${product.imgSrc}">
          </div>
          <p class="title">${product.title}</p>
          <div class="info df align-e justify-b">
            <p class="price">
              <span class="full">${product.price}</span>
              <span class="discount">${product.discountPrice}</span>
            </p>
            <div class="rating">
              <span class="default">★★★★★</span>
              <span class="active" style="width: ${activeRatingWidth}%">★★★★★</span> 
            </div>
          </div>
          <a href="#" class="buy">Add to cart</a>
        </div>
      `;
  }
  // 2. Рендер карток

  // функція, що відповідає за відображення карток продуктів у вказаному контейнері, вона приймає 3 аргументи:
  // productContainer - HTML елемент у якому будуть додаватись картки продуктів
  // products - масив об'єктів Де кожен об'єкт представляє продукт із властивостями такими як ID category, imgSrc, title, price, discountPrice, rating
  // classOfSection - числове значення що передає номер секції для створення динамічного класу картки продукту
  function renderProducts(productContainer, products, classOfSection) {
    // для кожного продукту з масиву products функція викликає допоміжну функцію createProductCard,
    // яка генерує html код картки на основі властивостей поточного продукту та значення classOfSection
    products.forEach((product) => {
      // змінна productCard в результаті виклику createProductCard для кожного продукту створюється HTML рядок із розміткою
      // який зберігається у змінній productCard. Потім кожна створена картка додається до контейнера через.innerHTML += productCard,
      // це призводить до послідовного оновлення html-коду контейнера та відображення усіх продуктів на сторінці
      const productCard = createProductCard(product, classOfSection);

      productContainer.innerHTML += productCard;
    });
  }
  // після створення цієї функції за її межами зберігаємо дві змінні для двох загальних контейнерів із картками:

  // зберігає секцію з класом .sec-4-cards
  const mainProductContainer = document.querySelector(".sec-4-cards");
  // зберігає секцію з класом .sec-6-cards
  const anotherProductContainer = document.querySelector(".sec-6-cards");

  // Врешті - решт викликаємо функцію з правильними аргументами
  // для заповнення картками блоку в секц. 4 викликаємо renderProducts з аргументами:
  // mainProductContainer - посилання на html контейнер з класом .sec-4-cards
  // productInfo - масив об'єктів продуктів
  // 4 - числове значення для аргументу classOfSection яке буде використано для правильної побудови класу картки продукту
  renderProducts(mainProductContainer, productInfo, 4);
  // productInfo.slice(5, 9) - відрізок масиву productInfo, який вибирає продукти починаючи з індексу 5 та закін. 8 (4 продукти)
  renderProducts(anotherProductContainer, productInfo.slice(5, 9), 6);

  // Бургер меню
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

  const btnIdsToOpenModal = [
    "sec-8-card-1-btn",
    "sec-8-card-2-btn",
    "cart-modal-btn",
  ];
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

      if (modalId === "cart-modal") {
        displaySelectedProducts();
      }
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

  // Використання бібілотеки Awesome Notifications library в скрипті проєкту
  const notifier = new AWN({
    position: "top-right",
    maxNotifications: 3,
  });

  formBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const currentEmail = emailField.value;
    const isCurrentEmailValid = isEmailValid(currentEmail);

    if (isCurrentEmailValid) {
      emailjs.send("service_r3eclmp", "template_a70660p", {
        user_email: currentEmail,
      });
      notifier.success("Thanks for subscribing!", {
        durations: { success: 2000 },
      });
      emailField.value = ""; //clear form after submiting
    } else {
      notifier.alert("Please type correct email address!", {
        durations: { alert: 2000 },
      });
    }
  });

  // Додаємо функцію, що буде перевіряти true/false
  function isEmailValid(value) {
    const emailValidateRegExp =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    // метод test повертає true або false
    return emailValidateRegExp.test(value);
  }

  // Скрипт для збереження інформації про обрані продукти

  // Збереження у зміні необхідної інформації
  let selectedProducts =
    // JSON.parse перетворює дані рядка на масив, якщо дані не знайдені - повертається порожній масив
    JSON.parse(localStorage.getItem("selectedProducts")) || [];
  // Зміна містить всі кнопки з класом buy у середині карток продуктів на сторінці
  const allBuyButtons = document.querySelectorAll(".product-card .buy");

  // Функція, що контролює оновлення зовнішнього вигляду сторінки в залежності від продуктів, що зберігаються в localStorage
  function updateCartValueIndicators() {
    // Створюємо змінні всередині функції отримуємо поточні обрані продукти з Local Storage та зберігаємо елемент на сторінці
    //  що є індикатором кількості продуктів в корзині
    const allSelectedProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];
    const cartCountElement = document.querySelector("header .cart p span");
    // Оновлюємо наповнення обраного елемента за допомогою властивості textContent присвоюючи їй довжину масиву отриманого з Local Storage
    cartCountElement.textContent = allSelectedProducts.length;

    // Використовуємо метод forEach для проходження по всіх елементах збережених в allBuyButtons для кожної кнопки перевіряється чи
    // відповідає вона продукту що вже доданий в корзину і змінюється її стан наступним чином:
    // Отримується data-product-id для кожної картки продукту до якої належить кнопка це дозволяє ідентифікувати продукт за його унікальним productId
    allBuyButtons.forEach((buyBtn) => {
      const productId = buyBtn.parentElement.getAttribute("data-product-id");
      // Потім до елементу застосовується метод toggle для додавання або видалення класу active
      // клас додається якщо productId присутній, інакше клас active видаляється
      buyBtn.classList.toggle(
        "active",
        allSelectedProducts.includes(productId)
      );
    });
  }

  // Функція, що контролює подію кліку на кнопку в продуктовій картці «Add to cart :
  // Наступним етапом буде Створення ф-ії handleBuyButtonClick, яка обробляє кліки на кнопці Buy та приймає один аргумент - об'єкт event.
  // План функції наступний: оскільки при версті Було використано тег <a> - Клік по ньому зазвичай викликає перезавантаження сторінки
  // Щоб цього уникнути викликаємо в об'єкті event метод preventDefault, що зупиняє стандартну дію браузера
  function handleBuyButtonClick(event) {
    event.preventDefault();

    // отримуємо унікальний ідентифікатор продукту з атрибутом data-product-id, який знаходиться на батьківському елементі кнопки.
    const productId = this.parentElement.getAttribute("data-product-id");
    // Використовуємо метод toggle щоб додати клас Active до кнопки якщо він відсутній або ж видалити його якщо він вже присутній
    this.classList.toggle("active");

    // оновлюємо масив selected product в залежності від стану кнопки
    // якщо клас active присутній - додаємо ідентифікатор продукту в масив selectedProducts за допомогою Push
    // якщо клас відсутній - оновлюємо масив використовуючи Filter щоб видалити з нього ідентифікатор поточного продукту
    if (this.classList.contains("active")) {
      selectedProducts.push(productId);
    } else {
      selectedProducts = selectedProducts.filter((id) => id !== productId);
    }

    // Надалі зберігаємо оновлений масив localStorage, для цього перетворюємо його У рядок використовуючи JSON.stringify
    // останньою викликаємо функцію updateCartValueIndicators щоб оновити інформацію на сторінці зокрема значення загального індикатора
    // Отже ця функція допомагає синхронізувати відображення кнопок та індикаторів з даними в localStorage
    // дозволяючи користувачам бачити актуальну інформацію про додані продукти
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    updateCartValueIndicators();
  }

  // Створ. допоміжну функцію getProductNameById яка повертає назву продукту на основі його унікального ідентифікатора productId
  // або ж повідомлення про те що назви не знайдено на випадок помилки. Для пошуку продукту за ідентифікатором використовується метод find
  // до масиву productInfo, який шукає перший Об'єкт де ID продукту дорівнює переданому значенню productId
  // find повертає відповідний об'єкт продукту якщо знайде збіг, або undefined якщо такого продукту немає в масиві
  // Якщо продукт знайдено - функція повертає його назву, іначе повертає рядок "Unknown Product"
  function getProductNameById(productId) {
    const product = productInfo.find((p) => p.id == productId);
    return product ? product.title : "Unknown Product";
  }

  // Ф - я відображає список вибраних продуктів в модальному вікні корзини

  // Її логіка наступна спочатку функція отримує посилання на елемент ul у модальному вікні з ID cart-modal і
  // очищує його вміст, надалі перевизначає innerHTML значенням згенерованого HTML рядка. Генерація елементів списку для кожного продукту полягає
  // у тому що функція проходить по кожному productId масиву selectedProducts. Для кожного productId отримує назву продукту викликаючи
  // getProductNameById з аргументом productId Формує html код для Кожного елемента li з унікальним атрибутом data-product-id для відстеження
  // ідентифікатора. Елемент li включає span з назвою продукту та іконку видалення, стилізовану за допомогою класу фонд оосу та кольору решітка 274 c5b
  // Масив HTML рядків з'єднується в один загальний рядок за допомогою метода join з пустим рядком в якості аргументу щоб уникнути ком з елементами
  // і цей загальний рядок присвоюється у productList.innerHTML
  function displaySelectedProducts() {
    const productList = document.querySelector("#cart-modal ul");
    productList.innerHTML = selectedProducts
      .map((productId) => {
        const productName = getProductNameById(productId);
        return `
        <li data-product-id="${productId}">
          <span>${productName}</span>
          <i class="fa-regular fa-circle-xmark fa-lg" style="color: #274c5b;"></i>
        </li>
      `;
      })
      .join("");

    // Після створення списку функція проходить по масиву selectedProducts знову щоб додати обробник подій на іконки видалення для кожного
    // productId знаходить відповідний елемент лі в productList за допомогою querySelector використовуючи атрибут data-product-id
    // додає обробник події Клік до Кожного елемента лі який при натисканні викликає функцію з аргументом productId для видалення продукту з корзини
    selectedProducts.forEach((productId) => {
      const listItem = productList.querySelector(
        `li[data-product-id="${productId}"]`
      );
      listItem.addEventListener("click", () =>
        removeProductFromList(productId)
      );
    });
  }

  // Останнім етапом в рамках цього скрипту створимо вищезгадану функцію removeProductFromList яка приймає один аргумент зі значенням
  // унікального ідентифікатора продукту для видалення, а саме оновлюємо масив selectedProducts, використовуючи метод Filter щоб створити
  // новий масив selectedProducts, який містить усі ідентифікатори продуктів крім того що був переданий у функцію як productId
  // Таким чином продукт із зазначеним productId видаляється з масиву selectedProducts. Зберігаємо оновлені дані у Local Storage під тим же
  // ключем що застосовували і раніше, оновлюємо індикатори корзини викликаючи функцію updateCartValueIndicators
  // оновлюємо список обраних продуктів у модальному вікні корзини викликаючи функцію displaySelectedProducts
  function removeProductFromList(productId) {
    selectedProducts = selectedProducts.filter((id) => id !== productId);
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    updateCartValueIndicators();
    displaySelectedProducts();
  }

  // спочатку викликаємо функцію updateCartValueIndicators яка буде виконуватись одразу після завантаження сторінки. Це оновить індикатор
  // кількості товарів у корзині, далі використовуємо метод for each для масиву елементів allBuyButtons. для кожної кнопки додаємо обробник події на Клік що
  // викликає раніше створену функцію handleBuyButtonClick Зверніть увагу що не потрібно викликати функцію вручну та додатково передавати її
  // аргумент, оскільки обробник події автоматично передасть необхідний об'єкт події
  updateCartValueIndicators();
  allBuyButtons.forEach((buyBtn) => {
    buyBtn.addEventListener("click", handleBuyButtonClick);
  });
});
