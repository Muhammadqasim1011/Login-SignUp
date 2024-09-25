const loginModal = document.getElementById("login-modal");
const signupModal = document.getElementById("signup-modal");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const closeLogin = document.getElementById("close-login");
const closeSignup = document.getElementById("close-signup");
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');
const loginSubmitBtn = document.getElementById('login-submit');
const signupSubmitBtn = document.getElementById('signup-submit');
const googleLoginBtn = document.getElementById('google-login-btn');
const googleSignupBtn = document.getElementById('google-signup-btn');
const logoutBtn = document.getElementById('logout-btn');

// Open modals
loginBtn.onclick = () => (loginModal.style.display = "block");
signupBtn.onclick = () => (signupModal.style.display = "block");

// Close modals
closeLogin.onclick = () => { loginModal.style.display = "none"; resetLoginForm(); };
closeSignup.onclick = () => { signupModal.style.display = "none"; resetSignupForm(); };
window.onclick = (event) => {
  if (event.target === loginModal) loginModal.style.display = "none";
  if (event.target === signupModal) signupModal.style.display = "none";
};

// Firebase initialization
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Event listeners
loginSubmitBtn.onclick = (e) => handleAuth(e, 'login');
signupSubmitBtn.onclick = (e) => handleAuth(e, 'signup');
googleLoginBtn.onclick = () => handleGoogleSignIn('login');
googleSignupBtn.onclick = () => handleGoogleSignIn('signup');
logoutBtn.onclick = () => signOut(auth).then(() => toggleUserContent(null));
onAuthStateChanged(auth, (user) => toggleUserContent(user));

// Auth functions
function handleAuth(e, action) {
  e.preventDefault();
  const email = action === 'login' ? loginEmailInput.value : signupEmailInput.value;
  const password = action === 'login' ? loginPasswordInput.value : signupPasswordInput.value;

  const authMethod = action === 'login' ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
  authMethod(auth, email, password)
    .then(({ user }) => {
      toggleUserContent(user);
      action === 'login' ? loginModal.style.display = 'none' : signupModal.style.display = 'none';
      resetLoginForm();
    })
    .catch(error => alert(error.message));
}

function handleGoogleSignIn(action) {
  signInWithPopup(auth, provider).then(({ user }) => {
    toggleUserContent(user);
    action === 'login' ? loginModal.style.display = 'none' : signupModal.style.display = 'none';
  }).catch(error => alert(error.message));
}

// Reset forms
function resetLoginForm() { loginEmailInput.value = ''; loginPasswordInput.value = ''; }
function resetSignupForm() { signupEmailInput.value = ''; signupPasswordInput.value = ''; }

// Toggle user content
function toggleUserContent(user) {
  const isLoggedIn = !!user;
  logoutBtn.style.display = isLoggedIn ? 'block' : 'none';
  loginBtn.style.display = isLoggedIn ? 'none' : 'block';
  signupBtn.style.display = isLoggedIn ? 'none' : 'block';
  document.getElementById('hero').style.display = isLoggedIn ? 'none' : 'flex';
  document.getElementById('training-section').style.display = isLoggedIn ? 'block' : 'none';
  document.getElementById('nutrition-section').style.display = isLoggedIn ? 'block' : 'none';

  const userNameDisplay = document.getElementById('user-name');
  if (isLoggedIn) {
    const userName = user.email.split('@')[0];
    if (!userNameDisplay) {
      createUserNameDisplay(userName);
    } else {
      userNameDisplay.textContent = userName;
    }
    displayUserPhoto(user.photoURL);
  } else {
    userNameDisplay?.remove();
    document.getElementById('user-photo')?.remove(); // Remove user photo if logged out
  }
}

// Create display elements
function createUserNameDisplay(userName) {
  const newUserNameDisplay = document.createElement('p');
  newUserNameDisplay.id = 'user-name';
  newUserNameDisplay.textContent = userName;
  document.querySelector('nav ul').appendChild(newUserNameDisplay);
}

function displayUserPhoto(photoURL) {
  const userPhotoDisplay = document.getElementById('user-photo') || document.createElement('img');
  userPhotoDisplay.id = 'user-photo';
  userPhotoDisplay.src = photoURL || '/assets/user.png'; // Default photo
  document.querySelector('nav ul').appendChild(userPhotoDisplay);
}
