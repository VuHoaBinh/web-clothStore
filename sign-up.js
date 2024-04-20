import { Firebase } from "./class/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
const firebase = new Firebase();

function handleAuthStateChanged(user) {
  if (user) {
    window.location.href = "index.html";
  } else {
    document.body.style.background =
      "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)";
    document.body.style.opacity = 1;

    async function signUp(e) {
      e.preventDefault();

      const displayName = document.getElementById("displayName").value;
      const email = document.getElementById("emailSignUp").value;
      const password = document.getElementById("passwordSignUp").value;
      console.log(displayName, email, password);

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        Swal.fire({
          title: "Đăng kí thất bại",
          text: "Please enter a valid email address.",
          icon: "error",
        });
        return;
      }
      try {
        const result = await firebase.register(email, password);
        Swal.fire({
          title: "Đăng kí thành công",
          text: "Welcome to my website",
          icon: "success",
        });

        // Update the user's display name
        await firebase.update(displayName);

        const user = result.user;
        console.log(user);
      } catch (error) {
        Swal.fire({
          title: "Đăng kí thất bại",
          text: error.message,
          icon: "error",
        });
        console.log(error);
      }
    }

    document.getElementById("sign-up-form").addEventListener("submit", signUp);
  }
}
onAuthStateChanged(firebase.auth, handleAuthStateChanged);
