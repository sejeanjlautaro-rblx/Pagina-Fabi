// Menú mobile
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }
});

// Devuelve las iniciales de un nombre para el avatar (ej: "Fabián Torres" -> "FT")
function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

// Flechita de tendencia según 'up' | 'down' | 'same'
function trendSymbol(trend) {
  if (trend === 'up') return '▲';
  if (trend === 'down') return '▼';
  return '—';
}
