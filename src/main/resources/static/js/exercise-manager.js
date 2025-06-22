/**
 * Exercise Parameters module
 * Manages the dynamic exercise parameters configuration and UI
 */
const ExerciseManager = (function() {
    // Exercise parameter configuration
    const exerciseParams = {
        // Chapter 1 exercise parameters
        '1': {
            '1': [], // No parameters
            '2': [{ name: 'outputDepth', label: 'Output Depth', type: 'number', default: '5', placeholder: 'Pattern depth (1-50)' }],
            '3': [{ name: 'fileName', label: 'File Name', type: 'text', default: '', placeholder: 'Enter file name' }],
            '4': [], // No parameters for exercise 4 yet
            '5': []  // No parameters for exercise 5 yet
        },
        // Add parameter definitions for other chapters as needed
        '2': {
            '1': [], '2': [], '3': [], '4': [], '5': []
        },
        '3': {
            '1': [], '2': [], '3': [], '4': [], '5': []
        },
        '4': {
            '1': [], '2': [], '3': [], '4': [], '5': []
        },
        '5': {
            '1': [], '2': [], '3': [], '4': [], '5': []
        }
    };

    /**
     * Updates the parameter input fields based on the selected chapter and exercise
     */
    function updateExerciseParams() {
        const chapter = document.getElementById('chapter-select').value;
        const exercise = document.getElementById('exercise-select').value;
        const paramsContainer = document.getElementById('dynamic-params-container');

        // Clear existing parameter inputs
        paramsContainer.innerHTML = '';

        // Get parameters for the selected chapter and exercise
        const params = exerciseParams[chapter][exercise] || [];

        // Create input fields for each parameter
        params.forEach(param => {
            const paramGroup = document.createElement('div');
            paramGroup.className = 'param-group';

            const label = document.createElement('label');
            label.htmlFor = `dynamic-param-${param.name}`;
            label.textContent = param.label;

            const input = document.createElement('input');
            input.type = param.type;
            input.id = `dynamic-param-${param.name}`;
            input.name = param.name;
            input.placeholder = param.placeholder;
            input.value = param.default || '';

            if (param.type === 'number') {
                input.min = param.min || '1';
                input.max = param.max || '50';
            }

            paramGroup.appendChild(label);
            paramGroup.appendChild(input);
            paramsContainer.appendChild(paramGroup);
        });
    }

    /**
     * Calls the dynamic exercise API based on selected parameters
     */
    function callDynamicExercise() {
        const chapter = document.getElementById('chapter-select').value;
        const exercise = document.getElementById('exercise-select').value;
        const resultId = 'dynamic-exercise-result';

        // Base URL for the API call
        let url = '';

        // Special case handling for Chapter 1 exercises which have a different URL pattern
        if (chapter === '1') {
            url = `/api/HelloJava/exercise${exercise}`;
        } else {
            url = `/api/HelloJava/chapter${chapter}/exercise${exercise}`;
        }

        // Get parameters for the selected exercise
        const params = exerciseParams[chapter][exercise] || [];

        // Collect parameter values from input fields
        const paramValues = {};
        params.forEach(param => {
            const inputElement = document.getElementById(`dynamic-param-${param.name}`);
            if (inputElement && inputElement.value) {
                paramValues[param.name] = inputElement.value;
            }
        });

        // Call the API with collected parameters
        return ApiClient.callWithParams(url, resultId, paramValues);
    }

    /**
     * Gets the parameter configuration for a specific chapter and exercise
     * @param {string} chapter - The chapter number
     * @param {string} exercise - The exercise number
     * @returns {Array} - Array of parameter configurations
     */
    function getParams(chapter, exercise) {
        return exerciseParams[chapter] && exerciseParams[chapter][exercise]
               ? exerciseParams[chapter][exercise]
               : [];
    }

    // Public API
    return {
        updateExerciseParams,
        callDynamicExercise,
        getParams
    };
})();
