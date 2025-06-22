/**
 * Toast notification module
 * Provides functionality for displaying toast notifications
 */
const ToastManager = (function() {
    // Private variables
    const TOAST_DURATION = 3000;
    const ANIMATION_DURATION = 300;

    /**
     * Shows a toast notification
     * @param {string} message - The message to display
     * @param {string} type - The type of notification (success, error, info)
     */
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

        // Remove after duration
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), ANIMATION_DURATION);
        }, TOAST_DURATION);
    }

    // Public API
    return {
        success: message => showToast(message, 'success'),
        error: message => showToast(message, 'error'),
        info: message => showToast(message, 'info')
    };
})();
