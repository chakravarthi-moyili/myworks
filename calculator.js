document.addEventListener("DOMContentLoaded", function() {
    const calculator = document.getElementById('calculator');
    const result = document.getElementById('result');
    const buttons = calculator.querySelectorAll('.buttons');
    const clearButton = calculator.querySelector('.clear');
    const delButton = calculator.querySelector('.buttons[data-value="remove"]');
    
    // Function to update the input field
    function updateInput(value) {
        if (value === '=') {
            try {
                result.textContent = eval(result.textContent);
            } catch (error) {
                result.textContent = 'Error';
            }
        } else if (value === 'C') {
            result.textContent = '0';
        } else if (value === 'remove') {
            // If result is 'Error' or has only one character (which is '0'), set result to '0'
            if (result.textContent === 'Error' || result.textContent.length === 1) {
                result.textContent = '0';
            } else {
                // Otherwise, remove the last character
                result.textContent = result.textContent.slice(0, -1);
            }
        } else if (value === 'sqrt') {
            const num = parseFloat(result.textContent);
            if (!isNaN(num) && num >= 0) {
                result.textContent = Math.sqrt(num);
            } else {
                result.textContent = 'Error';
            }
        } else {
            if (result.textContent === '0' || result.textContent === 'Error') {
                result.textContent = '';
            }
            // Append the new digit or operator
            if (result.textContent !== 'Error' && result.textContent.length < 16) {
                // Replace "^" with "**" for exponentiation
                if (value === '^') {
                    result.textContent += '**';
                } else {
                    result.textContent += value;
                }
            }
        }
    }
    
    // Add event listeners to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            updateInput(button.dataset.value);
        });
    });
    
    // Event listener for clear button
    clearButton.addEventListener('click', function() {
        updateInput('C');
    });
    
    // Event listener for delete button
    delButton.addEventListener('click', function() {
        updateInput('remove');
    });
});
