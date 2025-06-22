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

// Updates the parameter input fields based on the selected chapter and exercise
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

// Dynamic exercise handling
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
    callApiWithParams(url, resultId, paramValues);
}

// API call handling with parameters
function callApiWithParams(url, resultId, paramValues = {}) {
    const resultElement = document.getElementById(resultId);
    let urlWithParams = url;

    // Add parameters to URL
    if (Object.keys(paramValues).length > 0) {
        const queryParams = new URLSearchParams();
        for (const [key, value] of Object.entries(paramValues)) {
            queryParams.append(key, value);
        }
        urlWithParams += '?' + queryParams.toString();
    }

    // Show loading indicator
    resultElement.classList.add('loading');
    resultElement.textContent = '';

    // Call the API
    fetch(urlWithParams)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            resultElement.classList.remove('loading');
            resultElement.textContent = data;

            // Add and remove the updated class to trigger animation
            resultElement.classList.add('updated');
            setTimeout(() => resultElement.classList.remove('updated'), 500);

            // Show toast notification
            showToast('API call successful!', 'success');
        })
        .catch(error => {
            resultElement.classList.remove('loading');
            resultElement.textContent = `Error: ${error.message}`;
            showToast('API call failed!', 'error');
        });
}

// Original API call handling for backward compatibility
function callApi(url, resultId) {
    const resultElement = document.getElementById(resultId);
    const nameInput = document.getElementById(resultId + '-input');
    const paramValues = {};

    // Check if this is a name parameter request
    if (nameInput && nameInput.value) {
        // Special case for fibonacci endpoint which needs a 'number' parameter
        if (url.includes('/fibonacci')) {
            paramValues.number = nameInput.value;
        } else {
            paramValues.name = nameInput.value;
        }
    }

    // For exercise2, check for outputDepth input
    if (url.includes('exercise2')) {
        const depthInput = document.getElementById(resultId + '-depth');
        if (depthInput && depthInput.value) {
            paramValues.outputDepth = depthInput.value;
        } else {
            paramValues.outputDepth = '5'; // Default value
        }
    }

    // Use the enhanced method with the collected parameters
    callApiWithParams(url, resultId, paramValues);
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

    // Initialize exercise parameters
    updateExerciseParams();
});
