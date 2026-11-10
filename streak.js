function getStreakData() {
  return JSON.parse(localStorage.getItem('sb_streak') || '{"count":0,"lastDate":null,"history":[]}');
}

function saveStreakData(data) {
  localStorage.setItem('sb_streak', JSON.stringify(data));
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function logToday() {
  const data = getStreakData();
  const today = getTodayStr();

  if (data.lastDate === today) {
    const msg = document.getElementById('streak-msg');
    if (msg) msg.textContent = 'You already logged today. Keep it up!';
    return;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (data.lastDate === yesterdayStr) {
    data.count += 1;
  } else {
    data.count = 1;
  }

  data.lastDate = today;
  if (!data.history) data.history = [];
  data.history.push(today);
  if (data.history.length > 7) data.history = data.history.slice(-7);

  saveStreakData(data);
  renderStreak(data);

  const msg = document.getElementById('streak-msg');
  if (msg) {
    if (data.count === 1) msg.textContent = 'Great start! Keep going tomorrow.';
    else if (data.count < 5) msg.textContent = 'You are on a roll! ' + data.count + ' days!';
    else msg.textContent = 'Outstanding! ' + data.count + ' day streak!';
  }
}

function renderStreak(data) {
  const bigEl = document.getElementById('streak-big');
  const countEl = document.getElementById('streak-count');
  if (bigEl) bigEl.textContent = data.count;
  if (countEl) countEl.textContent = data.count;

  const weekEl = document.getElementById('streak-week');
  if (!weekEl) return;

  weekEl.innerHTML = '';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = getTodayStr();

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dStr = d.toISOString().split('T')[0];
    const dayName = days[d.getDay()];

    const dot = document.createElement('div');
    dot.className = 'day-dot';

    if (dStr === today) {
      dot.classList.add(data.lastDate === today ? 'day-done' : 'day-today');
    } else if (data.history && data.history.includes(dStr)) {
      dot.classList.add('day-done');
    } else {
      dot.classList.add('day-missed');
    }

    dot.textContent = dayName;
    weekEl.appendChild(dot);
  }
}

(function () {
  const data = getStreakData();
  renderStreak(data);
})();
