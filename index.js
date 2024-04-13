import { Firebase } from "./class/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebase = new Firebase();

const cartLocal = JSON.parse(localStorage.getItem("cart"));
console.log(cartLocal);
document.getElementById("product-count").innerHTML = cartLocal?.length || 0;

function handleAuthStateChanged(user) {
  if (user) {
    console.log("User da dang nhap", user);

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
    console.log("Chua dang nhap");
    document.getElementById("user-actions").innerHTML = `
      <a type="button" class="btn btn-outline-light me-2" href="./sign-in.html">Login</a>
      <a type="button" class="btn btn-warning" href="./sign-up.html">Sign-up</a>
    `;
  }
}

onAuthStateChanged(firebase.auth, handleAuthStateChanged);

const result = await axios.get(
  "https://6607c777a2a5dd477b136b02.mockapi.io/producuts"
);

const products = result.data;

let cart = [];

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
