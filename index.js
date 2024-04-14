import { Firebase } from "./class/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebase = new Firebase();

const cart = JSON.parse(localStorage.getItem("cart")) || [];

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
      <a type="button" class="btn btn-success" href="./sign-in.html">Sign-up</a>
    `;
  }
}

onAuthStateChanged(firebase.auth, handleAuthStateChanged);

const result = await axios.get(
  "https://661aaae365444945d04e42f0.mockapi.io/products"
);

const products = result.data;

// display item have choice
function renderCart(data) {
  let htmlString = "";

  for (let index = 0; index < data.length; index++) {
    const product = data[index];

    htmlString =
      htmlString +
      `
        <div class="card mb-3">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                <div>
                  <img
                    src="${product.imgUrl}"
                    class="img-fluid rounded-3"
                    alt="Shopping item"
                    style="width: 65px"
                  />
                </div>
                <div class="ms-3">
                  <h5>${product.name}</h5>
                </div>
              </div>
              <div class="d-flex flex-row align-items-center">
                <div style="width: 80px">
                  <h5 class="mb-0">$${product.salePrice}</h5>
                </div>
                <a href="#!" style="color: #cecece"
                  ><i class="fas fa-trash-alt" onclick="removeItem(${index})"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      `;
  }
  document.getElementById("cart-body").innerHTML = htmlString;

  if (data.length === 0) {
    document.getElementById("cart-body").innerHTML = `
    <div class="text-center">
    <h3>Nothing :))) You must 10 items in here!!! Now </h3>
    </div>`;
  }

  totalPrice(data);
}

renderCart(cart);

// add
function addToCart(productId) {
  const product = products.find(function (item) {
    return item.id === productId;
  });

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("product-count").innerHTML = cart.length;
  renderCart(cart);
  console.log(cart);
}

window.addToCart = addToCart;

// remove
function removeItem(id) {
  cart.splice(id, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("product-count").innerHTML = cart.length;
  renderCart(cart);
  console.log(cart);
}

window.removeItem = removeItem;

// total price
function totalPrice(data) {
  let total = 0;
  for (let index = 0; index < data.length; index++) {
    total = total + parseFloat(data[index].salePrice);
  }
  document.getElementById("totalPrice").innerHTML = `$${total}`;
}

window.removeItem = removeItem;

function payment(event) {
  event.preventDefault();
  localStorage.clear();

  window.location.reload();
  alert("Thanks for visiting");
}

document.getElementById("paymentButton").addEventListener("click", payment);

// display items
let htmlString = "";

for (let index = 0; index < products.length; index++) {
  const product = products[index];

  htmlString =
    htmlString +
    `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card my-2">
          <img src="${product.imgUrl}" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title" style="height: 50px;">${product.name}</h5>
            <span class="price text-decoration-line-through"
              >Price origin: $${product.price}</span
            >
            <span class="salePrice">Price: $${product.salePrice}</span>
          </div>
          <span class = "name_cart">Add to Cart </span>
          <button
            class="btn btn-warning btn-addItem"
            onclick="addToCart(${product.id})"
          >
            <i class="fa-solid fa-plus" ></i>
          </button>
        </div>
      </div>
    `;
}

document.getElementById("product-list").innerHTML = htmlString;

// banner slick slide
let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let thumbnails = document.querySelectorAll(".thumbnail .item");

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function () {
  itemActive = itemActive + 1;
  if (itemActive >= countItem) {
    itemActive = 0;
  }
  showSlider();
};

//event prev click
prev.onclick = function () {
  itemActive = itemActive - 1;
  if (itemActive < 0) {
    itemActive = countItem - 1;
  }
  showSlider();
};
// auto run slider
let refreshInterval = setInterval(() => {
  next.click();
}, 1000);

function showSlider() {
  // remove item active old
  let itemActiveOld = document.querySelector(".slider .list .item.active");
  let thumbnailActiveOld = document.querySelector(".thumbnail .item.active");
  itemActiveOld.classList.remove("active");
  thumbnailActiveOld.classList.remove("active");

  // active new item
  items[itemActive].classList.add("active");
  thumbnails[itemActive].classList.add("active");

  // clear auto time run slider
  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 5000);
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    itemActive = index;
    showSlider();
  });
});
