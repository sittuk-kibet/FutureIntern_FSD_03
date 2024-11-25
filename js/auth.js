
// URLs for API endpoints
const registerUrl = '/auth/register';
const loginUrl = '/auth/login';

// DOM Elements for Login and Register forms
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Event: Register Form Submission
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(registerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then((response) => response.text())
      .then((message) => {
        alert(message);
        window.location.href = 'login.html';
      })
      .catch((error) => console.error('Error registering:', error));
  });
}

// Event: Login Form Submission
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then((response) => response.text())
      .then((message) => {
        alert(message);
        if (message === 'Login successful.') {
          window.location.href = 'chat.html';
        }
      })
      .catch((error) => console.error('Error logging in:', error));
  });
}
