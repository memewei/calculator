let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.getElementById("equal");
const clearButton = document.getElementById("clear");
const inverseButton = document.getElementById("inverse");
const percentButton = document.getElementById("percent");
const decimalButton = document.getElementById("decimal");
const previousOperationScreen = document.querySelector(".prev-screen");
const currentOperationScreen = document.querySelector(".current-screen");

window.addEventListener("keydown", handleKeyboardInput);
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
decimalButton.addEventListener("click", appendDecimal);
inverseButton.addEventListener("click", inverse);
percentButton.addEventListener("click", percentage);

numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

function appendNumber(number){
  if(currentOperationScreen.textContent === "0" || shouldResetScreen) resetScreen();
  currentOperationScreen.textContent += number;
}

function resetScreen(){
  currentOperationScreen.textContent = "";
  shouldResetScreen = false;
}

function clear(){
  currentOperationScreen.textContent = "0";
  previousOperationScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

function appendDecimal(){
  if(shouldResetScreen) resetScreen();
  if(currentOperationScreen.textContent === "") currentOperationScreen.textContent = "0";
  if(currentOperationScreen.textContent.includes(".")) return;
  currentOperationScreen.textContent += ".";
}

function deleteNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1);
}  

function setOperation(operator){
  if(currentOperation !== null) evaluate();
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  previousOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

function evaluate(){
  if(currentOperation === null || shouldResetScreen) return;
  if(currentOperation === "÷" && currentOperationScreen.textContent === "0"){
    alert("You can't divide by 0!");
    return;
  }
  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand));
  previousOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function handleKeyboardInput(e){
  if(e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if(e.key === ".") appendDecimal();
  if(e.key === "=" || e.key === "Enter") evaluate();
  if(e.key === "Backspace") deleteNumber();
  if(e.key === "Escape") clear();
  if(e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator){
  if(keyboardOperator === "/") return "÷";
  if(keyboardOperator === "*") return "×";
  if(keyboardOperator === "-") return "−";
  if(keyboardOperator === "+") return "+";
}

function add(a, b){
  return a + b;
}

function substract(a, b){
  return a - b;
}

function multiply(a, b){
  return a * b;
}

function divide(a, b){
  return a / b;
}

function operate(operator, a, b){
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "−":
      return substract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}

function inverse(){
    if(currentOperationScreen.textContent > 0){
        currentOperationScreen.textContent = `-${currentOperationScreen.textContent}`;
    }else{
        currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(3, 2);
    }
}

function percentage(){
    if(currentOperationScreen.textContent >= 0){
        return currentOperationScreen.textContent/100;
    }else{
        return null;
    }
}