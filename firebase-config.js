// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyA7F0JbTqI5THGUQnqp7_BSBALAQQeIAk",
    authDomain: "testsystem-2056d.firebaseapp.com",
    projectId: "testsystem-2056d",
    storageBucket: "testsystem-2056d.firebasestorage.app",
    messagingSenderId: "1085110426660",
    appId: "1:1085110426660:web:48af6f7864bc567f536ccb1"
};

// 簡單初始化
function initFirebase() {
    try {
        if (firebase && !firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            console.log('Firebase OK');
        }
    } catch (e) {
        console.log('Firebase error:', e);
    }
}

window.initFirebase = initFirebase;
