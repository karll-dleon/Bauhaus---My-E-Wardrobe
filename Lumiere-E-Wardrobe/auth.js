/**
 * LUMIÈRE E-WARDROBE: DAY 1 - AUTHENTICATION MODULE
 * Concepts Implemented: JS DOM Manipulation, JS Login Form, Data Handling (Local Storage)
 */

// 1. DOM Element Selection
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const userError = document.getElementById('userError');
const passError = document.getElementById('passError');

// 2. Form Event Listener (Handling the Login action)
loginForm.addEventListener('submit', function(event) {
    // Prevent the default form submission to handle logic entirely via JavaScript
    event.preventDefault();
    
    // Reset error messages on new submission
    userError.textContent = '';
    passError.textContent = '';
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    let isValid = true;

    // 3. Form validation
    if (username === '') {
        userError.textContent = 'Please enter your fashion alias.';
        isValid = false;
    } else if (username.length < 3) {
        userError.textContent = 'Alias must be at least 3 characters.';
        isValid = false;
    }

    if (password === '') {
        passError.textContent = 'Please enter your password.';
        isValid = false;
    } else if (password.length < 5) {
        passError.textContent = 'Password must be at least 5 characters.';
        isValid = false;
    }

    // 4. Data Handling via Local Storage
    if (isValid) {
        // Create a user session object
        const activeUser = {
            username: username,
            loginTime: new Date().toISOString()
        };

        // Save session to Local Storage (converts JS Object to JSON string)
        localStorage.setItem('lumiere_active_session', JSON.stringify(activeUser));

        // Simulated asynchronous loading feel before redirecting
        const btn = document.querySelector('.btn-primary');
        btn.textContent = 'Unlocking Wardrobe...';
        btn.style.backgroundColor = 'var(--leather)'; // Temporary state color

        setTimeout(() => {
            // Redirect to the main application dashboard (To be built on Day 2)
            window.location.href = 'app.html'; 
        }, 1200);
    }
});