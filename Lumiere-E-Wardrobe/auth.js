/**
 * BAUHAUS E-WARDROBE: DAY 1 - AUTHENTICATION MODULE
 * Concepts Implemented: JS DOM Manipulation, JS Login Form, Data Handling (Local Storage), JS Validation (Username text strings, Access Code numbers only), Session Handling
 */

// 1. DOM Element Selection
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const userError = document.getElementById('userError');
const passError = document.getElementById('passError');

// 2. Form Event Listener (Handling Login & Validation)
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Reset error messages on new submission
    userError.textContent = '';
    passError.textContent = '';
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    let isValid = true;

    // 3. Username Validation: Must be a valid string / characters (min 3 chars)
    if (username === '') {
        userError.textContent = 'Please enter your fashion alias.';
        isValid = false;
    } else if (username.length < 3) {
        userError.textContent = 'Alias must be at least 3 characters.';
        isValid = false;
    }

    // 4. Access Code Validation: Must be numbers only
    const numbersOnlyRegex = /^\d+$/;
    if (password === '') {
        passError.textContent = 'Please enter your access code.';
        isValid = false;
    } else if (!numbersOnlyRegex.test(password)) {
        passError.textContent = 'Access code must contain numbers only.';
        isValid = false;
    } else if (password.length < 4) {
        passError.textContent = 'Access code must be at least 4 digits.';
        isValid = false;
    }

    // 5. Secure Data Handling & Session Reset
    if (isValid) {
        // Clear any previous active session so different accounts never cross over
        localStorage.removeItem('lumiere_active_session');

        // Create a fresh user session object
        const activeUser = {
            username: username,
            loginTime: new Date().toISOString()
        };

        // Save session to Local Storage
        localStorage.setItem('lumiere_active_session', JSON.stringify(activeUser));

        // Simulated asynchronous loading state before redirect
        const btn = document.querySelector('.btn-primary');
        btn.textContent = 'Unlocking Wardrobe...';
        btn.style.backgroundColor = 'var(--bh-yellow)';
        btn.style.color = 'var(--bh-black)';

        setTimeout(() => {
            window.location.href = 'app.html'; 
        }, 1200);
    }
});
