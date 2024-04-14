import { Firebase } from "./class/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
const firebase = new Firebase();
// bat duoc su kien khi nguoi dung submit form
// lay du lieu nguoi dung nhap vao
// gui len firebase de dang nhap
// neu dang nhap thanh cong thi chuyen huong ve trang chu,....

function handleAuthStateChanged(user) {
  if (user) {
    console.log("User is signed in.", user.displayName);
    // block user navigate to this page
    window.location.href = "index.html";
  } else {
    document.body.style.opacity = 1;

    async function signIn(e) {
      // chan su kien load trang
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // validation: kiem tra du lieu co hop le hay khong

      try {
        const result = await firebase.login(email, password);
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "Đăng kí thành công",
          text: "Welcome to my website",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Đăng kí thất bại",
          text: error.message,
          icon: "error",
        });
        console.log(error);
      }
    }

    document.getElementById("sign-in-form").addEventListener("submit", signIn);
  }
}

onAuthStateChanged(firebase.auth, handleAuthStateChanged);

const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});
