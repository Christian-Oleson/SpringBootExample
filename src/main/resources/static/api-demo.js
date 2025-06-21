/**
 * API Demo JavaScript
 * Handles theme switching, API calls, and UI interactions
 */

// Theme management
function setTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
}

function toggleTheme() {
    const isDark = document.getElementById('theme-switch').checked;
    setTheme(isDark);
}

// API call handling
async function callApi(url, resultId) {
    const resultElement = document.getElementById(resultId);
    const nameInput = document.getElementById(resultId + '-input');
    let urlWithParam = url;

    if (nameInput && nameInput.value) {
        urlWithParam += '?name=' + encodeURIComponent(nameInput.value);
    }

    // For exercise2, check for outputDepth input
    if (url.includes('exercise2')) {
        const depthInput = document.getElementById(resultId + '-depth');
        if (depthInput && depthInput.value) {
            urlWithParam += '?outputDepth=' + encodeURIComponent(depthInput.value);
        } else {
            urlWithParam += '?outputDepth=5'; // Default value
        }
    }

    // Show loading indicator
    resultElement.classList.add('loading');
    resultElement.textContent = '';

    try {
        const response = await fetch(urlWithParam);
        resultElement.classList.remove('loading');
        resultElement.textContent = await response.text();

        // Add and remove the updated class to trigger animation
        resultElement.classList.add('updated');
        setTimeout(() => resultElement.classList.remove('updated'), 500);

        // Show toast notification
        showToast('API call successful!', 'success');
    } catch (error) {
        resultElement.classList.remove('loading');
        resultElement.textContent = `Error: ${error.message}`;
        showToast('API call failed!', 'error');
    }
}

// Notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = document.createElement('i');
    icon.className = type === 'success'
        ? 'bi bi-check-circle-fill'
        : type === 'error'
            ? 'bi bi-exclamation-circle-fill'
            : 'bi bi-info-circle-fill';

    toast.appendChild(icon);

    const text = document.createElement('span');
    text.textContent = message;
    toast.appendChild(text);

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
        document.getElementById('theme-switch').checked = true;
        setTheme(true);
    }

    // Initialize tooltips
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        el.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.top = `${rect.bottom + 10}px`;
            tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;

            this.addEventListener('mouseleave', function() {
                document.body.removeChild(tooltip);
            }, {once: true});
        });
    });
});
