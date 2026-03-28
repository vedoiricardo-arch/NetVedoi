const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function applyTheme(theme) {
  body.classList.remove('light', 'dark');
  body.classList.add(theme);
  themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
  localStorage.setItem('netflixTheme', theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem('netflixTheme');
  const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (hasDarkPreference ? 'dark' : 'light');
  applyTheme(theme);
}

function saveActiveProfile() {
  document.querySelectorAll('.profile-link').forEach(link => {
    link.addEventListener('click', () => {
      const img = link.querySelector('img');
      const name = link.querySelector('p')?.textContent.trim();
      if (!img || !name) return;
      const srcAttr = img.getAttribute('src');
      const filename = srcAttr ? srcAttr.split('/').pop() : '';
      if (!filename) return;
      localStorage.setItem('perfilAtivoNome', name);
      localStorage.setItem('perfilAtivoImagem', `../assets/${filename}`);
    });
  });
}

themeToggle.addEventListener('click', () => {
  const nextTheme = body.classList.contains('light') ? 'dark' : 'light';
  applyTheme(nextTheme);
});

initTheme();
saveActiveProfile();
