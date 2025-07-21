function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        alert("Cannot divide by zero!");
        return NaN;
    }
    return (a / b).toFixed(4);
}

let a = null;
let b = null;
let operation = null;
let currentInput = '';
let inputHistory = '';
let resultDisplayed = false;
let operationJustPressed = false;

function updateDisplay(finalResult = null) {
    if (finalResult !== null) {
        document.querySelector(".input").value = finalResult;
    }
    document.querySelector(".input-history").textContent = inputHistory;
}

function appendToInput(value) {
    if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
        operationJustPressed = false;
    }
    currentInput += value;
    if (inputHistory === "0" && value !== '.') { // Avoid history like "05"
        inputHistory = '';
    }
    inputHistory += value;
    document.querySelector(".input").value = currentInput;
    document.querySelector(".input-history").textContent = inputHistory;
}

function clearInput() {
    a = null;
    b = null;
    operation = null;
    currentInput = '';
    inputHistory = '';
    resultDisplayed = false;
    document.querySelector(".input").value = currentInput;
    document.querySelector(".input-history").textContent = inputHistory;
    document.querySelector(".input").setAttribute("placeholder", "0");
}

function calculateResult() {
    if (operation && currentInput !== '') {
        b = parseFloat(currentInput);
        if (a === null) {
            a = 0;
        }
        let result;
        switch (operation) {
            case '+':
                result = add(a, b);
                break;
            case '-':
                result = subtract(a, b);
                break;
            case '*':
                result = multiply(a, b);
                break;
            case '/':
                result = divide(a, b);
                break;
            default:
                return;
        }

        a = result;
        currentInput = result.toString();
        updateDisplay(currentInput);
        resultDisplayed = true;
        operation = null;
        inputHistory = result.toString();

        const inputField = document.querySelector(".input");
        inputField.removeAttribute("placeholder");
        console.log("calculateResult called");
        console.log("a:", a, "currentInput:", currentInput, "operation:", operation, "inputHistory:", inputHistory);
    }
}

function handleOperation(op) {
    console.log("handleOperation called with:", op);
    console.log("a:", a, "currentInput:", currentInput, "operation:", operation, "inputHistory:", inputHistory);

    if (currentInput === '' && a === null) {
        if (op === '-') {
            appendToInput(op);
        }
        return;
    }

    if (operation !== null && currentInput !== '') {
        calculateResult();
    }

    if (a === null) {
        a = parseFloat(currentInput);
    } else if (currentInput !== '') {
        a = parseFloat(currentInput);
    }

    operation = op;
    inputHistory = a.toString() + op;
    currentInput = '';
    document.querySelector(".input").value = currentInput;
    document.querySelector(".input-history").textContent = inputHistory;

    console.log("handleOperation called with:", op);
    console.log("a:", a, "currentInput:", currentInput, "operation:", operation, "inputHistory:", inputHistory);
}

function deleteLastInput() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        inputHistory = inputHistory.slice(0, -1);
        document.querySelector(".input").value = currentInput;
        document.querySelector(".input-history").textContent = inputHistory;
    }
}

const numberButtons = [
    { class: '.zero', value: '0' },
    { class: '.one', value: '1' },
    { class: '.two', value: '2' },
    { class: '.three', value: '3' },
    { class: '.four', value: '4' },
    { class: '.five', value: '5' },
    { class: '.six', value: '6' },
    { class: '.seven', value: '7' },
    { class: '.eight', value: '8' },
    { class: '.nine', value: '9' },
    { class: '.decimal', value: '.'}
];

const operations = [
    { class: '.division', value: '/'},
    { class: '.multiplication', value: '*'},
    { class: '.subtraction', value: '-'},
    { class: '.addition', value: '+'},
]

operations.forEach(button => {
    const element = document.querySelector(button.class);
    if (element) {
        element.addEventListener('click', () => handleOperation(button.value));
    }
});

numberButtons.forEach(button => {
    const element = document.querySelector(button.class);
    if (element) {
        element.addEventListener('click', () => appendToInput(button.value));
    }
});

// Keep the existing event listeners
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => handleOperation(button.textContent));
});

const equals = document.querySelector(".equals");
equals.addEventListener("click", calculateResult);

const clear = document.querySelector(".clear-btn");
clear.addEventListener("click", clearInput);

// Event listener for delete button
const deleteBtn = document.querySelector(".delete-btn");
if (deleteBtn) {
    deleteBtn.addEventListener('click', deleteLastInput);
}

function simulateButtonClick(buttonClass) {
    const button = document.querySelector(buttonClass);
    if (button) {
        button.classList.add('simulated-active');
        button.classList.add('simulated-hover');
        setTimeout(() => {
            button.classList.remove('simulated-active');
            setTimeout(() => {
                button.classList.remove('simulated-hover');
            }, 300); // Match this to your hover transition duration
        }, 100);
    }
}

document.addEventListener("keydown", function(e) {
    if (e.key >= '0' && e.key <= '9') {
        appendToInput(e.key);
        simulateButtonClick(`.${['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][parseInt(e.key)]}`);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        handleOperation(e.key);
        const operationClasses = {'+': '.addition', '-': '.subtraction', '*': '.multiplication', '/': '.division'};
        simulateButtonClick(operationClasses[e.key]);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculateResult();
        simulateButtonClick('.equals');
    } else if (e.key === 'Escape') {
        clearInput();
        simulateButtonClick('.clear-btn');
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
        deleteLastInput();
        simulateButtonClick('.delete-btn');
    } else if (e.key === '.') {
        appendToInput(e.key);
        simulateButtonClick('.decimal');
    }
});
