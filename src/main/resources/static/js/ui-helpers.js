/**
 * UI Helpers module
 * Provides utilities for UI components like tooltips
 */
const UIHelpers = (function() {
    /**
     * Initializes tooltips on elements with data-tooltip attribute
     */
    function initTooltips() {
        document.querySelectorAll('[data-tooltip]')
            .forEach(el => {
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
    }

    // Public API
    return {
        initTooltips
    };
})();
