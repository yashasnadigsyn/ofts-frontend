document.addEventListener('DOMContentLoaded', function() {
    const featureSection = document.getElementById('featureSection');
    const featureCards = document.querySelectorAll('.feature-card');
    let lastScrollTop = 0;
    let hasScrolled = false;
    let currentCardIndex = 0;

    // Function to show a card with animation
    function showCard(index) {
        if (index < featureCards.length) {
            featureCards[index].classList.add('visible');
            setTimeout(() => {
                showCard(index + 1);
            }, 300); // Delay between showing each card
        }
    }

    // Scroll event listener to show feature section and cards based on scroll direction
    window.addEventListener('scroll', function() {
        const currentScrollTop = window.scrollY;
        if (currentScrollTop > 300 && !hasScrolled) { // Scrolling down more to trigger feature section
            featureSection.classList.add('visible');
            showCard(currentCardIndex);
            hasScrolled = true;
        } else if (currentScrollTop <= 100 && hasScrolled) { // At the top
            featureSection.classList.remove('visible');
            featureCards.forEach(card => card.classList.remove('visible'));
            hasScrolled = false;
            currentCardIndex = 0; // Reset card index
        }
        lastScrollTop = currentScrollTop;
    });
});
