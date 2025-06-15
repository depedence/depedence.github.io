// index.js — управление состоянием авторизации

document.addEventListener('DOMContentLoaded', () => {
  // const userEmail = localStorage.getItem('userEmail');
  const authBlock = document.querySelector('.authenticated');
  const guestBlock = document.querySelector('.not-authenticated');
  const emailSpan = document.getElementById('user-email');
  const logoutBtn = document.getElementById('logout-btn');
  checkSession()

  // if (userEmail) {
  //   guestBlock.style.display = 'none';
  //   authBlock.style.display = 'flex';
  //   emailSpan.textContent = userEmail;
  // } else {
  //   guestBlock.style.display = 'flex';
  //   authBlock.style.display = 'none';
  // }

  // logoutBtn.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   localStorage.removeItem('userEmail');
  //   location.reload();
  // });
});

window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

// Проверка соединения с сервером
// Показать модальное окно
function showOfflineModal() {
  const modal = document.querySelector('.offline-modal');
  modal.classList.add('active');
}

function checkSession() {
  fetch('http://localhost:5000/api/session', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn) {
            showUserMenu(data.email);
        } else {
            showAuthButtons();
        }
    })
    .catch(error => {
        console.error('Ошибка при проверке сессии:', error);
        showAuthButtons();
    });
}

function showUserMenu(email) {
  const topBar = document.getElementById('top-bar-buttons');
    topBar.innerHTML = `
        <div class="user-menu">
            <span id="user-email">${email}</span>
            <div class="dropdown">
                <button id="settings-btn">Настройки</button>
                <button id="logout-btn">Выйти</button>
            </div>
        </div>
    `;

    // Навешиваем обработчик на выход
    document.getElementById('logout-btn').addEventListener('click', logout);
}

function showAuthButtons() {
  const topBar = document.getElementById('top-bar-buttons');
    topBar.innerHTML = `
        <button onclick="window.location.href='register.html'">Регистрация</button>
        <button onclick="window.location.href='login.html'">Войти</button>
    `;
}

function logout() {
  fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Вы успешно вышли') {
            checkSession();  // обновляем UI
        } else {
            alert('Не удалось выйти');
        }
    })
    .catch(error => {
        console.error('Ошибка при выходе из аккаунта:', error);
        alert('Ошибка выхода');
    });
}
