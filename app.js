import { 
    auth, 
    provider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged,
    updateProfile
} from './firebase-config.js';

// DOM Elements
const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const dashboardContainer = document.getElementById('dashboard-container');
const toast = document.getElementById('toast');

// Login Elements
const googleLoginBtn = document.getElementById('google-login-btn');
const showRegisterLink = document.getElementById('show-register');
const emailLoginForm = document.getElementById('email-login-form');

// Registration Elements
const googleRegisterBtn = document.getElementById('google-register-btn');
const showLoginLink = document.getElementById('show-login');
const googleRegisterSection = document.getElementById('google-register-section');
const registrationForm = document.getElementById('registration-form');
const completeRegistrationForm = document.getElementById('complete-registration-form');
const backToGoogleBtn = document.getElementById('back-to-google');

// Registration Form Elements
const regUserName = document.getElementById('reg-user-name');
const regUserEmail = document.getElementById('reg-user-email');
const regUserPhoto = document.getElementById('reg-user-photo');
const fullNameInput = document.getElementById('full-name');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const togglePasswordBtn = document.getElementById('toggle-password');
const toggleConfirmPasswordBtn = document.getElementById('toggle-confirm-password');
const strengthBar = document.querySelector('.strength-bar');
const strengthText = document.querySelector('.strength-text');

// Dashboard Elements
const dashboardName = document.getElementById('dashboard-name');
const dashboardEmail = document.getElementById('dashboard-email');
const dashboardPhoto = document.getElementById('dashboard-photo');
const userId = document.getElementById('user-id');
const memberSince = document.getElementById('member-since');
const lastActive = document.getElementById('last-active');
const logoutBtn = document.getElementById('logout-btn');

// State Variables
let googleUserData = null;

// Toast Notification
function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 4000);
}

// Toggle Password Visibility
togglePasswordBtn?.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordBtn.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

toggleConfirmPasswordBtn?.addEventListener('click', () => {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    toggleConfirmPasswordBtn.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

// Password Strength Checker
passwordInput?.addEventListener('input', function() {
    const password = this.value;
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    strengthBar.style.width = `${strength}%`;
    
    if (strength < 25) {
        strengthBar.style.backgroundColor = '#ef4444';
        strengthText.textContent = 'Very Weak';
    } else if (strength < 50) {
        strengthBar.style.backgroundColor = '#f97316';
        strengthText.textContent = 'Weak';
    } else if (strength < 75) {
        strengthBar.style.backgroundColor = '#f59e0b';
        strengthText.textContent = 'Good';
    } else {
        strengthBar.style.backgroundColor = '#10b981';
        strengthText.textContent = 'Strong';
    }
});

// Handle Google Login
async function handleGoogleLogin() {
    try {
        const result = await signInWithPopup(auth, provider);
        showToast('Successfully signed in!', 'success');
        return result.user;
    } catch (error) {
        console.error('Google login error:', error);
        let errorMessage = 'Login failed';
        
        switch (error.code) {
            case 'auth/popup-closed-by-user':
                errorMessage = 'Login cancelled';
                break;
            case 'auth/popup-blocked':
                errorMessage = 'Popup blocked by browser. Please allow popups for this site.';
                break;
            case 'auth/unauthorized-domain':
                errorMessage = 'This domain is not authorized. Please check Firebase console settings.';
                break;
            default:
                errorMessage = error.message;
        }
        
        showToast(`Error: ${errorMessage}`, 'error');
        return null;
    }
}

// Handle Google Registration
async function handleGoogleRegistration() {
    const user = await handleGoogleLogin();
    if (user) {
        googleUserData = user;
        
        // Update registration form with Google user info
        regUserName.textContent = user.displayName || 'Set your name';
        regUserEmail.textContent = user.email;
        
        if (user.photoURL) {
            regUserPhoto.src = user.photoURL;
            regUserPhoto.style.display = 'block';
            document.querySelector('.fallback-avatar').style.display = 'none';
        }
        
        // Pre-fill name field
        fullNameInput.value = user.displayName || '';
        
        // Switch to registration form
        googleRegisterSection.classList.add('hidden');
        registrationForm.classList.remove('hidden');
        
        // Update step indicator
        document.getElementById('step-google').classList.remove('active');
        document.getElementById('step-details').classList.add('active');
    }
}

// Complete Registration
completeRegistrationForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = fullNameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // Validation
    if (!name) {
        showToast('Please enter your name', 'error');
        return;
    }
    
    if (password.length < 8) {
        showToast('Password must be at least 8 characters', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    try {
        // Update user profile with name
        if (googleUserData) {
            await updateProfile(googleUserData, {
                displayName: name
            });
        }
        
        showToast('Registration complete! Welcome aboard!', 'success');
        
        // Reset registration form
        googleUserData = null;
        registrationForm.classList.add('hidden');
        googleRegisterSection.classList.remove('hidden');
        document.getElementById('step-google').classList.add('active');
        document.getElementById('step-details').classList.remove('active');
        completeRegistrationForm.reset();
        
    } catch (error) {
        console.error('Registration error:', error);
        showToast(`Error: ${error.message}`, 'error');
    }
});

// Email Login (for organizations - optional)
emailLoginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    showToast('Please use Google login for this system', 'info');
});

// Back to Google button
backToGoogleBtn?.addEventListener('click', () => {
    googleRegisterSection.classList.remove('hidden');
    registrationForm.classList.add('hidden');
    document.getElementById('step-google').classList.add('active');
    document.getElementById('step-details').classList.remove('active');
    completeRegistrationForm.reset();
    googleUserData = null;
});

// Logout
logoutBtn?.addEventListener('click', async () => {
    try {
        await signOut(auth);
        showToast('Successfully signed out', 'info');
    } catch (error) {
        console.error('Logout error:', error);
        showToast(`Error: ${error.message}`, 'error');
    }
});

// Form Switching
showRegisterLink?.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.classList.add('hidden');
    registerContainer.classList.remove('hidden');
    dashboardContainer.classList.add('hidden');
});

showLoginLink?.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.classList.remove('hidden');
    registerContainer.classList.add('hidden');
    dashboardContainer.classList.add('hidden');
});

// Event Listeners
googleLoginBtn?.addEventListener('click', handleGoogleLogin);
googleRegisterBtn?.addEventListener('click', handleGoogleRegistration);

// Update Dashboard
function updateDashboard(user) {
    dashboardName.textContent = user.displayName || 'User';
    dashboardEmail.textContent = user.email;
    userId.textContent = user.uid.substring(0, 8) + '...';
    
    // Format dates
    const creationDate = new Date(user.metadata.creationTime);
    memberSince.textContent = creationDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });
    
    lastActive.textContent = 'Just now';
    
    // Update photo
    if (user.photoURL) {
        dashboardPhoto.src = user.photoURL;
        dashboardPhoto.style.display = 'block';
    } else {
        dashboardPhoto.style.display = 'none';
    }
}

// Auth State Listener
function init() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            updateDashboard(user);
            loginContainer.classList.add('hidden');
            registerContainer.classList.add('hidden');
            dashboardContainer.classList.remove('hidden');
        } else {
            // User is signed out
            loginContainer.classList.remove('hidden');
            registerContainer.classList.add('hidden');
            dashboardContainer.classList.add('hidden');
        }
    });
}

// Initialize App
init();
