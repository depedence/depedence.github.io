document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка входа');
      }

      alert('Вход выполнен успешно!');

      // Проверяем актуальную сессию
      const sessionResponse = await fetch('http://localhost:5000/api/session', {
        credentials: 'include'
      });

      const sessionData = await sessionResponse.json();

      if (sessionData.loggedIn) {
        localStorage.setItem('userEmail', sessionData.email);
      }

      window.location.href = '/';
    } catch (error) {
      console.error('Ошибка при входе:', error);
      alert('Ошибка: ' + error.message);
    }
  });
});
