// =====================================================
// UniCalc — Interaction Engine v3.1
// =====================================================

const universities = [
    { id: 'fast', name: 'FAST', fullName: 'National University of Computer & Emerging Sciences', category: ['cs', 'engineering'] },
    { id: 'nust', name: 'NUST', fullName: 'National University of Sciences & Technology', category: ['engineering', 'cs'] },
    { id: 'itu', name: 'ITU', fullName: 'Information Technology University', category: ['cs'] },
    { id: 'comsats', name: 'CUI', fullName: 'COMSATS University Islamabad', category: ['cs', 'engineering'] },
    { id: 'giki', name: 'GIKI', fullName: 'Ghulam Ishaq Khan Institute', category: ['engineering'] },
    { id: 'pieas', name: 'PIEAS', fullName: 'Pakistan Institute of Engineering & Applied Sciences', category: ['engineering'] },
    { id: 'lums', name: 'LUMS', fullName: 'Lahore University of Management Sciences', category: ['cs', 'engineering'] },
    { id: 'uet', name: 'UET', fullName: 'University of Engineering & Technology', category: ['engineering'] },
    { id: 'ned', name: 'NED', fullName: 'NED University of Engineering & Technology', category: ['engineering'] },
    { id: 'ist', name: 'IST', fullName: 'Institute of Space Technology', category: ['engineering'] },
    { id: 'nutech', name: 'NUTECH', fullName: 'National University of Technology', category: ['engineering', 'cs'] },
    { id: 'pucit', name: 'PUCIT', fullName: 'Punjab University College of IT', category: ['cs'] },
    { id: 'air', name: 'AIR', fullName: 'Air University', category: ['engineering', 'cs'] },
    { id: 'bahria', name: 'Bahria', fullName: 'Bahria University', category: ['cs', 'engineering'] },
    { id: 'qau', name: 'QAU', fullName: 'Quaid-i-Azam University', category: ['cs'] },
    { id: 'iba', name: 'IBA', fullName: 'Institute of Business Administration', category: ['cs'] },
];

// === Render Universities (Grid Layout) ===
const uniGrid = document.getElementById('uniGrid');

function renderUniversities(filter = 'all') {
    if (!uniGrid) return;
    
    const filtered = filter === 'all' 
        ? universities 
        : universities.filter(uni => uni.category.includes(filter));
    
    uniGrid.innerHTML = filtered.map(uni => `
        <a href="/calculator.html?uni=${uni.id}" class="uni-card">
            <div class="uni-initial">${uni.name}</div>
            <div class="uni-meta">
                <span class="uni-type">${uni.category.join(' / ')}</span>
            </div>
        </a>
    `).join('');
    
    // Re-init glow effect for new items
    initCardGlow();
}

renderUniversities();

// === Filter Interaction ===
const filterPills = document.querySelectorAll('.filter-pill');
filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderUniversities(pill.dataset.filter);
    });
});

// === Calculator Counter Animation ===
const counter = document.querySelector('.counter');
if (counter) {
    const target = parseFloat(counter.dataset.target);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(counter, target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(counter);
}

function animateCounter(el, target) {
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4); // Ease Out Quart
        
        const current = target * ease;
        el.textContent = current.toFixed(2);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

// === Custom 3D Tilt Effect with Mathematical Functions ===
const meritEngine = document.getElementById('meritEngine');

if (meritEngine) {
    let isHovering = false;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    
    // Configuration
    const maxTilt = 12; // Maximum additional rotation in degrees (on top of initial)
    const perspective = 1000; // 3D perspective
    const scale = 1.02; // Scale on hover
    const easing = 0.12; // Easing factor (0-1, lower = smoother)
    const glareIntensity = 0.08; // Reduced glare opacity (was 0.3)
    
    // Initial tilt state (resting position)
    const initialRotateX = 2; // Initial X rotation
    const initialRotateY = -5; // Initial Y rotation
    
    // Create glare element with reduced intensity
    const glare = document.createElement('div');
    glare.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 16px;
        pointer-events: none;
        opacity: 0;
        background: radial-gradient(circle at 50% 50%, rgba(255,255,255,${glareIntensity}) 0%, transparent 50%);
        transition: opacity 0.4s ease;
        z-index: 1;
    `;
    meritEngine.style.position = 'relative';
    meritEngine.appendChild(glare);
    
    // Set initial transform state immediately (card should appear tilted from start)
    meritEngine.style.transform = `
        perspective(${perspective}px) 
        rotateX(${initialRotateX}deg) 
        rotateY(${initialRotateY}deg)
    `;
    
    // Animation loop using requestAnimationFrame for smooth updates
    function animate() {
        if (isHovering) {
            // Smooth interpolation using easing
            currentX += (targetX - currentX) * easing;
            currentY += (targetY - currentY) * easing;
            
            // Calculate additional rotation angles (added to initial)
            const rotateX = initialRotateX + (-currentY * maxTilt);
            const rotateY = initialRotateY + (currentX * maxTilt);
            
            // Apply 3D transform with initial tilt + hover movement
            meritEngine.style.transform = `
                perspective(${perspective}px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale(${scale})
            `;
            
            // Update glare position with reduced spread
            const glareX = (currentX + 1) * 50;
            const glareY = (currentY + 1) * 50;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareIntensity}) 0%, transparent 50%)`;
            glare.style.opacity = '1';
            
            requestAnimationFrame(animate);
        } else {
            // Reset to initial tilt position with smooth animation
            currentX += (0 - currentX) * easing;
            currentY += (0 - currentY) * easing;
            
            const rotateX = initialRotateX + (-currentY * maxTilt);
            const rotateY = initialRotateY + (currentX * maxTilt);
            
            meritEngine.style.transform = `
                perspective(${perspective}px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale(1)
            `;
            
            glare.style.opacity = '0';
            
            // Continue animating until fully reset
            if (Math.abs(currentX) > 0.01 || Math.abs(currentY) > 0.01) {
                requestAnimationFrame(animate);
            } else {
                // Ensure final state is exactly the initial tilt
                meritEngine.style.transform = `
                    perspective(${perspective}px) 
                    rotateX(${initialRotateX}deg) 
                    rotateY(${initialRotateY}deg)
                `;
            }
        }
    }
    
    // Mouse move handler
    meritEngine.addEventListener('mousemove', (e) => {
        if (!isHovering) {
            isHovering = true;
            animate();
        }
        
        const rect = meritEngine.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate normalized position (-1 to 1)
        const mouseX = (e.clientX - centerX) / (rect.width / 2);
        const mouseY = (e.clientY - centerY) / (rect.height / 2);
        
        // Apply smooth clamping with mathematical function (tanh for smooth edges)
        targetX = Math.tanh(mouseX * 1.5) / Math.tanh(1.5);
        targetY = Math.tanh(mouseY * 1.5) / Math.tanh(1.5);
    });
    
    // Mouse leave handler
    meritEngine.addEventListener('mouseleave', () => {
        isHovering = false;
        targetX = 0;
        targetY = 0;
        animate(); // Start reset animation
    });
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    meritEngine.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const rect = meritEngine.getBoundingClientRect();
        touchStartX = touch.clientX - (rect.left + rect.width / 2);
        touchStartY = touch.clientY - (rect.top + rect.height / 2);
    });
    
    meritEngine.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = meritEngine.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = (touch.clientX - centerX) / (rect.width / 2);
        const mouseY = (touch.clientY - centerY) / (rect.height / 2);
        
        targetX = Math.tanh(mouseX * 1.5) / Math.tanh(1.5);
        targetY = Math.tanh(mouseY * 1.5) / Math.tanh(1.5);
        
        if (!isHovering) {
            isHovering = true;
            animate();
        }
    });
    
    meritEngine.addEventListener('touchend', () => {
        isHovering = false;
        targetX = 0;
        targetY = 0;
        animate();
    });
    
    console.log('Custom 3D Tilt initialized for meritEngine');
}

// === FAQ Accordion Logic ===
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');
    
    trigger?.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // Close all others
        faqItems.forEach(other => {
            if (other !== item) {
                other.classList.remove('active');
                const otherContent = other.querySelector('.faq-content');
                const otherIcon = other.querySelector('.faq-icon');
                if (otherContent) otherContent.style.maxHeight = null;
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Toggle current
        if (isOpen) {
            item.classList.remove('active');
            content.style.maxHeight = null;
            if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
            if (icon) icon.style.transform = 'rotate(180deg)';
        }
    });
});

// === Mouse Move Parallax for Hero Spheres ===
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const spheres = document.querySelectorAll('.gradient-sphere');
    spheres.forEach((sphere, index) => {
        const speed = (index + 1) * 20;
        const moveX = (x * speed) - (speed / 2);
        const moveY = (y * speed) - (speed / 2);
        
        sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    const grid = document.querySelector('.bg-grid');
    if (grid) {
        const gridX = (x * 10) - 5;
        const gridY = (y * 10) - 5;
        grid.style.transform = `perspective(500px) rotateX(20deg) translateY(-100px) scale(1.5) translate(${gridX}px, ${gridY}px)`;
    }
});

// === Magnetic Button Effect ===
const magneticButtons = document.querySelectorAll('.magnetic, .magnetic-btn');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const strength = btn.classList.contains('magnetic-btn') ? 0.3 : 0.15;
        
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// === Card Glow Effect ===
function initCardGlow() {
    const cards = document.querySelectorAll('.uni-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
}

initCardGlow();

console.log('UniCalc Engine v3.1 Initialized.');
