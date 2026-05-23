// Load and parse markdown content
async function loadContent() {
    const contentElement = document.getElementById('content');
    const readingTimeElement = document.getElementById('reading-time');
    
    try {
        const response = await fetch('content.md');
        if (!response.ok) {
            throw new Error(`Failed to fetch markdown file: ${response.statusText}`);
        }
        
        const markdown = await response.text();
        
        // Configure marked options
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true,
            mangle: false
        });
        
        // Convert markdown to HTML
        const html = marked.parse(markdown);
        contentElement.innerHTML = html;
        
        // Calculate reading time based on content
        const textOnly = contentElement.textContent || contentElement.innerText || "";
        const minutes = calculateReadingTime(textOnly);
        readingTimeElement.textContent = minutes;
        
    } catch (error) {
        console.error('Error loading content:', error);
        contentElement.innerHTML = `
            <div style="text-align: center; padding: 3rem 0; color: #f472b6;">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p style="font-size: 1.1rem; font-weight: 600;">Không thể tải nội dung bài viết.</p>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">Chi tiết lỗi: ${error.message}</p>
                <button onclick="loadContent()" style="margin-top: 1.5rem; padding: 0.6rem 1.5rem; background: var(--primary-color); border: none; border-radius: 50px; color: white; font-weight: 600; cursor: pointer;">Thử lại</button>
            </div>
        `;
    }
}

// Calculate reading time (200 words per minute for Vietnamese/English)
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const cleanText = text.trim().replace(/\s+/g, ' ');
    if (cleanText.length === 0) return 0;
    
    const wordCount = cleanText.split(' ').length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Navigation handling with smooth transitions
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            
            if (!targetSection || link.classList.contains('active')) return;
            
            // Remove active classes
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Fade out current sections and toggle display
            sections.forEach(section => {
                if (section.style.display !== 'none') {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(10px)';
                    section.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
                    
                    setTimeout(() => {
                        section.style.display = 'none';
                        
                        // Show & fade in target section
                        targetSection.style.display = 'block';
                        targetSection.style.opacity = '0';
                        targetSection.style.transform = 'translateY(10px)';
                        
                        // Small timeout to allow browser layout calculation
                        setTimeout(() => {
                            targetSection.style.opacity = '1';
                            targetSection.style.transform = 'translateY(0)';
                            targetSection.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                        }, 50);
                    }, 250);
                }
            });
            
            // Reset scroll progress width to 0 when moving to calculator, or recalulate
            if (targetId === 'calculator') {
                document.getElementById('scroll-progress').style.width = '0%';
            } else {
                updateScrollProgress();
            }
            
            // Scroll smoothly back to top on navigation change
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Scroll Progress Tracker
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    const blogSection = document.getElementById('home');
    
    // Only calculate progress if blog section is active
    if (blogSection && blogSection.style.display !== 'none') {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        if (scrollHeight > 0) {
            const progress = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        } else {
            scrollProgress.style.width = '0%';
        }
    } else {
        scrollProgress.style.width = '0%';
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    loadContent();
    setupNavigation();
    
    // Add scroll listener for progress bar
    window.addEventListener('scroll', updateScrollProgress);
});
