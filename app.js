import { 
    auth, 
    provider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged,
    updateProfile
} from './firebase-config.js';

// DOM Elements
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const dashboardSection = document.getElementById('dashboard-section');

// Login Elements
const googleLoginBtn = document.getElementById('google-login-btn');
const loginForm = document.getElementById('login-form');
const showRegisterBtn = document.getElementById('show-register-btn');
const showRegisterLink = document.getElementById('show-register');

// Registration Elements
const googleRegisterBtn = document.getElementById('google-register-btn');
const registerForm = document.getElementById('register-form');
const showLoginLink = document.getElementById('show-login');

// Dashboard Elements
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userId = document.getElementById('user-id');
const providerType = document.getElementById('provider-type');
const userPhoto = document.getElementById('user-photo');
const avatarIcon = document.getElementById('avatar-icon');
const logoutBtn = document.getElementById('logout-btn');

// Show/Hide Sections
function showLogin() {
    loginSection.classList.remove('hidden');
    registerSection.classList.add('hidden');
    dashboardSection.classList.add('hidden');
}

function showRegister() {
    loginSection.classList.add('hidden');
    registerSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
}

function showDashboard() {
    loginSection.classList.add('hidden');
    registerSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
}

// Google Login Handler
async function handleGoogleLogin() {
    try {
        const result = await signInWithPopup(auth, provider);
        alert('Successfully signed in with Google!');
    } catch (error) {
        console.error('Google login error:', error);
        alert(`Error: ${error.message}`);
    }
}

// Google Registration Handler
async function handleGoogleRegistration() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        // Update profile with additional info if needed
        // For now, just sign them in
        alert('Account created successfully!');
    } catch (error) {
        console.error('Google registration error:', error);
        alert(`Error: ${error.message}`);
    }
}

// Email Login Handler (optional - shows alert)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Please use Google login for this system.');
});

// Registration Form Handler (stores additional info)
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    alert('Please use Google registration. Form data would be saved in a real application.');
});

// Logout Handler
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        alert('Successfully signed out');
    } catch (error) {
        console.error('Logout error:', error);
        alert(`Error: ${error.message}`);
    }
});

// Update Dashboard with User Info
function updateDashboard(user) {
    userName.textContent = user.displayName || user.email;
    userEmail.textContent = user.email;
    userId.textContent = user.uid.substring(0, 8) + '...';
    
    // Get provider type
    const providers = user.providerData.map(p => {
        return p.providerId === 'google.com' ? 'Google' : p.providerId;
    });
    providerType.textContent = providers.join(', ');
    
    // Update photo if available
    if (user.photoURL) {
        userPhoto.src = user.photoURL;
        userPhoto.classList.remove('hidden');
        avatarIcon.classList.add('hidden');
    } else {
        userPhoto.classList.add('hidden');
        avatarIcon.classList.remove('hidden');
    }
}

// Event Listeners for Navigation
showRegisterBtn.addEventListener('click', showRegister);
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    showRegister();
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showLogin();
});

googleLoginBtn.addEventListener('click', handleGoogleLogin);
googleRegisterBtn.addEventListener('click', handleGoogleRegistration);

// Forgot Password
document.getElementById('forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Password reset would be implemented here.');
});

// Initialize Auth State Listener
function init() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            updateDashboard(user);
            showDashboard();
        } else {
            showLogin();
        }
    });
}

// Initialize App
init();
