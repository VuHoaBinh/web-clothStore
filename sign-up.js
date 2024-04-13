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
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const result = await firebase.register(email, password);

        // Update the user's display name
        await firebase.update(displayName);

        const user = result.user;
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    }

    document.getElementById("sign-up-form").addEventListener("submit", signUp);
  }
}
onAuthStateChanged(firebase.auth, handleAuthStateChanged);
