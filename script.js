// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Certificate Modal - Documents Folder
const modal = document.getElementById('certificateModal');
const modalImg = document.getElementById('modalCertificate');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.view-cert').forEach(button => {
    button.addEventListener('click', function() {
        const imgSrc = this.getAttribute('data-img');
        const certTitle = this.closest('.certificate-card').querySelector('h3').textContent;
        const certDesc = this.closest('.certificate-card').querySelector('p').textContent;
        
        // Check if button text is "Coming Soon"
        if (this.textContent === 'Coming Soon' || this.textContent === 'View Demo') {
            // Show coming soon message
            modalImg.src = '';
            modalImg.alt = certTitle + ' Certificate';
            modalImg.style.background = 'linear-gradient(135deg, #6C63FF, #36D1DC)';
            modalImg.style.display = 'flex';
            modalImg.style.alignItems = 'center';
            modalImg.style.justifyContent = 'center';
            modalImg.style.color = 'white';
            modalImg.style.fontSize = '1.4rem';
            modalImg.style.fontWeight = '600';
            modalImg.style.padding = '50px';
            modalImg.style.textAlign = 'center';
            modalImg.style.lineHeight = '1.8';
            modalImg.style.borderRadius = '10px';
            modalImg.textContent = certTitle + '\n\n' + certDesc + '\n\n' + 'Certificate will be available soon!';
            
            modal.style.display = 'flex';
            return;
        }
        
        // For actual certificates
        const imgPath = imgSrc; // Already has "documents/" prefix
        
        // Create a test image
        const testImg = new Image();
        testImg.onload = function() {
            // Image exists
            modalImg.src = imgPath;
            modalImg.alt = certTitle + ' Certificate';
            modalImg.style.background = 'none';
            modalImg.textContent = '';
            modalImg.style.padding = '0';
            modal.style.display = 'flex';
        };
        
        testImg.onerror = function() {
            // Image doesn't exist
            modalImg.src = '';
            modalImg.alt = certTitle + ' Certificate';
            modalImg.style.background = 'linear-gradient(135deg, #6C63FF, #36D1DC)';
            modalImg.style.display = 'flex';
            modalImg.style.alignItems = 'center';
            modalImg.style.justifyContent = 'center';
            modalImg.style.color = 'white';
            modalImg.style.fontSize = '1.3rem';
            modalImg.style.fontWeight = '600';
            modalImg.style.padding = '40px';
            modalImg.style.textAlign = 'center';
            modalImg.style.lineHeight = '1.6';
            modalImg.style.borderRadius = '10px';
            modalImg.textContent = certTitle + '\n\n' + certDesc + '\n\n' + 'Place certificate image in:\n' + imgPath;
            
            modal.style.display = 'flex';
        };
        
        testImg.src = imgPath;
    });
});

closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    // Reset image styles
    modalImg.style.background = '';
    modalImg.textContent = '';
    modalImg.style.padding = '';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        // Reset image styles
        modalImg.style.background = '';
        modalImg.textContent = '';
        modalImg.style.padding = '';
    }
});
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Current year in footer
    const yearSpan = document.querySelector('.copyright');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = yearSpan.textContent.replace('2025', currentYear);
    }
    
    // Profile image hover effect
    const profilePic = document.getElementById('profile-pic');
    if (profilePic) {
        profilePic.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        profilePic.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Animate education cards on scroll
    const educationCards = document.querySelectorAll('.education-card');
    const eduObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    educationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        eduObserver.observe(card);
    });
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item, .edu-timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        timelineObserver.observe(item);
    });
});

// Add window load event for additional animations
window.addEventListener('load', function() {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Animate profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.style.opacity = '0';
        profileImage.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            profileImage.style.transition = 'opacity 1s ease, transform 1s ease';
            profileImage.style.opacity = '1';
            profileImage.style.transform = 'scale(1)';
        }, 600);
    }
});