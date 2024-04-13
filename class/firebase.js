import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

export class Firebase {
  constructor() {
    this.firebaseConfig = {
      apiKey: "AIzaSyCsmc_Bzob_MMEHYEfvU-FhZzP-NaPBOhY",
      authDomain: "final-project-jsi09.firebaseapp.com",
      projectId: "final-project-jsi09",
      storageBucket: "final-project-jsi09.appspot.com",
      messagingSenderId: "1650737987",
      appId: "1:1650737987:web:66c054fb2c585c072b25f6",
    };

    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(this.app);
  }

  async login(email, password) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(email, password) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async update(displayName) {
    return await updateProfile(this.auth.currentUser, {
      displayName,
    });
  }

  async logout() {
    return await signOut(this.auth);
  }
}
