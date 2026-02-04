// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyA7F0JbTqI5THGUQnqp7_BSBALAQQeIAk",
    authDomain: "testsystem-2056d.firebaseapp.com",
    projectId: "testsystem-2056d",
    storageBucket: "testsystem-2056d.firebasestorage.app",
    messagingSenderId: "1085110426660",
    appId: "1:1085110426660:web:48af6f7864bc567f536ccb1"
};

// 初始化 Firebase
function initializeFirebase() {
    try {
        if (typeof firebase !== 'undefined') {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
                console.log('Firebase 初始化成功');
            }
            return true;
        }
        return false;
    } catch (error) {
        console.error('Firebase 初始化錯誤:', error);
        return false;
    }
}

// 暴露給全域
window.initializeFirebase = initializeFirebase;

// 自動初始化
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeFirebase, 100);
});
