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
    return (a / b).toFixed(4);
}

let a, b, operation;

function operate(a, b, operation) {
    if (operation === '+') {
        return add(a, b);
    } else if (operation === '-') {
        return subtract(a, b);
    } else if (operation === '*') {
        return multiply(a, b);
    } else if (operation === '/') {
        return divide(a, b);
    } else {
        alert("Invalid Operation");
    }
}

function storeValue() {
    // start here
}

const equals = document.querySelector(".equals");
equals.addEventListener("click", storeValue);

const inputField = document.querySelector(".input");
inputField.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        storeValue();
    }
})