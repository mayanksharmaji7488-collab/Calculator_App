const currDisplay = document.querySelector("#currentDisplay");

const prevDisplay = document.querySelector("#previousDisplay");


const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const percentageBtn = document.querySelector("#percentage");
const decimalBtn = document.querySelector("#decimal");
const equalBtn = document.querySelector("#equal");


const operators = {
    divide : "/",
    multiply : "*",
    subtract : "-",
    add : "+",
    percentage : "%",
};

let current = "";
let previous = "";
let operator = "";

//Number buttons

document.querySelectorAll(".number").forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if(value === "." && current.includes(".")) return;
        current += value;
        updateDisplay();
    });
});

//Operator Buttons
Object.keys(operators).forEach((id) => {
    document.getElementById(id).addEventListener("click", () => {
        if(current === "" && previous === "") return;
        if(current !== ""){
            if(previous !== ""){
                calculate();
            }

            previous = current;
            current = "";
            
        }

        operator = operators[id];
        updateDisplay();
    });
});


//Equal
equalBtn.addEventListener("click", () => {
    if(current === "" || previous === "" || operator === "") return;
    calculate();
    operator = "";
    updateDisplay();
});

//Clear
clearBtn.addEventListener("click", () => {
    current = "";
    previous = "";
    operator = "";

    updateDisplay();
});


//Delete
deleteBtn.addEventListener("click", () => {
    current = current.slice(0, -1);
    updateDisplay();
});

//Percentage
percentageBtn.addEventListener("click", () => {
    if(current === "") return;
    // current = String(Number(current)/ 100);
    updateDisplay();
});

//Decimal
decimalBtn.addEventListener("click", () => {
    if(current === "") return;
    if(!current.includes(".")) {
        current += ".";
        updateDisplay();
    }
});

//Calculate
const calculate = () => {
    let n1 = Number(previous);
    let n2 = Number(current);
    let result;

    switch(operator) {
        case "+":
            result = n1 + n2;
            break;
            
        case "-":
            result = n1 - n2;
            break;

        case "*":
            result = n1 * n2;
            break;

        case "/":
            if(n2 === 0) {
                current = "Infinite";
                previous = "";
                return;
            }
            result = n1 / n2;
            break;
            
        case "%":
            result = (n1 * n2) / 100;
            break;
    }

    current = String(result);
    updateDisplay();
    
};



//Display
const updateDisplay = () => {
    currDisplay.textContent = current || "0";

    if(previous && operator) {
        prevDisplay.textContent = `${previous} ${operator}`;
    } else{
        prevDisplay.textContent = "";
    }
};