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
let displayValue = '';


const display = document.querySelector('.display');
const displayContent = document.createElement('span');
display.appendChild(displayContent);
displayContent.innerText = displayValue;

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    displayValue = '';
    displayContent.innerText = displayValue;
});

const plusMinusButton = document.querySelector('.plus-minus');
plusMinusButton.addEventListener('click', () => {
    if (displayContent.innerText !== '') {
        let currentText = displayContent.innerText;
        let currentValue = Number(currentText);
        displayValue = (currentValue * -1).toString();
        if (displayValue.length <= 13) {
            displayContent.innerText = displayValue;
        } else if (displayValue.length > 13) {
            displayContent.innerText = 'overflow';
        }
    }
});

const percentButton = document.querySelector('.percent');
percentButton.addEventListener('click', () => {
    if (displayContent.innerText !== '') {
        let currentText = displayContent.innerText;
        let currentValue = Number(currentText);
        displayValue = (currentValue * .01).toString();
        if (displayValue.length <= 13) {
            displayContent.innerText = displayValue;
        } else if (displayValue.length > 13) {
            displayContent.innerText = 'overflow';
        }
    }
});

const numberButtons = document.querySelectorAll('.number');
for (button of numberButtons) {
    let innerText = button.innerText;
    button.addEventListener('click', () => {
        if (displayValue.length <= 13) {
            displayValue += innerText;
            displayContent.innerText = displayValue;
        } else if (displayValue.length > 13) {
            displayContent.innerText = 'overflow';
        }
    });
}

const zeroButton = document.querySelector('.zero');
zeroButton.addEventListener('click', () => {
    let zero = zeroButton.innerText;
    if (display.innerText[0] === '0') {
        return;
    } else {
        if (displayValue.length <= 13) {
            displayValue += zero;
            displayContent.innerText = displayValue;
        } else if (displayValue.length > 13) {
            displayContent.innerText = 'overflow';
        }
    }
});

const decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click', () => {
    let decimal = decimalButton.innerText;
    let currentValue = displayContent.innerText;
    if (currentValue.includes('.')) {
        return;
    } else {
        if (displayValue.length <= 13) {
            displayValue += decimal;
            displayContent.innerText = displayValue;
        } else if (displayValue.length > 13) {
            displayContent.innerText = 'overflow';
        }
    }
}); 
