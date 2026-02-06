import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDHaIeMD8WnFKtDuF08_5GseMC6S-OCCi0",
    authDomain: "project-7983367571690113440.firebaseapp.com",
    projectId: "project-7983367571690113440",
    storageBucket: "project-7983367571690113440.firebasestorage.app",
    messagingSenderId: "17335949650",
    appId: "1:17335949650:web:ef1f03971b2d0ee74f028b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { 
    auth, 
    provider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    updateProfile 
};
