/* ===== THEME — applied before first paint to avoid flash ===== */
(function () {
  const saved = localStorage.getItem('sb_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('sb_theme', next);
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = next === 'dark' ? 'Light Mode' : 'Dark Mode';
}

document.addEventListener('DOMContentLoaded', function () {
  const saved = localStorage.getItem('sb_theme') || 'light';
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = saved === 'dark' ? 'Light Mode' : 'Dark Mode';
});
