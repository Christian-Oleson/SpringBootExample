/**
 * Main application module
 * Entry point for the API Demo application
 */
const ApiDemo = (function() {
    /**
     * Initialize the application
     */
    function init() {
        // Initialize theme
        ThemeManager.initialize();

        // Initialize tooltips
        UIHelpers.initTooltips();

        // Initialize exercise parameters
        ExerciseManager.updateExerciseParams();

        // Set up event listeners
        setupEventListeners();
    }

    /**
     * Set up event listeners for the application
     */
    function setupEventListeners() {
        // Chapter and exercise select listeners
        const chapterSelect = document.getElementById('chapter-select');
        const exerciseSelect = document.getElementById('exercise-select');

        if (chapterSelect) {
            chapterSelect.addEventListener('change', ExerciseManager.updateExerciseParams);
        }

        if (exerciseSelect) {
            exerciseSelect.addEventListener('change', ExerciseManager.updateExerciseParams);
        }

        // Dynamic exercise button - programmatic binding
        const dynamicExerciseBtn = document.getElementById('dynamic-exercise-btn');
        if (dynamicExerciseBtn) {
            dynamicExerciseBtn.addEventListener('click', ExerciseManager.callDynamicExercise);
        }
    }

    // Return public API
    return {
        init
    };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', ApiDemo.init);

// Expose global functions for inline onclick handlers (for backward compatibility)
// These can be removed once all inline handlers are replaced with event listeners
function toggleTheme() {
    ThemeManager.toggleTheme();
}

function callApi(url, resultId) {
    return ApiClient.call(url, resultId);
}

function callDynamicExercise() {
    return ExerciseManager.callDynamicExercise();
}

function updateExerciseParams() {
    ExerciseManager.updateExerciseParams();
}
