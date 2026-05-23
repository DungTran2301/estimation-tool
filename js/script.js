// Load content from markdown file
async function loadContent() {
    try {
        const response = await fetch('content.md');
        const markdown = await response.text();
        
        // Configure marked options
        marked.setOptions({
            breaks: true,
            gfm: true,
        });
        
        // Convert markdown to HTML
        const html = marked.parse(markdown);
        document.getElementById('content').innerHTML = html;
    } catch (error) {
        console.error('Error loading content:', error);
        document.getElementById('content').innerHTML = 
            '<p>Error loading content. Please refresh the page.</p>';
    }
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show selected section
            const target = link.getAttribute('href').slice(1);
            const section = document.getElementById(target);
            if (section) {
                section.style.display = 'block';
            }
        });
    });
    
    // Set home as active on load
    navLinks[0].classList.add('active');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadContent();
    setupNavigation();
});

// Calculate reading time (optional feature for future)
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}
