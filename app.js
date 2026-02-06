// Import the required functions from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHaIeMD8WnFKtDuF08_5GseMC6S-OCCi0",
    authDomain: "project-7983367571690113440.firebaseapp.com",
    projectId: "project-7983367571690113440",
    storageBucket: "project-7983367571690113440.firebasestorage.app",
    messagingSenderId: "17335949650",
    appId: "1:17335949650:web:ef1f03971b2d0ee74f028b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Elements
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userInfo = document.getElementById('userInfo');
const nameDisplay = document.getElementById('name');
const profilePicture = document.getElementById('profilePicture');

// Login button click event
loginBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            displayUserInfo(user);
        })
        .catch((error) => {
            console.error("登录错误: ", error);
        });
});

// Logout button click event
logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        userInfo.style.display = 'none';
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }).catch((error) => {
        console.error("登出错误: ", error);
    });
});

// Display user information
function displayUserInfo(user) {
    nameDisplay.textContent = `姓名: ${user.displayName}`;
    profilePicture.src = user.photoURL;
    userInfo.style.display = 'block';
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
}

// Monitor authentication state
auth.onAuthStateChanged((user) => {
    if (user) {
        displayUserInfo(user);
    } else {
        userInfo.style.display = 'none';
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
});