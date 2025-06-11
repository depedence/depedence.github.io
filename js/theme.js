document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  function setIcon(isDark) {
    if (isDark) {
      // Солнце
      themeIcon.innerHTML = `
        <circle cx="12" cy="12" r="5" stroke="white" stroke-width="2" fill="none"/>
        <line x1="12" y1="1" x2="12" y2="4" stroke="white" stroke-width="2"/>
        <line x1="12" y1="20" x2="12" y2="23" stroke="white" stroke-width="2"/>
        <line x1="1" y1="12" x2="4" y2="12" stroke="white" stroke-width="2"/>
        <line x1="20" y1="12" x2="23" y2="12" stroke="white" stroke-width="2"/>
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="white" stroke-width="2"/>
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="white" stroke-width="2"/>
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="white" stroke-width="2"/>
        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="white" stroke-width="2"/>
      `;
    } else {
      // Луна
      themeIcon.innerHTML = `
        <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 0012 21a9 9 0 009-8.21z" stroke="black" stroke-width="2" fill="none"/>
      `;
    }
  }

  // Проверяем сохраненную тему
  const isDark = localStorage.getItem("theme") === "dark";
  if (isDark) document.body.classList.add("dark-mode");
  setIcon(isDark);

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    setIcon(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});
