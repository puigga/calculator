const display1 = document.querySelector('.upper-display-div');
const display2 = document.querySelector('.display-div');
const equalsButton = document.querySelector('.equals-button');
const clearButton = document.querySelector('.clear-button');
const pointButton = document.querySelector('.point-button')

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

var num1;
var num2;
var operator = '';
var selectedNumber = '';
var result;

const operate = (firstNumber, secondNumber, operator) => { 
    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
            
        case '-':
            return subtract(firstNumber, secondNumber);
        
        case 'x':
            return multiply(firstNumber, secondNumber);

        case '/':
            return divide(firstNumber, secondNumber);
    }
}

function input1() {
    if (this.innerHTML === '←') {
        selectedNumber = selectedNumber.slice(0, -1);
        display2.innerHTML = selectedNumber;
    }
    else {
        if (this.innerHTML === '.') {
            pointButton.removeEventListener('click', input1);
        }
        selectedNumber += this.innerHTML;
        display2.innerHTML = selectedNumber;
    }
    
}

function input2() {
    if (this.innerHTML === '←') {
        selectedNumber = selectedNumber.slice(0, -1);
        display2.innerHTML = selectedNumber;
    } else {
        selectedNumber += this.innerHTML;
        display2.innerHTML = selectedNumber;
    }
    if (this.innerHTML === '.') {
        pointButton.removeEventListener('click', input2);
    }
    
    num2 = Number(selectedNumber);
    result = operate(num1, num2, operator);
    if (result === Infinity){
        clearCalculator();
        display2.innerHTML = `¯\\_(ツ)_/¯`;
    }
    equalsButton.addEventListener('click', inputEquals);
}

function inputEquals() {
    numberButtons.forEach((button) => {button.removeEventListener('click', input2)})
    numberButtons.forEach((button) => {button.addEventListener('click', input1)})

    result = operate(num1, num2, operator);
    display1.innerHTML += ` ${num2} =`;
    if (result === Infinity) {
        display2.innerHTML = `¯\\_(ツ)_/¯`;
    } else {
        display2.innerHTML = result;
    }
    

    operator = '';
    equalsButton.removeEventListener('click', inputEquals);
};

const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach((button) => {
    button.addEventListener('click', input1)
});

const operatorButtons = document.querySelectorAll('.operator-button');
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (operator != '') {
            operator = button.innerHTML;
            display1.innerHTML = `${result} ${operator}`;
            display2.innerHTML = result;
            num1 = result;
            selectedNumber = '';
        } else {
            if (num1 === undefined || num1 === 0) {
                operator = button.innerHTML;
                num1 = Number(selectedNumber);
                display1.innerHTML = `${num1}` + ' ' + operator;
                selectedNumber = '';
            } else {
                operator = button.innerHTML;
                num1 = result;
                display1.innerHTML = `${num1}` + ' ' + operator;
                selectedNumber = '';
            }
        }
        
        numberButtons.forEach((button) => {button.removeEventListener('click', input1)})


        numberButtons.forEach((button) => {button.addEventListener('click', input2)})
        
    })
});

equalsButton.addEventListener('click', inputEquals);

function clearCalculator() {
    num1 = undefined;
    num2 = undefined;
    operator = '';
    selectedNumber = '';
    result = undefined;
    display1.innerHTML = '';
    display2.innerHTML = '0';
}

clearButton.addEventListener('click', clearCalculator)