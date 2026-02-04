// firebase-config.js - 修正版
const firebaseConfig = {
    apiKey: "AIzaSyA7F0JbTqI5THGUQnqp7_BSBALAQQeIAk",
    authDomain: "testsystem-2056d.firebaseapp.com",
    projectId: "testsystem-2056d",
    storageBucket: "testsystem-2056d.firebasestorage.app",
    messagingSenderId: "1085110426660",
    appId: "1:1085110426660:web:48af6f7864bc567f536ccb1"
};

// 檢查環境
function initializeFirebase() {
    try {
        if (typeof firebase !== 'undefined') {
            // 檢查是否已初始化
            if (!firebase.apps.length) {
                const app = firebase.initializeApp(firebaseConfig);
                console.log('Firebase 初始化成功');
                
                // 設定語言
                firebase.auth().languageCode = 'zh-TW';
                
                return app;
            } else {
                return firebase.app();
            }
        }
        console.warn('Firebase SDK 未加載');
        return null;
    } catch (error) {
        console.error('Firebase 初始化錯誤:', error);
        return null;
    }
}

// 暴露函數
window.firebaseTools = {
    initialize: initializeFirebase,
    getAuth: () => firebase?.auth(),
    getFirestore: () => firebase?.firestore()
};

// 嘗試初始化
if (typeof firebase !== 'undefined') {
    initializeFirebase();
}
