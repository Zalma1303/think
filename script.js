// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const closeButtons = document.getElementsByClassName('close');

// Modal Functions
function openModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// Event Listeners
loginBtn.addEventListener('click', () => openModal(loginModal));
signupBtn.addEventListener('click', () => openModal(signupModal));

Array.from(closeButtons).forEach(button => {
    button.addEventListener('click', () => {
        closeModal(loginModal);
        closeModal(signupModal);
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) closeModal(loginModal);
    if (e.target === signupModal) closeModal(signupModal);
});

// Authentication Functions
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('Успешный вход:', user);
        closeModal(loginModal);
        // Redirect to dashboard or show success message
    } catch (error) {
        console.error('Ошибка входа:', error.message);
        alert('Ошибка входа: ' + error.message);
    }
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Store additional user data in Firestore
        await db.collection('users').doc(user.uid).set({
            fullName: fullName,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log('Аккаунт успешно создан:', user);
        closeModal(signupModal);
        // Redirect to dashboard or show success message
    } catch (error) {
        console.error('Ошибка регистрации:', error.message);
        alert('Ошибка регистрации: ' + error.message);
    }
});

// Auth State Observer
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log('Пользователь вошел в систему:', user);
        // Update UI for logged-in state
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        // Add logout button or user profile button
    } else {
        // User is signed out
        console.log('Пользователь вышел из системы');
        // Update UI for logged-out state
        loginBtn.style.display = 'block';
        signupBtn.style.display = 'block';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 