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
