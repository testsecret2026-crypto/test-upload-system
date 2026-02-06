import { 
    auth, 
    provider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    updateProfile
} from './firebase-config.js';

// DOM Elements
const loginFormContainer = document.getElementById('login-form');
const registerFormContainer = document.getElementById('register-form');
const dashboardContainer = document.getElementById('dashboard');
const loadingOverlay = document.getElementById('loading-overlay');
const toast = document.getElementById('toast');

// Login Form Elements
const loginForm = document.getElementById('loginForm');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const googleLoginBtn = document.getElementById('google-login-btn');
const showRegisterLink = document.getElementById('show-register');

// Register Form Elements
const registerForm = document.getElementById('registerForm');
const registerName = document.getElementById('register-name');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const registerConfirmPassword = document.getElementById('register-confirm-password');
const googleRegisterBtn = document.getElementById('google-register-btn');
const showLoginLink = document.getElementById('show-login');

// Dashboard Elements
const userDisplayName = document.getElementById('user-display-name');
const userFullName = document.getElementById('user-full-name');
const userEmailAddress = document.getElementById('user-email-address');
const userId = document.getElementById('user-id');
const accountProvider = document.getElementById('account-provider');
const verifiedStatus = document.getElementById('verified-status');
const userAvatar = document.getElementById('user-avatar');
const userPhoto = document.getElementById('user-photo');
const logoutBtn = document.getElementById('logout-btn');

// Forgot Password
const forgotPasswordLink = document.getElementById('forgot-password');

// Show Toast Message
function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Show Loading
function showLoading() {
    loadingOverlay.classList.remove('hidden');
}

// Hide Loading
function hideLoading() {
    loadingOverlay.classList.add('hidden');
}

// Switch to Login Form
function showLoginForm() {
    loginFormContainer.classList.remove('hidden');
    registerFormContainer.classList.add('hidden');
    dashboardContainer.classList.add('hidden');
}

// Switch to Register Form
function showRegisterForm() {
    loginFormContainer.classList.add('hidden');
    registerFormContainer.classList.remove('hidden');
    dashboardContainer.classList.add('hidden');
}

// Show Dashboard
function showDashboard() {
    loginFormContainer.classList.add('hidden');
    registerFormContainer.classList.add('hidden');
    dashboardContainer.classList.remove('hidden');
}

// Update Dashboard with User Info
function updateDashboard(user) {
    userDisplayName.textContent = user.displayName || user.email;
    userFullName.textContent = user.displayName || 'Not set';
    userEmailAddress.textContent = user.email;
    userId.textContent = user.uid;
    
    // Get provider info
    const providers = user.providerData.map(p => {
        switch(p.providerId) {
            case 'google.com': return 'Google';
            case 'password': return 'Email/Password';
            default: return p.providerId;
        }
    });
    accountProvider.textContent = providers.join(', ');
    
    // Email verification status
    if (user.emailVerified) {
        verifiedStatus.textContent = 'Verified';
        verifiedStatus.style.color = '#4CAF50';
    } else {
        verifiedStatus.textContent = 'Not Verified';
        verifiedStatus.style.color = '#f44336';
    }
    
    // Profile photo
    if (user.photoURL) {
        userAvatar.classList.add('hidden');
        userPhoto.src = user.photoURL;
        userPhoto.classList.remove('hidden');
    } else {
        userAvatar.classList.remove('hidden');
        userPhoto.classList.add('hidden');
    }
}

// Handle Google Login/Signup
async function handleGoogleAuth() {
    try {
        showLoading();
        const result = await signInWithPopup(auth, provider);
        showToast('Successfully signed in with Google!', 'success');
    } catch (error) {
        console.error('Google auth error:', error);
        showToast(`Error: ${error.message}`, 'error');
        hideLoading();
    }
}

// Handle Email/Password Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = loginUsername.value.trim();
    const password = loginPassword.value;
    
    if (!username || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    try {
        showLoading();
        
        // Check if input is email or username
        // For Firebase, we use email for login
        // If user entered username, we need to handle it differently
        // For now, assuming it's an email
        const email = username.includes('@') ? username : `${username}@example.com`;
        
        await signInWithEmailAndPassword(auth, email, password);
        showToast('Successfully logged in!', 'success');
        
        // Clear form
        loginForm.reset();
    } catch (error) {
        console.error('Login error:', error);
        let errorMessage = 'Login failed';
        
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address';
                break;
            case 'auth/user-disabled':
                errorMessage = 'Account disabled';
                break;
            case 'auth/user-not-found':
                errorMessage = 'Account not found';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password';
                break;
            case 'auth/invalid-credential':
                errorMessage = 'Invalid credentials';
                break;
            default:
                errorMessage = error.message;
        }
        
        showToast(`Error: ${errorMessage}`, 'error');
        hideLoading();
    }
});

// Handle Email/Password Registration
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = registerName.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value;
    const confirmPassword = registerConfirmPassword.value;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (!email.includes('@')) {
        showToast('Please enter a valid email', 'error');
        return;
    }
    
    try {
        showLoading();
        
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update profile with display name
        await updateProfile(userCredential.user, {
            displayName: name
        });
        
        showToast('Account created successfully!', 'success');
        
        // Clear form
        registerForm.reset();
        
        // Show dashboard (auth state change will handle this)
    } catch (error) {
        console.error('Registration error:', error);
        let errorMessage = 'Registration failed';
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'Email already in use';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'Email/password accounts not enabled';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password is too weak';
                break;
            default:
                errorMessage = error.message;
        }
        
        showToast(`Error: ${errorMessage}`, 'error');
        hideLoading();
    }
});

// Handle Logout
logoutBtn.addEventListener('click', async () => {
    try {
        showLoading();
        await signOut(auth);
        showToast('Successfully logged out', 'info');
    } catch (error) {
        console.error('Logout error:', error);
        showToast(`Error: ${error.message}`, 'error');
        hideLoading();
    }
});

// Forgot Password Handler
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = prompt('Please enter your email address to reset password:');
    if (email) {
        showToast(`Password reset email would be sent to ${email}. Please enable email/password auth in Firebase console.`, 'info');
    }
});

// Form Switching
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    showRegisterForm();
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginForm();
});

// Google Auth Buttons
googleLoginBtn.addEventListener('click', handleGoogleAuth);
googleRegisterBtn.addEventListener('click', handleGoogleAuth);

// Initialize Auth State Listener
function init() {
    showLoading();
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            updateDashboard(user);
            showDashboard();
        } else {
            showLoginForm();
        }
        hideLoading();
    });
}

// Initialize App
init();
