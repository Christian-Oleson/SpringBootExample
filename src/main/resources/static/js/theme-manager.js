/**
 * Theme manager module
 * Handles theme switching between light and dark modes
 */
const ThemeManager = (function() {
    // Private constants
    const LOCAL_STORAGE_KEY = 'theme';
    const THEME_ATTRIBUTE = 'data-theme';
    const DARK_MODE = 'dark';
    const LIGHT_MODE = 'light';

    /**
     * Sets the theme to light or dark
     * @param {boolean} isDark - Whether to set dark theme
     */
    function setTheme(isDark) {
        document.documentElement.setAttribute(THEME_ATTRIBUTE, isDark ? DARK_MODE : LIGHT_MODE);
        localStorage.setItem(LOCAL_STORAGE_KEY, isDark ? DARK_MODE : LIGHT_MODE);
    }

    /**
     * Toggles the theme between light and dark
     */
    function toggleTheme() {
        const isDark = document.getElementById('theme-switch').checked;
        setTheme(isDark);
    }

    /**
     * Initializes the theme based on saved preference or system setting
     */
    function initialize() {
        const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
        const prefersDark = window.matchMedia &&
                           window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === DARK_MODE || (savedTheme === null && prefersDark)) {
            document.getElementById('theme-switch').checked = true;
            setTheme(true);
        }
    }

    // Public API
    return {
        setTheme,
        toggleTheme,
        initialize
    };
})();
