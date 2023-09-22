function Calculator() {
    this.methods = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '÷': (a, b) => a / b
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
let opButtonWasJustPushed = false;


function update(newValue) {
    if (newValue.length <= 13) {
        display.innerText = newValue;
    } else if (newValue.length > 13) {
        display.innerText = 'overflow - hit the clear button';
    }
}

const display = document.querySelector('.display');
display.innerText = '';

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    display.innerText = '';
    calcStack = [];
});

const plusMinusButton = document.querySelector('.plus-minus');
plusMinusButton.addEventListener('click', () => {
    if (display.innerText !== '') {
        let currentText = display.innerText;
        let currentValue = Number(currentText);
        let newValue = (currentValue * -1).toString();
        update(newValue);
    }
});

const percentButton = document.querySelector('.percent');
percentButton.addEventListener('click', () => {
    if (display.innerText !== '') {
        let currentValue = Number(display.innerText);
        let newValue = (currentValue / 100);
        newValue = (Math.round(newValue * 1000000)) / 1000000;
        newValue = newValue.toString();
        update(newValue);
    }
});

const numberButtons = document.querySelectorAll('.number');
for (button of numberButtons) {
    let number = button.innerText;
    button.addEventListener('click', () => {
        if (opButtonWasJustPushed === true) {
            display.innerText = number;
            opButtonWasJustPushed = false;
        } else {
            if (display.innerText !== '0') {
                let newValue = display.innerText + number;
                update(newValue);
            }
        }
    });
}

const zeroButton = document.querySelector('.zero');
zeroButton.addEventListener('click', () => {
    let zero = zeroButton.innerText;
    if (display.innerText[display.innerText.length - 1] === '0' && !display.innerText.includes('.')) {
        console.log('testing');
        return;
    } else {
        let newValue = display.innerText + zero;
        update(newValue);
    }
});

const decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click', () => {
    let decimal = decimalButton.innerText;
    if (display.innerText.includes('.')) {
        return;
    } else {
        let newValue = display.innerText + decimal;
        update(newValue);
    }
});

const opButtons = document.querySelectorAll('.operation');
for (button of opButtons) {
    let operation = button.innerText;
    button.addEventListener('click', () => {
        if (calcStack.length === 0) {
            calcStack.push(display.innerText);
            calcStack.push(operation);
            opButtonWasJustPushed = true;
        }
    });
}

const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', () => {
    if (calcStack.length === 2) {
        calcStack.push(display.innerText);
        let calcString = calcStack.join(' ');
        calcStack = [];
        if (calcString === '0 / 0') {
            display.innerText = 'I knew you would try that.';
            return;
        }
        let newValue = calc.calculate(calcString);
        newValue = (Math.round(newValue * 100000)) / 100000;
        newValue = newValue.toString();
        update(newValue);
    }
});

const deleteButton = document.querySelector('.delete');
deleteButton.addEventListener('click', () => {
    if (display.innerText === '') return;
    else {
        display.innerText = display.innerText.substr(0, display.innerText.length - 1);
    }
});