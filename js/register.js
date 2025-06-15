document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка регистрации');
      }

      alert('Регистрация прошла успешно!');

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
      console.error('Ошибка при регистрации:', error);
      alert('Ошибка: ' + error.message);
    }
  });
});
