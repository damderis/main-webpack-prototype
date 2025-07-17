import '../styles/main.scss'; // Import global styles

// Import HTML templates
import heroContent from '../hero/index.html';
import card1Content from '../cards/card1/index.html';
import card2Content from '../cards/card2/index.html';

const appElement = document.getElementById('app');

function renderHero() {
  appElement.innerHTML = heroContent;

  // Attach scroll event listener after rendering
  const scrollContainer = document.querySelector(".dot-scroll");
  const circle = document.querySelector(".circle-hero");
  const dot = document.querySelector(".dot-hero");

  if (!scrollContainer || !circle || !dot) return;

  // Initialize dot position at the start angle
  initializeDotPosition(circle, dot);

  scrollContainer.addEventListener("scroll", () => {
    const scrollY = scrollContainer.scrollTop;
    const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;

    if (maxScroll <= 0) return;

    const scrollPercent = scrollY / maxScroll;

    // Counter-clockwise: start at 300°, end at 200°
    const startAngle = (240 * Math.PI) / 180;
    const endAngle = (170 * Math.PI) / 180;

    // Interpolate angle based on scrollPercent
    const angle = startAngle - scrollPercent * (startAngle - endAngle);

    // Get the bounding rect for absolute positioning relative to the page
    const circleRect = circle.getBoundingClientRect();

    // Reduce radius a bit more to ensure dot stays inside the circle
    const radius = (circle.offsetWidth - dot.offsetWidth) / 2 + 15; // subtract a few px for padding

    // Center of the circle relative to its own bounding box
    const centerX = circleRect.left + circle.offsetWidth / 2;
    const centerY = circleRect.top + circle.offsetHeight / 2;

    // Both x and y follow the circle's circumference
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    // Position the dot absolutely relative to the viewport
    dot.style.position = "fixed";
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.transform = "translate(-50%, -50%)";
  });
}

function renderCard1() {
  // Since we're using static HTML, we need to handle the active class differently
  appElement.innerHTML = `
    <div class="wrapper">
      <div class="card2-wrapper light">
        ${card1Content}
      </div>
    </div>
  `;
  
  // Set active class after rendering
  const selector = document.querySelector('.selector');
  if (selector) {
    const items = selector.querySelectorAll('li');
    items.forEach(item => {
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === '#/cards/card1') {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
}

function renderCard2() {
  appElement.innerHTML = `
    <div class="wrapper">
      <div class="card2-wrapper">
        ${card2Content}
      </div>
    </div>
  `;
  
  // Set active class after rendering
  const selector = document.querySelector('.selector');
  if (selector) {
    const items = selector.querySelectorAll('li');
    items.forEach(item => {
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === '#/cards/card2') {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
}

// Simple Hash-based Router
function router() {
  if (!appElement) {
    console.error("Element with id 'app' not found. Make sure it's in your src/index.pug.");
    return;
  }

  const path = window.location.hash.slice(1) || '/hero'; // Default to '/hero'

  if (path.startsWith('/cards/card1')) {
    renderCard1();
  } else if (path.startsWith('/cards/card2')) {
    renderCard2();
  } else { // Default to hero, including '/'
    renderHero();
  }
}

// Listen for hash changes to re-render
window.addEventListener('hashchange', router);

// Initial render when the DOM is ready
document.addEventListener('DOMContentLoaded', router);

// Initialize dot at the starting angle of the circle
function initializeDotPosition(circle, dot) {
  const startAngle = (240 * Math.PI) / 180;
  const circleRect = circle.getBoundingClientRect();
  const radius = (circle.offsetWidth - dot.offsetWidth) / 2 + 15;
  const centerX = circleRect.left + circle.offsetWidth / 2;
  const centerY = circleRect.top + circle.offsetHeight / 2;

  const x = centerX + radius * Math.cos(startAngle);
  const y = centerY + radius * Math.sin(startAngle);

  dot.style.position = "fixed";
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  dot.style.transform = "translate(-50%, -50%)";
}


