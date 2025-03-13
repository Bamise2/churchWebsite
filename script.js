// The Supernatural Assembly - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const icon = otherItem.querySelector('.faq-toggle i');
                    if (icon) {
                        icon.className = 'fas fa-plus';
                    }
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
            const icon = item.querySelector('.faq-toggle i');
            if (icon) {
                icon.className = item.classList.contains('active') ? 'fas fa-minus' : 'fas fa-plus';
            }
        });
    });
    
    // Giving Form - Amount Options
    const amountOptions = document.querySelectorAll('.amount-option');
    const amountInput = document.getElementById('giving-amount');
    
    if (amountOptions.length > 0 && amountInput) {
        amountOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                amountOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Set amount in input field
                const amount = this.getAttribute('data-amount');
                amountInput.value = amount;
            });
        });
        
        // Clear active class when custom amount is entered
        amountInput.addEventListener('focus', function() {
            amountOptions.forEach(opt => opt.classList.remove('active'));
        });
    }
    
    // Giving Form Submission
    const givingForm = document.getElementById('giving-form');
    if (givingForm) {
        givingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const amount = document.getElementById('giving-amount').value;
            const name = document.getElementById('giving-name').value;
            const email = document.getElementById('giving-email').value;
            const card = document.getElementById('giving-card').value;
            
            if (!amount || !name || !email || !card) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your generous donation! This is a demo, so no actual payment has been processed.');
            givingForm.reset();
        });
    }
    
    // Video Modal
    const playButtons = document.querySelectorAll('.play-button');
    const videoModal = document.getElementById('video-modal');
    const videoFrame = document.getElementById('video-frame');
    const closeModal = document.querySelector('.close-modal');
    
    if (playButtons.length > 0 && videoModal && videoFrame) {
        playButtons.forEach(button => {
            button.addEventListener('click', function() {
                const videoUrl = this.getAttribute('data-video');
                videoFrame.src = videoUrl;
                videoModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
        
        // Close modal
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                videoModal.style.display = 'none';
                videoFrame.src = '';
                document.body.style.overflow = 'auto'; // Enable scrolling
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.style.display = 'none';
                videoFrame.src = '';
                document.body.style.overflow = 'auto'; // Enable scrolling
            }
        });
    }
    
    // Message Filtering
    const seriesFilter = document.getElementById('series-filter');
    const speakerFilter = document.getElementById('speaker-filter');
    const dateFilter = document.getElementById('date-filter');
    const messageSearch = document.getElementById('message-search');
    const messageItems = document.querySelectorAll('.message-item');
    
    function filterMessages() {
        const seriesValue = seriesFilter ? seriesFilter.value : 'all';
        const speakerValue = speakerFilter ? speakerFilter.value : 'all';
        const dateValue = dateFilter ? dateFilter.value : 'all';
        const searchValue = messageSearch ? messageSearch.value.toLowerCase() : '';
        
        messageItems.forEach(item => {
            const series = item.getAttribute('data-series');
            const speaker = item.getAttribute('data-speaker');
            const date = item.getAttribute('data-date');
            const title = item.querySelector('h3').textContent.toLowerCase();
            const excerpt = item.querySelector('.message-excerpt').textContent.toLowerCase();
            
            // Check if item matches all filters
            const matchesSeries = seriesValue === 'all' || series === seriesValue;
            const matchesSpeaker = speakerValue === 'all' || speaker === speakerValue;
            const matchesDate = dateValue === 'all' || matchDateFilter(date, dateValue);
            const matchesSearch = searchValue === '' || title.includes(searchValue) || excerpt.includes(searchValue);
            
            // Show or hide item based on filters
            if (matchesSeries && matchesSpeaker && matchesDate && matchesSearch) {
                item.style.display = 'grid';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    function matchDateFilter(dateString, filterValue) {
        const messageDate = new Date(dateString);
        const currentDate = new Date();
        
        switch (filterValue) {
            case 'this-month':
                return messageDate.getMonth() === currentDate.getMonth() && 
                       messageDate.getFullYear() === currentDate.getFullYear();
            case 'last-month':
                const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
                return messageDate.getMonth() === lastMonth.getMonth() && 
                       messageDate.getFullYear() === lastMonth.getFullYear();
            case 'this-year':
                return messageDate.getFullYear() === currentDate.getFullYear();
            case 'last-year':
                return messageDate.getFullYear() === currentDate.getFullYear() - 1;
            default:
                return true;
        }
    }
    
    // Add event listeners for filters
    if (seriesFilter) seriesFilter.addEventListener('change', filterMessages);
    if (speakerFilter) speakerFilter.addEventListener('change', filterMessages);
    if (dateFilter) dateFilter.addEventListener('change', filterMessages);
    if (messageSearch) {
        messageSearch.addEventListener('input', filterMessages);
        
        // Prevent form submission on enter
        messageSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                filterMessages();
            }
        });
    }
    
    // Load More Messages Button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // This is a demo, so we'll just hide the button
            loadMoreBtn.textContent = 'No More Messages';
            loadMoreBtn.disabled = true;
            
            // In a real implementation, you would load more messages via AJAX
            setTimeout(() => {
                loadMoreBtn.style.display = 'none';
            }, 2000);
        });
    }
    
    // Email Subscribe Form
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = subscribeForm.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                alert('Thank you for subscribing! You will now receive weekly message updates.');
                subscribeForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});