const categories = [
  {
    title: 'Mejor Creador Tech Nica',
    nominees: ['ByteManagua', 'Doña Dev', 'Nica Cloud Labs']
  },
  {
    title: 'Streamer Gaming del Año',
    nominees: ['LagZero504', 'Masaya Plays', 'RetroPinolero']
  },
  {
    title: 'Proyecto Anime Comunidad',
    nominees: ['Otaku León Fest', 'Manga Granada Club', 'Anime Caribe Nica']
  },
  {
    title: 'Innovación Digital Nicaragüense',
    nominees: ['Mercado App Nica', 'EduTech Xiloá', 'IA para el Campo']
  }
];

const votesKey = 'oppailand-votes-v1';
const themeKey = 'oppailand-theme';
const awardsGrid = document.getElementById('awardsGrid');
const resetVotesBtn = document.getElementById('resetVotes');
const themeToggle = document.getElementById('themeToggle');

const loadVotes = () => {
  const data = localStorage.getItem(votesKey);
  return data ? JSON.parse(data) : {};
};

const saveVotes = (votes) => localStorage.setItem(votesKey, JSON.stringify(votes));

const incrementVote = (category, nominee) => {
  const votes = loadVotes();
  votes[category] ??= {};
  votes[category][nominee] = (votes[category][nominee] || 0) + 1;
  saveVotes(votes);
  render();
};

const render = () => {
  const votes = loadVotes();
  awardsGrid.innerHTML = categories
    .map(({ title, nominees }) => {
      const nomineeRows = nominees
        .map((name) => {
          const count = votes?.[title]?.[name] || 0;
          return `
            <div class="nominee">
              <span>${name} · <strong>${count}</strong> voto(s)</span>
              <button class="vote-btn" data-category="${title}" data-nominee="${name}">Votar</button>
            </div>
          `;
        })
        .join('');

      return `
        <article class="card">
          <h4>${title}</h4>
          ${nomineeRows}
        </article>
      `;
    })
    .join('');

  document.querySelectorAll('.vote-btn').forEach((btn) => {
    btn.addEventListener('click', () =>
      incrementVote(btn.dataset.category, btn.dataset.nominee)
    );
  });
};

const applyTheme = (theme) => {
  const isLight = theme === 'light';
  document.documentElement.classList.toggle('light', isLight);
  themeToggle.textContent = isLight ? '🌌 Modo oscuro' : '⚡ Modo neón';
};

resetVotesBtn.addEventListener('click', () => {
  localStorage.removeItem(votesKey);
  render();
});

themeToggle.addEventListener('click', () => {
  const currentTheme = localStorage.getItem(themeKey) === 'light' ? 'light' : 'dark';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem(themeKey, nextTheme);
  applyTheme(nextTheme);
});

applyTheme(localStorage.getItem(themeKey) || 'dark');
render();
