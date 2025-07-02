function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
    }
}

// ==================== CARD 3D TILT & GLOW EFFECT ====================
// Adds a 3D tilt and glow effect to each card on mouse movement
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        // Get card dimensions and mouse position
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Calculate rotation based on mouse position
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;
        // Apply transform and shadow
        card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
        card.style.boxShadow = `${-rotateY*2}px ${rotateX*2}px 32px 0 #0099cc55, 0 2px 16px #0008`;
    });
    card.addEventListener('mouseleave', () => {
        // Reset transform and shadow when mouse leaves
        card.style.transform = '';
        card.style.boxShadow = '';
    });
    card.addEventListener('mouseenter', () => {
        // Smooth transition on enter
        card.style.transition = 'transform 0.2s, box-shadow 0.2s';
    });
});

// ==================== CARD CLICK: RIPPLE EFFECT & MODAL POP-UP ====================
// Adds a ripple effect and shows a modal with card details on click
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(e) {
        // --- Ripple effect ---
        let ripple = document.createElement('span');
        ripple.className = 'card-ripple';
        ripple.style.left = `${e.offsetX}px`;
        ripple.style.top = `${e.offsetY}px`;
        card.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);

        // --- Show modal with card image and title ---
        const img = card.querySelector('img');
        const text = card.querySelector('p');
        document.getElementById('modalImg').src = img.src;
        document.getElementById('modalImg').alt = img.alt;
        document.getElementById('modalTitle').textContent = text.textContent;
        document.getElementById('card-modal').classList.add('show');
    });
});

// ==================== MODAL CLOSE LOGIC ====================
// Closes the modal when the close button or outside the modal is clicked
document.getElementById('cardModalClose').onclick = function() {
    document.getElementById('card-modal').classList.remove('show');
};
window.onclick = function(event) {
    const modal = document.getElementById('card-modal');
    // Close modal if clicking outside the modal content
    if (event.target === modal) {
        modal.classList.remove('show');
    }
};

// ==================== HAMBURGER MENU TOGGLE FOR NAVIGATION ====================
// Toggles the navigation menu open/close on hamburger click
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.onclick = function() {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open');
};
// Closes the nav menu if window is resized to desktop size
window.addEventListener('resize', () => {
    if(window.innerWidth > 768) {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('open');
    }
});
