import { Firebase } from "./class/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebase = new Firebase();

const cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
document.getElementById("product-count").innerHTML = cart?.length || 0;

function handleAuthStateChanged(user) {
  if (user) {
    console.log("User ĐÃ ĐĂNG NHẬP", user);

    document.getElementById("user-actions").innerHTML = `
      <div class="dropdown text-end">
        <a
          href="#"
          class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt="mdo"
            width="32"
            height="32"
            class="rounded-circle"
          />
        </a>
        <ul class="dropdown-menu text-small" style="">
          <li>
            <a class="dropdown-item" href="#">Xin chào ${user.displayName}</a>
          </li>
          <li>
            <a class="dropdown-item" href="#"> ${user.email}</a>
          </li>

          <li><a class="dropdown-item" href="#" id="sign-out-btn">Đăng xuất</a></li>
        </ul>
      </div>
    `;

    function handleLogout() {
      firebase.logout();
    }

    document
      .getElementById("sign-out-btn")
      .addEventListener("click", handleLogout);
  } else {
    console.log("CHƯA ĐĂNG NHẬP");
    document.getElementById("user-actions").innerHTML = `
      <a type="button" class="btn btn-primary me-2" href="./sign-in.html">Login</a>
      <a type="button" class="btn btn-success" href="./sign-up.html">Sign-up</a>
    `;
  }
}

onAuthStateChanged(firebase.auth, handleAuthStateChanged);

const result = await axios.get(
  "https://661aaae365444945d04e42f0.mockapi.io/products"
);

const products = result.data;

function addToCart(productId) {
  const product = products.find(function (item) {
    return item.id === productId;
  });

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("product-count").innerHTML = cart.length;
  console.log(cart);
}

window.addToCart = addToCart;

let htmlString = "";

for (let index = 0; index < products.length; index++) {
  const product = products[index];

  htmlString =
    htmlString +
    `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card my-2">
          <img
            src="${product.imgUrl}"
            class="card-img-top"
          />
          <div class="card-body">
            <h5 class="card-title" style="height: 50px;">${product.name}</h5>
            <button class="btn btn-warning" onclick = "addToCart(${product.id})">Thêm sản phẩm</button>
          </div>
        </div>
      </div>
    `;
}

document.getElementById("product-list").innerHTML = htmlString;

const cardData = [
  {
    title: "IPhone 2025",
    originalPrice: "2.600.000",
    discountedPrice: "2.200.000",
    imgUrl:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png",
  },
];

function createCard(cardInfo) {
  const card = document.createElement("div");
  card.classList.add("card", "mb-3");

  const row = document.createElement("div");
  row.classList.add("row", "g-0");

  const colImg = document.createElement("div");
  colImg.classList.add("col-md-4");

  const img = document.createElement("img");
  img.src = cardInfo.imgUrl;
  img.classList.add("img-fluid", "rounded-start");
  img.alt = "...";

  const colBody = document.createElement("div");
  colBody.classList.add("col-md-8");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = cardInfo.title;

  const priceWrapper = document.createElement("div");

  const originalPrice = document.createElement("p");
  originalPrice.classList.add(
    "my-1",
    "text-decoration-line-through",
    "fst-italic"
  );
  originalPrice.textContent = cardInfo.originalPrice;

  const discountedPrice = document.createElement("p");
  discountedPrice.classList.add("my-1", "text-danger", "fw-bold");
  discountedPrice.textContent = cardInfo.discountedPrice;

  card.appendChild(row);
  row.appendChild(colImg);
  colImg.appendChild(img);
  row.appendChild(colBody);
  colBody.appendChild(cardBody);
  cardBody.appendChild(title);
  cardBody.appendChild(priceWrapper);
  priceWrapper.appendChild(originalPrice);
  priceWrapper.appendChild(discountedPrice);

  return card;
}

function addCardsToDOM() {
  const cardContainer = document.getElementById("card-container");

  cardData.forEach((cardInfo) => {
    const card = createCard(cardInfo);
    cardContainer.appendChild(card);
  });
}

addCardsToDOM();
