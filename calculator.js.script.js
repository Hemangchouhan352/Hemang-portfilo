let current = "";
let previous = "";
let operator = "";

const result = document.getElementById("result");
const history = document.getElementById("history");


// Add number
function number(value) {

    if (value === "." && current.includes(".")) {
        return;
    }

    current += value;

    updateDisplay();
}


// Choose operator
function chooseOperator(op) {

    if (current === "" && previous === "") {
        return;
    }

    if (current !== "") {
        previous = current;
        current = "";
    }

    operator = op;

    history.innerText =
        previous + " " + displayOperator(op);

    updateDisplay();
}


// Calculate
function calculate() {

    if (
        previous === "" ||
        current === "" ||
        operator === ""
    ) {
        return;
    }

    let a = parseFloat(previous);
    let b = parseFloat(current);
    let answer;


    switch (operator) {

        case "+":
            answer = a + b;
            break;

        case "-":
            answer = a - b;
            break;

        case "*":
            answer = a * b;
            break;

        case "/":

            if (b === 0) {
                result.innerText = "Error";
                return;
            }

            answer = a / b;
            break;
    }


    history.innerText =
        previous + " " +
        displayOperator(operator) +
        " " + current + " =";


    current = String(
        Number(answer.toFixed(10))
    );

    previous = "";
    operator = "";

    updateDisplay();
}


// Clear
function clearDisplay() {

    current = "";
    previous = "";
    operator = "";

    history.innerText = "";

    result.innerText = "0";
}


// Delete
function deleteLast() {

    current = current.slice(0, -1);

    updateDisplay();
}


// Percentage
function percentage() {

    if (current !== "") {

        current =
            String(parseFloat(current) / 100);

        updateDisplay();
    }
}


// Update screen
function updateDisplay() {

    result.innerText =
        current || "0";
}


// Operator symbols
function displayOperator(op) {

    if (op === "*") return "×";
    if (op === "/") return "÷";
    if (op === "-") return "−";

    return op;
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "."
    ) {
        number(key);
    }

    if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {
        chooseOperator(key);
    }

    if (key === "Enter" || key === "=") {
        calculate();
    }

    if (key === "Backspace") {
        deleteLast();
    }

    if (key === "Escape") {
        clearDisplay();
    }

});