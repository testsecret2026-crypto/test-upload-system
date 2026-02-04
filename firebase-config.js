// firebase-config.js - 修正版
const firebaseConfig = {
    apiKey: "AIzaSyA7F0JbTqI5THGUQnqp7_BSBALAQQeIAk",  // ← 正確的金鑰
    authDomain: "testsystem-2056d.firebaseapp.com",
    projectId: "testsystem-2056d",
    storageBucket: "testsystem-2056d.firebasestorage.app",
    messagingSenderId: "1085110426660",
    appId: "1:1085110426660:web:48af6f7864bc567f536ccb1",  // ← 也修正了
    measurementId: "G-T978JSMQZ3"
};

// 初始化函數
function initFirebase() {
    try {
        // 檢查 Firebase 是否已加載
        if (typeof firebase !== 'undefined') {
            // 如果還沒初始化，進行初始化
            if (!firebase.apps.length) {
                const app = firebase.initializeApp(firebaseConfig);
                console.log('Firebase 初始化成功');
                return app;
            } else {
                console.log('Firebase 已初始化');
                return firebase.app();
            }
        } else {
            console.error('Firebase SDK 未加載');
            return null;
        }
    } catch (error) {
        console.error('Firebase 初始化錯誤:', error);
        return null;
    }
}

// 暴露給全域使用
window.firebaseTools = {
    config: firebaseConfig,
    init: initFirebase,
    getAuth: function() {
        return firebase?.auth();
    },
    getFirestore: function() {
        return firebase?.firestore();
    }
};

// 自動初始化
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (typeof firebase !== 'undefined') {
            initFirebase();
        }
    }, 100);
});
