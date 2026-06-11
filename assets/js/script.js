document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Dark Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        if(themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    // Sticky Navbar & Scroll to Top
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if(navbar) navbar.classList.add('shadow-sm');
        } else {
            if(navbar) navbar.classList.remove('shadow-sm');
        }

        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Toast Notifications for UI actions
    const showToast = (message) => {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-white bg-secondary-brand border-0 show';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // Add to Cart / Wishlist Mock actions
    const actionBtns = document.querySelectorAll('.action-btn, .btn-premium:not([type="submit"])');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.closest('a')) return; // Ignore if it's an actual link
            e.preventDefault();
            const icon = btn.querySelector('i');
            if (icon && icon.classList.contains('fa-shopping-cart')) {
                showToast('<i class="fas fa-check-circle me-2"></i> Added to Cart!');
            } else if (icon && icon.classList.contains('fa-heart')) {
                showToast('<i class="fas fa-heart me-2"></i> Added to Wishlist!');
            } else if (btn.textContent.toLowerCase().includes('cart')) {
                showToast('<i class="fas fa-check-circle me-2"></i> Item Added to Cart!');
            }
        });
    });

    // Form Validation (Eye Test & Contact)
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault(); // Prevent actual submission for demo
                showToast('<i class="fas fa-paper-plane me-2"></i> Request submitted successfully!');
                form.reset();
                form.classList.remove('was-validated');
                return false;
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Product Image Gallery logic (for product.html)
    const mainImg = document.getElementById('mainProductImg');
    const thumbs = document.querySelectorAll('.thumb-item img');
    
    if (mainImg && thumbs.length > 0) {
        thumbs.forEach(thumb => {
            thumb.parentElement.addEventListener('click', function() {
                // Remove active class
                document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
                // Add active class
                this.classList.add('active');
                // Change main image
                mainImg.src = this.src;
                // Add tiny animation
                mainImg.style.opacity = 0.5;
                setTimeout(() => {
                    mainImg.style.opacity = 1;
                }, 50);
            });
        });
    }

});
