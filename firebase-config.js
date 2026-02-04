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
let auth = null;
let db = null;

function initializeFirebase() {
    try {
        if (typeof firebase !== 'undefined') {
            // 如果還沒初始化，初始化
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            
            // 獲取 auth 和 firestore
            auth = firebase.auth();
            db = firebase.firestore();
            
            console.log('Firebase 初始化成功');
            
            // 監聽登入狀態
            auth.onAuthStateChanged(user => {
                if (user) {
                    console.log('用戶已登入:', user.email);
                    updateUIForLoggedInUser(user);
                } else {
                    console.log('用戶未登入');
                    updateUIForLoggedOutUser();
                }
            });
        }
    } catch (error) {
        console.error('Firebase 初始化失敗:', error);
    }
}

// 匯出函數
window.firebaseAuth = {
    initialize: initializeFirebase,
    getAuth: () => auth,
    getFirestore: () => db
};
