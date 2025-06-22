/**
 * API client module
 * Handles communication with the backend API
 */
const ApiClient = (function() {
    /**
     * Makes an API call with parameters
     * @param {string} url - The API endpoint URL
     * @param {string} resultId - ID of the element to display results
     * @param {Object} paramValues - Object containing parameter key-value pairs
     * @returns {Promise} - Promise from the fetch call
     */
    function callWithParams(url, resultId, paramValues = {}) {
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
        return fetch(urlWithParams)
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
                ToastManager.success('API call successful!');
                return data;
            })
            .catch(error => {
                resultElement.classList.remove('loading');
                resultElement.textContent = `Error: ${error.message}`;
                ToastManager.error('API call failed!');
                throw error;
            });
    }

    /**
     * Makes a simple API call (legacy support)
     * @param {string} url - The API endpoint URL
     * @param {string} resultId - ID of the element to display results
     */
    function call(url, resultId) {
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
        return callWithParams(url, resultId, paramValues);
    }

    // Public API
    return {
        call,
        callWithParams
    };
})();
