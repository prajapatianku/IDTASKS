const calculatorscreen = document.querySelector('h1');
const calculatorbtn = document.querySelectorAll('button');
const clear = document.getElementById('clear-btn');

const calculate = {
    '/':(firstNumber, secondNmber)=> firstNumber / secondNmber,
    '+':(firstNumber, secondNmber)=> firstNumber + secondNmber,
    '-':(firstNumber, secondNmber)=> firstNumber - secondNmber,
    '*':(firstNumber, secondNmber)=> firstNumber * secondNmber,
    '%':(firstNumber, secondNmber)=> firstNumber % secondNmber,
    '=':(firstNumber, secondNmber)=> secondNmber,
  };
  
let firstValue = 0;
let opValue = '';
let waitingNextValue = false;

function inputNumber(num){

if(waitingNextValue === true){
    calculatorscreen.textContent = num;
    waitingNextValue = false;
}else{
    const display = calculatorscreen.textContent;
      calculatorscreen.textContent = display==='0' ? num : display+num;
}
}

function addDecimal(){
    if(waitingNextValue) return;

    if(!calculatorscreen.textContent.includes('.')){
        calculatorscreen.textContent = `${calculatorscreen.textContent}.`;
    }
}


function useOperator(operator){
    const currentValue = Number(calculatorscreen.textContent);
    if(opValue && waitingNextValue==true){
        opValue = operator;
        return;
    }
    if(!firstValue){
        firstValue = currentValue;
    }else{
        const calculation = calculate[opValue](firstValue, currentValue);
        calculatorscreen.textContent = calculation;
        firstValue=calculation;
    }
    waitingNextValue = true
    opValue = operator;
}

calculatorbtn.forEach((inputbtn)=>{
    if(inputbtn.classList.length === 0){
        inputbtn.addEventListener('click',()=>inputNumber(inputbtn.value));
    }else if(inputbtn.classList.contains('operator')){
        inputbtn.addEventListener('click',()=>useOperator(inputbtn.value));
    }else if(inputbtn.classList.contains('decimal')){
        inputbtn.addEventListener('click',()=>addDecimal());
    }
});

function resetAll(){
    firstValue = 0;
    opValue = '';
    waitingNextValue = false;
    calculatorscreen.textContent='0';
}
clear.addEventListener('click',resetAll);