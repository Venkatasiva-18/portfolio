console.log('Script loaded!');

// Dynamic Role Text
const roles = [
    "Web Developer",
    "UI Designer",
    "Problem Solver",
    "Tech Enthusiast"
];

console.log('Roles array initialized:', roles);

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100; // Speed in milliseconds

function typeRole() {
    const currentRole = roles[roleIndex];
    const roleElement = document.getElementById('role-text');

    if (isDeleting) {
        // Remove a character
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add a character
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    // If word is complete
    if (!isDeleting && charIndex === currentRole.length) {
        // Make a pause before deleting
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        // Move to next role
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeRole, typingSpeed);
}

// Start the typing effect when the page loads
document.addEventListener('DOMContentLoaded', typeRole);

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = `${progress}%`;
            
            // Animate the percentage text
            const percentageText = progressBar.querySelector('.skill-percentage');
            let currentProgress = 0;
            const targetProgress = parseInt(progress);
            const duration = 1000; // 1 second
            const interval = 20; // Update every 20ms
            const steps = duration / interval;
            const increment = targetProgress / steps;

            const animatePercentage = () => {
                currentProgress += increment;
                if (currentProgress >= targetProgress) {
                    currentProgress = targetProgress;
                }
                percentageText.textContent = `${Math.round(currentProgress)}%`;
                if (currentProgress < targetProgress) {
                    setTimeout(animatePercentage, interval);
                }
            };

            animatePercentage();
        }
    });
};

const observer = new IntersectionObserver(animateSkillBars, {
    threshold: 0.5
});

skillBars.forEach(bar => {
    observer.observe(bar);
});

// Handle contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    
    // Submit form to FormSubmit
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Clear form inputs
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
            
            // Redirect to thank you page
            window.location.href = 'thanks.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}); 