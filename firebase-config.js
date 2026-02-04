// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyA7F0JbTqI5THGUQnqp7_BSBALAQQeIAk",
    authDomain: "testsystem-2056d.firebaseapp.com",
    projectId: "testsystem-2056d",
    storageBucket: "testsystem-2056d.firebasestorage.app",
    messagingSenderId: "1085110426660",
    appId: "1:1085110426660:web:48af6f7864bc567f536ccb1",
    measurementId: "G-T978JSMQZ3"
};

// 初始化 Firebase
function initFirebase() {
    try {
        if (typeof firebase !== 'undefined') {
            if (!firebase.apps.length) {
                const app = firebase.initializeApp(firebaseConfig);
                console.log('Firebase 已初始化');
                return app;
            }
            return firebase.app();
        }
        console.warn('Firebase SDK 未加載');
        return null;
    } catch (error) {
        console.error('初始化錯誤:', error);
        return null;
    }
}

// Google 登入函數
async function loginWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        return result.user;
    } catch (error) {
        console.error('登入錯誤:', error);
        throw error;
    }
}

// 暴露給全域
window.firebaseApp = {
    config: firebaseConfig,
    init: initFirebase,
    loginWithGoogle: loginWithGoogle,
    getAuth: () => firebase?.auth(),
    logout: () => firebase?.auth()?.signOut()
};

// 自動初始化
document.addEventListener('DOMContentLoaded', function() {
    if (typeof firebase !== 'undefined') {
        initFirebase();
    }
});
