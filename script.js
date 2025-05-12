document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for Table of Contents links
    const tocLinks = document.querySelectorAll('#table-of-contents a[href^="#"]');
    const header = document.querySelector('header'); // For scroll offset
    const headerHeight = header ? header.offsetHeight + 20 : 60; // Estimate header height + margin

    tocLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scrolling for "Back to Top" links
    const backToTopLinks = document.querySelectorAll('a.back-to-top');
    backToTopLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href'); // Should be #table-of-contents
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                 targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Toggle functionality for question blocks
    const questionTitles = document.querySelectorAll('.question-block .question-title');

    questionTitles.forEach(title => {
        title.addEventListener('click', () => {
            const answerDiv = title.nextElementSibling; // Assumes .answer-guidance is the immediate next sibling
            const toggleIcon = title.querySelector('.toggle-icon');

            if (answerDiv && answerDiv.classList.contains('answer-guidance')) {
                if (answerDiv.style.display === 'none' || !answerDiv.style.display) {
                    answerDiv.style.display = 'block';
                    title.classList.add('active');
                    if (toggleIcon) toggleIcon.textContent = '[-]';
                } else {
                    answerDiv.style.display = 'none';
                    title.classList.remove('active');
                    if (toggleIcon) toggleIcon.textContent = '[+]';
                }
            }
        });

        // Add keyboard accessibility (Enter or Space to toggle)
        title.setAttribute('tabindex', '0'); // Make it focusable
        title.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Prevent page scroll on Space
                title.click(); // Trigger the click event handler
            }
        });
    });


    console.log("Interactive Single-page GenAI Guide Initialized.");
});