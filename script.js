const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Animate history cards when they enter viewport
const cards = document.querySelectorAll('.history-card');

function showCards() {
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;

  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top + scrollY;
    const cardHeight = card.offsetHeight;

    if (scrollY + windowHeight > cardTop + cardHeight / 4) {
      card.classList.add('show');
    }
  });
}

showCards();
window.addEventListener('scroll', showCards);

// Events Popup Modal
const eventsLink = document.getElementById('events-link');
const eventsPopup = document.getElementById('events-popup');
const closePopupBtn = document.getElementById('close-popup');

if (eventsLink && eventsPopup && closePopupBtn) {
  eventsLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent "#" scroll
    eventsPopup.style.display = 'flex';
  });

  closePopupBtn.addEventListener('click', () => {
    eventsPopup.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === eventsPopup) {
      eventsPopup.style.display = 'none';
    }
  });
}

// Ministries Popup Logic
const learnBtns = document.querySelectorAll('.learn-more-btn');
const ministryPopups = document.querySelectorAll('.ministry-popup-overlay');
const closeBtns = document.querySelectorAll('.close-ministry-popup');

learnBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const popupId = btn.getAttribute('data-popup');
    document.getElementById(popupId).style.display = 'flex';
  });
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.ministry-popup-overlay').style.display = 'none';
  });
});

window.addEventListener('click', (e) => {
  ministryPopups.forEach(popup => {
    if (e.target === popup) {
      popup.style.display = 'none';
    }
  });
});

// Mobile Auto Swipe for Ministries
// Mobile Slider for Ministries (fade-in style)
let ministryIndex = 0;
const ministryCards = document.querySelectorAll('.ministry-card');

function showActiveMinistryCard(index) {
  ministryCards.forEach((card, i) => {
    card.classList.remove('active');
    if (i === index) card.classList.add('active');
  });
}

function autoRotateMinistries() {
  if (window.innerWidth <= 768) {
    showActiveMinistryCard(ministryIndex);
    ministryIndex = (ministryIndex + 1) % ministryCards.length;
  }
}

// Initial call
showActiveMinistryCard(ministryIndex);

// Rotate every 3 seconds
setInterval(autoRotateMinistries, 2000);


