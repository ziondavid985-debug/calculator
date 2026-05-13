let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function clear() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        if (currentInput === '0') {
            currentInput = number;
        } else {
            currentInput += number;
        }
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    shouldResetDisplay = true;
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function toggleSign() {
    if (currentInput === '0') return;
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function percent() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

// Event listeners
document.getElementById('clear').addEventListener('click', clear);
document.getElementById('plus-minus').addEventListener('click', toggleSign);
document.getElementById('percent').addEventListener('click', percent);
document.getElementById('divide').addEventListener('click', () => chooseOperation('÷'));
document.getElementById('multiply').addEventListener('click', () => chooseOperation('×'));
document.getElementById('subtract').addEventListener('click', () => chooseOperation('-'));
document.getElementById('add').addEventListener('click', () => chooseOperation('+'));
document.getElementById('equals').addEventListener('click', calculate);

document.getElementById('zero').addEventListener('click', () => appendNumber('0'));
document.getElementById('one').addEventListener('click', () => appendNumber('1'));
document.getElementById('two').addEventListener('click', () => appendNumber('2'));
document.getElementById('three').addEventListener('click', () => appendNumber('3'));
document.getElementById('four').addEventListener('click', () => appendNumber('4'));
document.getElementById('five').addEventListener('click', () => appendNumber('5'));
document.getElementById('six').addEventListener('click', () => appendNumber('6'));
document.getElementById('seven').addEventListener('click', () => appendNumber('7'));
document.getElementById('eight').addEventListener('click', () => appendNumber('8'));
document.getElementById('nine').addEventListener('click', () => appendNumber('9'));
document.getElementById('decimal').addEventListener('click', appendDecimal);