/**
 * APP.JS — Todo el comportamiento de la página única (SPA simple, sin frameworks).
 * Navega entre vistas cambiando el hash de la URL (#inicio, #llaves, #tabla, #premios)
 * así el link se puede compartir directo a una sección y el botón "atrás" funciona.
 */

const VIEWS = ['inicio', 'llaves', 'tabla', 'premios'];

function goToView(view) {
  if (!VIEWS.includes(view)) view = 'inicio';

  document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
  document.getElementById('view-' + view).classList.add('active');

  document.querySelectorAll('.main-nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.view === view);
  });

  // cierra el menú mobile si estaba abierto
  document.querySelector('.main-nav')?.classList.remove('open');

  window.scrollTo({ top: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });
}

function currentViewFromHash() {
  return (window.location.hash || '#inicio').replace('#', '');
}

window.addEventListener('hashchange', () => goToView(currentViewFromHash()));

// Los botones/cards del inicio que apuntan a otra vista (además del cambio de hash automático)
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-view-link]');
  if (link) {
    // el href="#tabla" ya dispara hashchange; esto es solo un respaldo por si el hash no cambia
    goToView(link.dataset.viewLink);
  }
});

/* ============================================================
   VISTA: INICIO — mini perfil + top de tu liga
   ============================================================ */
function renderHeroWidget() {
  const nameEl = document.getElementById('mp-name');
  const metaEl = document.getElementById('mp-meta');
  const titleEl = document.getElementById('mr-title');
  const listEl = document.getElementById('mini-ranking-list');
  if (!nameEl) return;

  const me = PLAYERS.find((p) => p.id === CURRENT_USER_ID);
  if (!me) return;

  nameEl.textContent = me.name;
  metaEl.innerHTML = `${me.category} · <strong>${me.points} pts</strong>`;

  const catLabel = CATEGORIES.find((c) => c.code === me.category)?.label || me.category;
  titleEl.textContent = `Top ${catLabel}`;

  const ranked = PLAYERS
    .filter((p) => p.category === me.category)
    .sort((a, b) => b.points - a.points);

  const topN = ranked.slice(0, 5);
  // si yo no entro en el top 5, lo agrego igual al final para que siempre me vea
  const meInTop = topN.some((p) => p.id === me.id);
  const rowsToShow = meInTop ? topN : [...topN, { ...me, __myPos: ranked.findIndex((p) => p.id === me.id) + 1 }];

  listEl.innerHTML = '';
  rowsToShow.forEach((p) => {
    const pos = p.__myPos || ranked.findIndex((r) => r.id === p.id) + 1;
    const li = document.createElement('li');
    if (p.id === me.id) li.classList.add('me');
    li.innerHTML = `
      <span class="pos">${pos}</span>
      <span class="name">${p.name}</span>
      <span class="pts">${p.points}</span>
    `;
    listEl.appendChild(li);
  });
}

/* ============================================================
   Barra de categorías reutilizable (se usa en Llaves y en Tabla)
   ============================================================ */
function buildCategoryBar(container, selected, onSelect) {
  container.innerHTML = '';

  const caballeroGroup = document.createElement('span');
  caballeroGroup.className = 'category-group-label';
  caballeroGroup.textContent = 'Caballeros';
  container.appendChild(caballeroGroup);
  CATEGORIES.filter((c) => c.group === 'caballero').forEach((c) => container.appendChild(pillFor(c)));

  const damaGroup = document.createElement('span');
  damaGroup.className = 'category-group-label';
  damaGroup.style.marginLeft = '10px';
  damaGroup.textContent = 'Damas';
  container.appendChild(damaGroup);
  CATEGORIES.filter((c) => c.group === 'dama').forEach((c) => container.appendChild(pillFor(c)));

  function pillFor(cat) {
    const btn = document.createElement('button');
    btn.className = 'pill' + (cat.group === 'dama' ? ' dama' : '') + (cat.code === selected ? ' active' : '');
    btn.textContent = cat.label;
    btn.addEventListener('click', () => onSelect(cat.code));
    return btn;
  }
}

/* ============================================================
   Par de dropdowns de categoría (caballeros / damas) — usado en Llaves
   ============================================================ */
function buildCategorySelectBar(container, selected, onSelect) {
  container.innerHTML = '';

  const groups = [
    { key: 'caballero', label: 'Caballeros', cls: '' },
    { key: 'dama', label: 'Damas', cls: ' dama' },
  ];

  groups.forEach((g) => {
    const wrap = document.createElement('div');
    wrap.className = 'select-group';

    const label = document.createElement('label');
    label.textContent = g.label;
    label.htmlFor = 'select-' + g.key;

    const select = document.createElement('select');
    select.id = 'select-' + g.key;
    select.className = 'category-select' + g.cls;

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '—';
    select.appendChild(placeholder);

    CATEGORIES.filter((c) => c.group === g.key).forEach((c) => {
      const opt = document.createElement('option');
      opt.value = c.code;
      opt.textContent = c.label;
      select.appendChild(opt);
    });

    const selectedCat = CATEGORIES.find((c) => c.code === selected);
    select.value = selectedCat && selectedCat.group === g.key ? selected : '';

    select.addEventListener('change', () => {
      if (select.value) onSelect(select.value);
    });

    wrap.appendChild(label);
    wrap.appendChild(select);
    container.appendChild(wrap);
  });
}

/* ============================================================
   VISTA: TABLA DE POSICIONES
   ============================================================ */
function renderRankingTable(categoryCode) {
  const body = document.getElementById('ranking-body');
  if (!body) return;

  const rows = PLAYERS
    .filter((p) => p.category === categoryCode)
    .sort((a, b) => b.points - a.points);

  body.innerHTML = '';

  if (rows.length === 0) {
    body.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--ink-soft); padding:32px;">Todavía no hay jugadores anotados en ${categoryCode}.</td></tr>`;
    return;
  }

  rows.forEach((p, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="rank-pos ${i === 0 ? 'top1' : ''}">${i + 1}</td>
      <td>
        <div class="player-row">
          <span class="avatar">${initials(p.name)}</span>
          <span>${p.name}</span>
        </div>
      </td>
      <td>${p.category}</td>
      <td class="rank-points">${p.points}</td>
      <td class="trend ${p.trend}">${trendSymbol(p.trend)}</td>
    `;
    body.appendChild(tr);
  });
}

function initRankingView() {
  const bar = document.getElementById('ranking-category-bar');
  if (!bar) return;
  const initialCategory = CATEGORIES.find((c) => PLAYERS.some((p) => p.category === c.code))?.code || CATEGORIES[0].code;

  function select(code) {
    buildCategoryBar(bar, code, select);
    renderRankingTable(code);
  }
  select(initialCategory);
}

/* ============================================================
   VISTA: LLAVES
   ============================================================ */
function renderBracket(categoryCode) {
  const container = document.getElementById('bracket-container');
  if (!container) return;
  const data = BRACKETS[categoryCode];
  container.innerHTML = '';

  if (!data) {
    container.innerHTML = `<div class="table-card" style="padding:40px; text-align:center; color:var(--ink-soft);">Todavía no se armó la llave de <strong>${categoryCode}</strong>. Se publica cuando cierran las inscripciones.</div>`;
    return;
  }

  const scroll = document.createElement('div');
  scroll.className = 'bracket-scroll';
  const bracket = document.createElement('div');
  bracket.className = 'bracket';

  data.rounds.forEach((round) => {
    const col = document.createElement('div');
    col.className = 'bracket-round';
    const title = document.createElement('div');
    title.className = 'bracket-round-title';
    title.textContent = round.title;
    col.appendChild(title);

    round.matches.forEach((m) => {
      const match = document.createElement('div');
      match.className = 'match';
      match.innerHTML = `
        <div class="match-slot ${m.winner === 'a' ? 'winner' : ''}">
          <span>${m.a}</span><span class="score">${m.scoreA}</span>
        </div>
        <div class="match-slot ${m.winner === 'b' ? 'winner' : ''}">
          <span>${m.b}</span><span class="score">${m.scoreB}</span>
        </div>
      `;
      col.appendChild(match);
    });

    bracket.appendChild(col);
  });

  if (data.champion) {
    const champ = document.createElement('div');
    champ.className = 'champion-card';
    champ.innerHTML = `<div class="label">Campeón/a</div><div class="name">🏆 ${data.champion}</div>`;
    bracket.appendChild(champ);
  }

  scroll.appendChild(bracket);
  container.appendChild(scroll);
}

function initBracketView() {
  const bar = document.getElementById('bracket-category-bar');
  if (!bar) return;

  const me = PLAYERS.find((p) => p.id === CURRENT_USER_ID);
  const initialCategory = (me && BRACKETS[me.category])
    ? me.category
    : (Object.keys(BRACKETS)[0] || CATEGORIES[0].code);

  function select(code) {
    buildCategorySelectBar(bar, code, select);
    renderBracket(code);
  }
  select(initialCategory);
}

/* ============================================================
   VISTA: PREMIOS / REGLAS / INSCRIPCIONES
   ============================================================ */
function initPremiosView() {
  // Sub-tabs
  document.querySelectorAll('#view-premios .tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#view-premios .tab-btn').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('#view-premios .tab-panel').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });

  // Premios
  const podium = document.getElementById('podium');
  PRIZES.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'podium-card ' + p.place_class;
    card.innerHTML = `<div class="place">${p.place}</div><div class="prize">${p.prize}</div>`;
    podium.appendChild(card);
  });

  // Reglas
  const ruleList = document.getElementById('rule-list');
  RULES.forEach((rule, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="rule-num">${String(i + 1).padStart(2, '0')}</span><span>${rule}</span>`;
    ruleList.appendChild(li);
  });

  // Select de categorías del form de inscripción
  const catSelect = document.getElementById('categoria');
  CATEGORIES.forEach((c) => {
    const opt = document.createElement('option');
    opt.value = c.code;
    opt.textContent = `${c.label} — ${c.group === 'dama' ? 'Damas' : 'Caballeros'}`;
    catSelect.appendChild(opt);
  });

  // Form (todavía sin backend)
  document.getElementById('insc-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const notice = document.getElementById('insc-notice');
    notice.textContent = '¡Listo! Cuando esté conectada la base de datos, esta inscripción va a guardarse automáticamente.';
    e.target.reset();
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderHeroWidget();
  initRankingView();
  initBracketView();
  initPremiosView();
  goToView(currentViewFromHash());
});
