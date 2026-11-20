// Leonida Legend — GTA VI trophy guide & tracker.
// Offline: loads only its own files. Progress lives in localStorage; export/import moves it as a JSON file.
const KEY = 'gta6-trophy-checklist';           // kept from the starter: a JSON array of earned trophy names
const SPOILER_KEY = 'gta6-trophy-guide-spoilers';
const POINTS = { bronze: 15, silver: 30, gold: 90, platinum: 300 };
const GRADES = ['platinum', 'gold', 'silver', 'bronze'];

const doc = await (await fetch('data/trophies.json')).json();
const trophies = doc.trophies;
const byId = new Map(trophies.map((t) => [t.id, t]));
const byName = new Map(trophies.map((t) => [t.name, t]));

let earned = new Set(JSON.parse(localStorage.getItem(KEY) ?? '[]'));
let spoilers = localStorage.getItem(SPOILER_KEY) === '1';

const $ = (id) => document.getElementById(id);
const els = {
  cards: $('cards'), missableCards: $('missable-cards'), phases: $('phases'),
  search: $('search'), grade: $('f-grade'), kind: $('f-kind'), status: $('f-status'),
  secret: $('f-secret'), missable: $('f-missable'), spoilers: $('spoilers'),
  countLine: $('count-line'), empty: $('empty'),
};

// Kind filter options come from the data itself.
for (const kind of [...new Set(trophies.map((t) => t.kind))].sort()) {
  const opt = document.createElement('option');
  opt.value = kind; opt.textContent = kind;
  els.kind.append(opt);
}
els.spoilers.checked = spoilers;

function save() { localStorage.setItem(KEY, JSON.stringify([...earned])); }
function isEarned(t) { return earned.has(t.name); }
function isHidden(t) { return t.secret && !spoilers && !isEarned(t); }

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}

function badge(cls, text) { return el('span', `badge ${cls}`, text); }

function trophyCard(t) {
  const card = el('article', `card grade-${t.grade}${isEarned(t) ? ' earned' : ''}`);
  const top = el('div', 'card-top');

  const boxWrap = el('label', 'checkbox');
  const box = document.createElement('input');
  box.type = 'checkbox';
  box.checked = isEarned(t);
  box.setAttribute('aria-label', `Mark ${t.name} as earned`);
  box.addEventListener('change', () => {
    if (box.checked) earned.add(t.name); else earned.delete(t.name);
    save(); renderAll();
  });
  boxWrap.append(box);
  top.append(boxWrap);

  const hidden = isHidden(t);
  top.append(el('h3', 'trophy-name', hidden ? 'Secret trophy' : t.name));

  const badges = el('div', 'badges');
  badges.append(badge(`grade-${t.grade}`, t.grade));
  if (t.kind.toLowerCase() !== t.grade) badges.append(badge('kind', t.kind));
  if (t.missable) badges.append(badge('missable', 'Missable'));
  if (t.secret) badges.append(badge('secret', 'Secret'));
  if (isEarned(t)) badges.append(badge('done', 'Earned'));
  top.append(badges);
  card.append(top);

  if (hidden) {
    card.append(el('p', 'hidden-note',
      'Hidden to protect you from spoilers. Earn it in game, or tick “Show spoilers” to reveal its name, description and guide.'));
  } else {
    card.append(el('p', 'desc', `“${t.description}”`));
    card.append(el('p', 'guide', t.guide));
  }
  card.append(el('p', 'sources', `Sources: ${t.sources}`));
  return card;
}

function matches(t) {
  const q = els.search.value.trim().toLowerCase();
  if (els.grade.value !== 'all' && t.grade !== els.grade.value) return false;
  if (els.kind.value !== 'all' && t.kind !== els.kind.value) return false;
  if (els.status.value === 'earned' && !isEarned(t)) return false;
  if (els.status.value === 'unearned' && isEarned(t)) return false;
  if (els.secret.value === 'secret' && !t.secret) return false;
  if (els.secret.value === 'regular' && t.secret) return false;
  if (els.missable.checked && !t.missable) return false;
  if (q) {
    const hay = `${t.name} ${t.description} ${t.guide} ${t.kind} ${t.grade}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function renderSummary() {
  const total = trophies.length;
  const got = trophies.filter(isEarned);
  const points = got.reduce((s, t) => s + POINTS[t.grade], 0);
  const maxPoints = trophies.reduce((s, t) => s + POINTS[t.grade], 0);
  $('stat-count').textContent = `${got.length} / ${total}`;
  $('stat-percent').textContent = `${Math.round((got.length / total) * 100)}%`;
  $('stat-points').textContent = `${points} / ${maxPoints}`;
  $('stat-left').textContent = `${total - got.length}`;
  $('bar-fill').style.width = `${(got.length / total) * 100}%`;
  const gb = $('grade-bars');
  gb.replaceChildren();
  for (const g of GRADES) {
    const all = trophies.filter((t) => t.grade === g);
    const have = all.filter(isEarned).length;
    const span = el('span');
    const dot = el('span', `dot ${g}`);
    span.append(dot, document.createTextNode(`${g[0].toUpperCase() + g.slice(1)} `));
    span.append(el('b', '', `${have}/${all.length}`));
    gb.append(span);
  }
}

function renderChecklist() {
  const shown = trophies.filter(matches);
  els.cards.replaceChildren(...shown.map(trophyCard));
  els.empty.hidden = shown.length > 0;
  els.countLine.textContent =
    `Showing ${shown.length} of ${trophies.length} trophies · ${earned.size} earned overall · ` +
    `${trophies.filter((t) => t.missable).length} flagged missable · ${trophies.filter((t) => t.secret).length} secret`;
}

/* ---------------- Roadmap to the Platinum ---------------- */
const ROADMAP = [
  {
    title: 'Story first, eyes open',
    text: 'Play the campaign from Gone Fishing to the final mission. The thirteen story trophies unlock on the path, and the story opens the map, the partners and most systems the rest of the list uses. This is also when the one-chance moments happen, so the warnings below matter more than any grinding you could be doing instead.',
    ids: [2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 7],
    warn: 'Watch for: Actions Speak Louder (make every choice actively) and Bad Luck, I Guess (take retries and succeed on them instead of reloading). Save manually before the final mission.',
    extraIds: [48, 49],
  },
  {
    title: 'People of Leonida: strangers & side stories',
    text: 'Clear the stranger strands: Andy, Kenton, Billy, Randy and Tyrone each end in a trophy of their own, Bret sends you hunting, and any eight finished strands bank the silver Strangers & Freaks. Strands unlock in stages, so work them between other tasks whenever a new step appears on the map.',
    ids: [22, 23, 24, 26, 27, 29, 25],
  },
  {
    title: 'Activities & minigames tour',
    text: 'Sample everything once for Master of None, then go back and win what needs winning: gold medals in all 42 Shooting Range challenges, a Top Fun drone race win at all 14 locations, 20 different race wins, Cal beaten at fishing, an arcade game completed, meditation at all 18 spots, a cocktail on Ocean Beach and a game at the Kolt & Associates bowling alley.',
    ids: [16, 17, 18, 19, 20, 21, 28, 44, 46],
  },
  {
    title: 'Collectibles & the grand tour',
    text: 'See the whole state. Complete any 3 Collectible Card sets, WAiNK It at 100 locations, and visit all 52 areas of Leonida for The Goodtime State. Discovering 100 vehicles belongs to this phase too: get in and drive everything new you see while you travel.',
    ids: [30, 31, 42, 35],
  },
  {
    title: 'Crime, combat & the duo',
    text: 'The hands-on phase. Rob the jewelry store unseen, 5 bank vaults, an armored truck and one illegal operation for each of the 9 gangs; escape VCIA in a stolen plane; drop 5 enemies in one Combat Focus; knock someone down with a melee drive-by; and do the partner jobs with both leads together: lose a 4-star wanted level as a pair, rob 3 shops back-to-back, and whatever Personal Best turns out to be. Keep an ear out at night for The Truth Is Out There, and a heavy weapon ready for the Rhino.',
    ids: [39, 40, 41, 43, 37, 36, 51, 33, 34, 47, 50, 38, 45],
  },
  {
    title: 'Money, property & the long counters',
    text: 'Turn crime into bookkeeping. Launder $250,000 of Marked Bills through your contacts, spend $100,000 across all shops, buy all 8 garage properties, and register 10 vehicles in the Scooter Bros app. The two big counters finish here as well: 250 stunts and 50 challenges, both of which should be close after five phases of playing.',
    ids: [52, 53, 54, 55, 15, 32],
  },
  {
    title: '100% and the platinum',
    text: 'Open the completion checklist and sweep whatever is left: an unfinished strand, a missed area, a handful of stunts. When A Long Road pops at 100%, the platinum, Vice Got a Price!, follows automatically as the 55th trophy. Welcome to Leonida, legend.',
    ids: [14, 1],
  },
];

function chip(t) {
  const c = el('span', `chip${isEarned(t) ? ' got' : ''}${t.missable ? ' miss' : ''}`,
    `${isEarned(t) ? '✓ ' : ''}${isHidden(t) ? 'Secret trophy' : t.name}`);
  c.title = `${t.grade} · ${t.kind}${t.missable ? ' · missable' : ''}`;
  return c;
}

function renderRoadmap() {
  els.phases.replaceChildren();
  ROADMAP.forEach((phase, i) => {
    const ids = [...phase.ids, ...(phase.extraIds ?? [])];
    const list = ids.map((id) => byId.get(id)).filter(Boolean);
    const done = list.filter(isEarned).length;
    const sec = el('section', 'phase');
    const h = el('h3');
    h.append(el('span', 'phase-num', `Phase ${i + 1}`), document.createTextNode(phase.title));
    h.append(el('span', 'phase-progress', `${done}/${list.length}`));
    sec.append(h);
    sec.append(el('p', '', phase.text));
    const chips = el('div', 'chips');
    chips.append(...list.map(chip));
    sec.append(chips);
    if (phase.warn) sec.append(el('p', 'warn', `⚠ ${phase.warn}`));
    els.phases.append(sec);
  });
}

function renderMissable() {
  const list = trophies.filter((t) => t.missable);
  els.missableCards.replaceChildren(...list.map(trophyCard));
}

function renderAll() { renderSummary(); renderChecklist(); renderRoadmap(); renderMissable(); }

/* ---------------- views ---------------- */
document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('active', b === tab));
    for (const v of ['checklist', 'roadmap', 'missable']) {
      $(`view-${v}`).hidden = v !== tab.dataset.view;
    }
    window.scrollTo({ top: 0 });
  });
});

/* ---------------- controls ---------------- */
for (const input of [els.search, els.grade, els.kind, els.status, els.secret, els.missable]) {
  input.addEventListener('input', renderChecklist);
  input.addEventListener('change', renderChecklist);
}
els.spoilers.addEventListener('change', () => {
  spoilers = els.spoilers.checked;
  localStorage.setItem(SPOILER_KEY, spoilers ? '1' : '0');
  renderAll();
});

$('export').addEventListener('click', () => {
  const payload = {
    game: doc.game, platform: doc.platform, exported: new Date().toISOString(),
    earned: [...earned],
  };
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
  a.download = 'gta6-trophy-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
});
$('import').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const names = Array.isArray(data) ? data : data.earned;
    if (!Array.isArray(names)) throw new Error('no earned list');
    earned = new Set(names.filter((n) => byName.has(n)));
    save(); renderAll();
  } catch {
    els.countLine.textContent = 'That import file could not be read as trophy progress; nothing was changed.';
  }
  e.target.value = '';
});

renderAll();
