document.addEventListener('DOMContentLoaded', () => {
    const pawContainer = document.getElementById('paw-container');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    let lastX = 0;
    let lastY = 0;
    let pawInterval;

    // Paw print functionality
    document.addEventListener('mousemove', (e) => {
        lastX = e.clientX;
        lastY = e.clientY;
    });

    function createPawPrint() {
        const paw = document.createElement('div');
        paw.className = 'paw-print';
        
        // Calculate rotation based on mouse movement
        const rotation = Math.random() * 360;
        paw.style.setProperty('--rotation', `${rotation}deg`);
        
        // Position the paw print
        paw.style.left = `${lastX - 10}px`;
        paw.style.top = `${lastY - 10}px`;
        
        pawContainer.appendChild(paw);

        // Remove paw print after animation
        setTimeout(() => {
            paw.remove();
        }, 1000);
    }

    // Create paw prints while mouse is moving
    document.addEventListener('mousemove', () => {
        clearInterval(pawInterval);
        pawInterval = setInterval(createPawPrint, 150);
    });

    // Stop creating paw prints when mouse stops
    document.addEventListener('mousestop', () => {
        clearInterval(pawInterval);
    });

    // Custom mouse stop event
    let mouseStopTimer;
    document.addEventListener('mousemove', () => {
        clearTimeout(mouseStopTimer);
        mouseStopTimer = setTimeout(() => {
            document.dispatchEvent(new Event('mousestop'));
        }, 150);
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle copy button clicks
    const copyButtons = document.querySelectorAll('.copy-address');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const textToCopy = button.querySelector('span').textContent;
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Visual feedback
                const icon = button.querySelector('i');
                icon.classList.remove('fa-copy');
                icon.classList.add('fa-check', 'copy-success');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    icon.classList.remove('fa-check', 'copy-success');
                    icon.classList.add('fa-copy');
                }, 2000);
                
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });
});