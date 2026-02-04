// firebase-config.js - 修正版
const firebaseConfig = {
    apiKey: "AIzaSyA7F0JbTqI5THGUQnqp7_BSBALAQQeIAk",
    authDomain: "testsystem-2056d.firebaseapp.com",
    projectId: "testsystem-2056d",
    storageBucket: "testsystem-2056d.firebasestorage.app",
    messagingSenderId: "1085110426660",
    appId: "1:1085110426660:web:48af6f7864bc567f536ccb1"
};

// 檢查是否已初始化
let app, auth, db;

function initializeFirebase() {
    try {
        // 檢查是否已經加載了 Firebase SDK
        if (typeof firebase === 'undefined') {
            console.error('Firebase SDK 未加載');
            return false;
        }
        
        // 初始化 Firebase
        if (!firebase.apps.length) {
            app = firebase.initializeApp(firebaseConfig);
            console.log('Firebase 應用已初始化');
        } else {
            app = firebase.app();
            console.log('Firebase 應用已存在');
        }
        
        // 獲取服務
        auth = firebase.auth();
        db = firebase.firestore();
        
        console.log('Firebase 服務初始化完成');
        return true;
        
    } catch (error) {
        console.error('Firebase 初始化錯誤:', error);
        return false;
    }
}

// 暴露給全域使用
window.firebaseApp = {
    initialize: initializeFirebase,
    getAuth: () => auth,
    getFirestore: () => db,
    getApp: () => app
};

// 自動初始化
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (initializeFirebase()) {
            console.log('Firebase 自動初始化成功');
        } else {
            console.error('Firebase 自動初始化失敗');
        }
    }, 1000);
});
