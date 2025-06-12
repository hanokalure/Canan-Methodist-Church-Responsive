const supabaseURL = 'https://mcnfkqomsmtwjfinagux.supabase.co/rest/v1/contact_form';
const supabaseAPIKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jbmZrcW9tc210d2pmaW5hZ3V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MzIyMzcsImV4cCI6MjA2NTEwODIzN30.hVqalwNmupgBUKR1spNPKZ9Rw_59ewDwf2WPMOcwqOQ';

const form = document.getElementById('myForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  fetch(supabaseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseAPIKey,
      'Authorization': 'Bearer ' + supabaseAPIKey,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(responseData => {
      console.log('Response Data:', responseData);
      alert('Form submitted successfully!');
      form.reset();
    })
    .catch(error => {
      console.error('Error!', error.message);
      alert('Failed to submit form. Please try again.');
    });
});

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


// Committee Card Animation
const committeeItems = document.querySelectorAll('.committee-item');
const committeeWrapper = document.querySelector('.committee-wrapper');
let committeeIndex = 0;

function updateCommitteeCards() {
  if (window.innerWidth > 768) {
    // Desktop: show 4 at a time
    committeeItems.forEach((item, i) => {
      item.style.display = (i >= committeeIndex && i < committeeIndex + 4) ? 'block' : 'none';
    });
    committeeIndex = (committeeIndex + 4) % committeeItems.length;
  } else {
    // Mobile: show 1 at a time with animation
    committeeItems.forEach((item, i) => {
      item.classList.remove('active');
      if (i === committeeIndex) item.classList.add('active');
      else item.classList.remove('active');
    });
    committeeIndex = (committeeIndex + 1) % committeeItems.length;
  }
}

// Start animation
updateCommitteeCards();
setInterval(updateCommitteeCards, 2000);

// Reset view on resize
window.addEventListener('resize', () => {
  committeeIndex = 0;
  updateCommitteeCards();
});
