function Calculator() {
    this.methods = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    };
    this.calculate = function (string) {
        let split = string.split(' '),
            a = +split[0],
            op = split[1],
            b = +split[2];
        return this.methods[op](a, b);
    };
}
let calc = new Calculator();
let calcStack = [];


const display = document.querySelector('.display');
const displayContent = document.createElement('span');
display.appendChild(displayContent);
displayContent.innerText = '';

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    displayContent.innerText = '';
    calcStack = [];
});

const plusMinusButton = document.querySelector('.plus-minus');
plusMinusButton.addEventListener('click', () => {
    if (displayContent.innerText !== '') {
        let currentText = displayContent.innerText;
        let currentValue = Number(currentText);
        let newValue = (currentValue * -1).toString();
        if (newValue.length <= 13) {
            displayContent.innerText = newValue;
        } else if (newValue.length > 13) {
            displayContent.innerText = 'overflow - hit the clear button';
        }
    }
});

const percentButton = document.querySelector('.percent');
percentButton.addEventListener('click', () => {
    if (displayContent.innerText !== '') {
        let currentValue = Number(displayContent.innerText);
        let newValue = (currentValue / 100);
        newValue = (Math.round(newValue) * 10000) / 10000;
        newValue = newValue.toString();
        if (newValue.length <= 13) {
            displayContent.innerText = newValue;
        } else if (newValue.length > 13) {
            displayContent.innerText = 'overflow - hit the clear button';
        }
    }
});

const numberButtons = document.querySelectorAll('.number');
for (button of numberButtons) {
    let number = button.innerText;
    button.addEventListener('click', () => {
        if (displayContent.innerText !== '0') {
            let newValue = displayContent.innerText + number;
            if (newValue.length <= 13) {
                displayContent.innerText = newValue;
            } else if (newValue.length > 13) {
                displayContent.innerText = 'overflow - hit the clear button';
            }
        }
    });
}

const zeroButton = document.querySelector('.zero');
zeroButton.addEventListener('click', () => {
    let zero = zeroButton.innerText;
    if (display.innerText[0] === '0') {
        return;
    } else {
        let newValue = displayContent.innerText + zero;
        if (newValue.length <= 13) {
            displayContent.innerText = newValue;
        } else if (newValue.length > 13) {
            displayContent.innerText = 'overflow - hit the clear button';
        }
    }
});

const decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click', () => {
    let decimal = decimalButton.innerText;
    if (displayContent.innerText.includes('.')) {
        return;
    } else {
        let newValue = displayContent.innerText + decimal;
        if (newValue.length <= 13) {
            displayContent.innerText = newValue;
        } else if (newValue.length > 13) {
            displayContent.innerText = 'overflow - hit the clear button';
        }
    }
});

const opButtons = document.querySelectorAll('.operation');
for (button of opButtons) {
    let operation = button.innerText;
    button.addEventListener('click', () => {
        if (calcStack.length === 0) {
            calcStack.push(displayContent.innerText);
            displayContent.innerText = '';
            calcStack.push(operation);
        }
    });
}

const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', () => {
    if (calcStack.length === 2) {
        calcStack.push(displayContent.innerText);
        let calcString = calcStack.join(' ');
        calcStack = [];
        let newValue = calc.calculate(calcString).toString();
        if (newValue.length <= 13) {
            displayContent.innerText = newValue;
        } else if (newValue.length > 13) {
            displayContent.innerText = 'overflow - hit the clear button';
        }
    }
});