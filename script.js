const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.18 });
revealElements.forEach((el) => observer.observe(el));

const parallaxElements = document.querySelectorAll('[data-speed]');
const progressBar = document.getElementById('progressBar');
let ticking = false;

function updateScrollEffects() {
  const y = window.scrollY;
  parallaxElements.forEach((el) => {
    const speed = reducedMotion.matches ? 0 : Number(el.dataset.speed || 0);
    const rect = el.parentElement.getBoundingClientRect();
    const relative = -rect.top;
    if (rect.bottom > -300 && rect.top < window.innerHeight + 300) {
      el.style.transform = `translate3d(0, ${relative * speed}px, 0)`;
    }
  });

  const max = document.documentElement.scrollHeight - window.innerHeight;
  const percent = max > 0 ? (y / max) * 100 : 0;
  progressBar.style.width = `${percent}%`;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
}, { passive: true });

updateScrollEffects();

// LAB 2: mouse/touch click events manipulate the wish list and listing DOM.
const priorities = new Set();
const listings = [...document.querySelectorAll('.listing')];
document.querySelectorAll('[data-priority]').forEach(button => {
  button.addEventListener('click', () => {
    const priority = button.dataset.priority;
    priorities.has(priority) ? priorities.delete(priority) : priorities.add(priority);
    button.setAttribute('aria-pressed', String(priorities.has(priority)));
    let count = 0;
    listings.forEach(card => {
      card.hidden = ![...priorities].every(p => card.dataset.match.split(' ').includes(p));
      if (!card.hidden) count++;
    });
    document.getElementById('matchCount').textContent = `${count} matching ${count === 1 ? 'home' : 'homes'} · illustrated examples`;
    document.getElementById('wishFeedback').textContent = priorities.size ? `${priorities.size} priorities selected. Scroll to see your matches.` : 'Choose what matters most. Your matching homes will update below.';
    updateScrollEffects();
  });
});
let selectedHome = '';
let offerTimer;
document.querySelectorAll('.choose-home').forEach(button => {
  button.addEventListener('click', () => {
    window.clearTimeout(offerTimer);
    selectedHome = button.dataset.home;
    listings.forEach(card => card.classList.toggle('chosen', card.contains(button)));
    document.querySelectorAll('.choose-home').forEach(b => { b.textContent = b === button ? 'Selected ✓' : 'Choose this home'; b.setAttribute('aria-pressed', String(b === button)); });
    document.getElementById('tourHome').textContent = `Your showing: ${selectedHome}`;
    document.getElementById('offerHome').textContent = `Your choice: ${selectedHome}`;
    document.getElementById('offerStatus').textContent = 'READY FOR YOUR DECISION';
    document.getElementById('submitOffer').disabled = false;
    document.getElementById('acceptedMessage').textContent = 'Your next chapter is waiting.';
    document.getElementById('visit').scrollIntoView({behavior: reducedMotion.matches ? 'auto' : 'smooth'});
  });
});
// Keyboard events are scoped to the tour so arrows still work elsewhere.
const rooms = [
  ['Living room', 'Morning light, a comfortable gathering space, and a view of the garden.'],
  ['Kitchen', 'An open counter, space to cook, and room for conversations over dinner.'],
  ['Bedroom', 'A calm retreat, soft evening light, and space to unwind.']
];
let room = 0;
function changeRoom(direction) {
  room = (room + direction + rooms.length) % rooms.length;
  document.getElementById('roomTitle').textContent = rooms[room][0];
  document.getElementById('roomDescription').textContent = rooms[room][1];
  document.getElementById('roomCount').textContent = `${room + 1} / ${rooms.length}`;
  document.querySelector('.window-scene').dataset.room = room;
}
document.getElementById('previousRoom').addEventListener('click', () => changeRoom(-1));
document.getElementById('nextRoom').addEventListener('click', () => changeRoom(1));
document.querySelector('.tour-controls').addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    changeRoom(event.key === 'ArrowRight' ? 1 : -1);
  }
});
// BOM: window.setTimeout drives a delayed, visible response to an action.
document.getElementById('submitOffer').addEventListener('click', event => {
  event.currentTarget.disabled = true;
  document.getElementById('offerStatus').textContent = 'OFFER SENT · WAITING FOR A RESPONSE…';
  offerTimer = window.setTimeout(() => {
    document.getElementById('offerStatus').textContent = 'ACCEPTED · YOUR KEYS ARE NEXT';
    document.getElementById('acceptedMessage').textContent = `Congratulations. Your practice offer on ${selectedHome} was accepted.`;
  }, 1800);
});
// BOM: matchMedia reads the user's motion preference; resize recalculates progress.
window.addEventListener('resize', updateScrollEffects);
