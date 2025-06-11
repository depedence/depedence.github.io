const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = form.email.value.trim();
  const password = form.password.value;

  if (!email || !password) {
    alert('Пожалуйста, заполните все поля');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const contentType = response.headers.get('content-type');

    if (response.ok) {
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        alert('Вход выполнен успешно!');
        // Здесь пока редирект не делаем
      } else {
        const text = await response.text();
        console.warn('Ожидался JSON, но получен:', text);
        alert('Успешно, но сервер вернул не JSON');
      }
    } else {
      const errorText = await response.text();
      console.warn('Ошибка от сервера:', errorText);
      alert('Ошибка авторизации: ' + errorText);
    }
  } catch (error) {
    alert('Ошибка при отправке запроса: ' + error.message);
  }
});
