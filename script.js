// WhatsApp Integration Functions
const WHATSAPP_NUMBER = "+1234567890"; // Replace with your actual WhatsApp number

/**
 * Opens WhatsApp chat with pre-filled message
 * @param {string} type - Type of interaction (general, contact, product order, etc.)
 * @param {string} productName - Name of the product (for product orders)
 * @param {string} productPrice - Price of the product (for product orders)
 */
function openWhatsApp(type, productName = '', productPrice = '') {
    let message = '';
    
    switch (type) {
        case 'general':
            message = "Hi! I'm interested in your products. Can you help me with more information?";
            break;
        case 'contact':
            message = "Hello! I'd like to get in touch with your customer service team.";
            break;
        case 'footer':
            message = "Hi! I found your website and I'm interested in your products.";
            break;
        case 'floating':
            message = "Hello! I need assistance with your products.";
            break;
        case 'product':
            message = `Hi! I'm interested in ordering the ${productName} priced at ${productPrice}. Can you provide more details about availability, shipping, and payment options?`;
            break;
        default:
            message = "Hello! I'm interested in your products.";
    }
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab/window
    window.open(whatsappURL, '_blank');
    
    // Track the interaction (you can add analytics here)
    trackWhatsAppInteraction(type, productName);
}

/**
 * Specific function for product orders
 * @param {string} productName - Name of the product
 * @param {string} productPrice - Price of the product
 */
function orderProduct(productName, productPrice) {
    openWhatsApp('product', productName, productPrice);
}

/**
 * Track WhatsApp interactions for analytics
 * @param {string} type - Type of interaction
 * @param {string} productName - Product name (if applicable)
 */
function trackWhatsAppInteraction(type, productName = '') {
    // You can integrate with Google Analytics, Facebook Pixel, or other tracking services
    console.log(`WhatsApp interaction: ${type}`, productName ? `Product: ${productName}` : '');
    
    // Example: Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
            'event_category': 'engagement',
            'event_label': type,
            'custom_parameter_1': productName
        });
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe product cards and feature cards
    const animatedElements = document.querySelectorAll('.product-card, .feature-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Product card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// WhatsApp floating button animation
document.addEventListener('DOMContentLoaded', function() {
    const floatingBtn = document.querySelector('.whatsapp-float');
    
    // Add click ripple effect
    floatingBtn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form validation and enhancement (if needed for future forms)
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.phone || !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    return errors;
}

// Utility function to format currency
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Utility function to check if user is on mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Enhanced WhatsApp integration for mobile
if (isMobileDevice()) {
    // Optimize for mobile WhatsApp app
    console.log('Mobile device detected - optimizing WhatsApp integration');
}

// Add loading states for buttons
function addLoadingState(button, text = 'Processing...') {
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>${text}`;
    button.disabled = true;
    
    return function removeLoadingState() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Error handling for WhatsApp integration
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    
    // If WhatsApp fails, provide fallback
    if (e.error && e.error.message && e.error.message.includes('whatsapp')) {
        alert('Unable to open WhatsApp. Please contact us at +1234567890 or email info@premiumstore.com');
    }
});

// Performance optimization: Lazy load images when implemented
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// SEO and accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add skip navigation link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only sr-only-focusable';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.width = '1px';
    skipLink.style.height = '1px';
    skipLink.style.padding = '0';
    skipLink.style.margin = '-1px';
    skipLink.style.overflow = 'hidden';
    skipLink.style.clip = 'rect(0,0,0,0)';
    skipLink.style.border = '0';
    
    skipLink.addEventListener('focus', function() {
        this.style.position = 'static';
        this.style.width = 'auto';
        this.style.height = 'auto';
        this.style.padding = '8px 16px';
        this.style.margin = '0';
        this.style.overflow = 'visible';
        this.style.clip = 'auto';
        this.style.backgroundColor = '#007bff';
        this.style.color = 'white';
        this.style.textDecoration = 'none';
        this.style.zIndex = '9999';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.setAttribute('role', 'main');
        productsSection.id = 'main-content';
    }
});
