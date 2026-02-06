import { 
    auth, 
    provider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from './firebase-config.js';

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loadingScreen = document.getElementById('loading-screen');
const googleSigninBtn = document.getElementById('google-signin-btn');
const signoutBtn = document.getElementById('signout-btn');
const emailLoginForm = document.getElementById('email-login-form');
const forgotPasswordLink = document.getElementById('forgot-password');
const signUpLink = document.getElementById('sign-up');

// User info elements
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userPhoto = document.getElementById('user-photo');
const userUid = document.getElementById('user-uid');
const userProvider = document.getElementById('user-provider');
const emailVerified = document.getElementById('email-verified');
const lastLogin = document.getElementById('last-login');
const accountCreated = document.getElementById('account-created');

let isSignUpMode = false;

// Initialize the app
function initApp() {
    // Show loading screen initially
    loadingScreen.classList.remove('hidden');
    
    // Listen for auth state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            updateUserInfo(user);
            showDashboard();
        } else {
            // User is signed out
            showLogin();
        }
        loadingScreen.classList.add('hidden');
    });
}

// Show login screen
function showLogin() {
    loginScreen.classList.remove('hidden');
    dashboardScreen.classList.add('hidden');
    loadingScreen.classList.add('hidden');
}

// Show dashboard
function showDashboard() {
    loginScreen.classList.add('hidden');
    dashboardScreen.classList.remove('hidden');
    loadingScreen.classList.add('hidden');
}

// Update user information on dashboard
function updateUserInfo(user) {
    userName.textContent = user.displayName || 'No name provided';
    userEmail.textContent = user.email;
    userUid.textContent = user.uid;
    
    // Update photo if available
    if (user.photoURL) {
        userPhoto.src = user.photoURL;
        userPhoto.style.display = 'block';
    } else {
        userPhoto.style.display = 'none';
    }
    
    // Get provider info
    const providers = user.providerData.map(p => p.providerId);
    userProvider.textContent = providers.join(', ') || 'Email/Password';
    
    // Email verification status
    emailVerified.textContent = user.emailVerified ? 'Yes' : 'No';
    emailVerified.style.color = user.emailVerified ? '#34a853' : '#ea4335';
    
    // Metadata
    const lastSignInTime = user.metadata.lastSignInTime;
    const creationTime = user.metadata.creationTime;
    
    lastLogin.textContent = formatDate(lastSignInTime);
    accountCreated.textContent = formatDate(creationTime);
}

// Format date
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
}

// Google Sign In
googleSigninBtn.addEventListener('click', async () => {
    try {
        loadingScreen.classList.remove('hidden');
        const result = await signInWithPopup(auth, provider);
        console.log('Google sign in successful:', result.user);
    } catch (error) {
        console.error('Google sign in error:', error);
        alert(`Error: ${error.message}`);
        loadingScreen.classList.add('hidden');
    }
});

// Email/Password Login
emailLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }
    
    try {
        loadingScreen.classList.remove('hidden');
        
        if (isSignUpMode) {
            // Sign up new user
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Account created successfully! Please check your email for verification.');
        } else {
            // Sign in existing user
            await signInWithEmailAndPassword(auth, email, password);
        }
    } catch (error) {
        console.error('Email auth error:', error);
        let errorMessage = 'An error occurred';
        
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address';
                break;
            case 'auth/user-disabled':
                errorMessage = 'This account has been disabled';
                break;
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password';
                break;
            case 'auth/email-already-in-use':
                errorMessage = 'Email already in use';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password should be at least 6 characters';
                break;
            default:
                errorMessage = error.message;
        }
        
        alert(`Error: ${errorMessage}`);
        loadingScreen.classList.add('hidden');
    }
});

// Sign Out
signoutBtn.addEventListener('click', async () => {
    try {
        loadingScreen.classList.remove('hidden');
        await signOut(auth);
        console.log('User signed out successfully');
    } catch (error) {
        console.error('Sign out error:', error);
        alert(`Error: ${error.message}`);
        loadingScreen.classList.add('hidden');
    }
});

// Toggle between sign in and sign up
signUpLink.addEventListener('click', (e) => {
    e.preventDefault();
    isSignUpMode = !isSignUpMode;
    
    if (isSignUpMode) {
        document.querySelector('.email-option p').textContent = 'Create a new account';
        document.querySelector('.email-btn').innerHTML = '<i class="fas fa-user-plus"></i>Sign Up';
        document.querySelector('#sign-up').textContent = 'Sign in instead';
        document.querySelector('.footer-links p').innerHTML = 'Already have an account? <a href="#" id="sign-up">Sign in</a>';
    } else {
        document.querySelector('.email-option p').textContent = 'Or use your email to sign in';
        document.querySelector('.email-btn').innerHTML = '<i class="fas fa-envelope"></i>Sign in with Email';
        document.querySelector('#sign-up').textContent = 'Sign up';
        document.querySelector('.footer-links p').innerHTML = 'Don\'t have an account? <a href="#" id="sign-up">Sign up</a>';
    }
    
    // Re-attach event listener to the new sign-up link
    document.getElementById('sign-up').addEventListener('click', arguments.callee);
});

// Forgot password
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Password reset functionality would be implemented here. In a real app, this would send a reset email.');
});

// Initialize the application
initApp();
