// index.js — управление состоянием авторизации

document.addEventListener('DOMContentLoaded', () => {
  const userEmail = localStorage.getItem('userEmail');
  const authBlock = document.querySelector('.authenticated');
  const guestBlock = document.querySelector('.not-authenticated');
  const emailSpan = document.getElementById('user-email');
  const logoutBtn = document.getElementById('logout-btn');

  if (userEmail) {
    guestBlock.style.display = 'none';
    authBlock.style.display = 'flex';
    emailSpan.textContent = userEmail;
  } else {
    guestBlock.style.display = 'flex';
    authBlock.style.display = 'none';
  }

  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('userEmail');
    location.reload();
  });
});

window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});
