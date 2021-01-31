const btns = [
    {type: "action", value: "AC", action: 'clear', className: "clear gry"},
    {type: "action", value: "±", action: 'module', className: "module gry"},
    {type: "action", value: "%", action: 'percent', className: "percent gry"},

    {type: "operator", value: "÷", action: '/', className: "division orng"},

    {type: "action", value: "mc", action: 'delete', className: "mclear"},
    {type: "action", value: "mr", action: 'read', className: "mread"},
    {type: "action", value: "m-", action: 'minus', className: "mminus"},

    {type: "action", value: "m+", action: 'plus', className: "mplus"},

    {type: "number", value: "7", className: "button7"},
    {type: "number", value: "8", className: "button8"},
    {type: "number", value: "9", className: "button9"},
    {type: "operator", value: "×", action: '*', className: "multiplication orng"},
    {type: "number", value: "4", className: "button4"},
    {type: "number", value: "5", className: "button5"},
    {type: "number", value: "6", className: "button6"},
    {type: "operator", value: "−", action: '-', className: "minus orng"},
    {type: "number", value: "1", className: "button1"},
    {type: "number", value: "2", className: "button2"},
    {type: "number", value: "3", className: "button3"},
    {type: "operator", value: "+", action: '+', className: "plus orng"},
    {type: "number", value: "0", className: "button0 dbl"},
    {type: "symbol", value: ',', className: "symbol"},
    {type: "action", value: "=", action: 'calculate', className: "calc orng"},
]
const functions = {
    clear: function () {
        return {
            currentNumber: "0",
            operator: null,
            prevNumber: null,
            result: null
        }
    },
    module: function ({currentNumber}) {
        try{
        const evaluate = currentNumber.split(",").join(".") * (-1)
            .toString().split(".").join(",")
        return {currentNumber: evaluate.toString().split(".").join(",")}}catch (e){
            return {currentNumber: "Error"};
        }
    },
    percent: function ({currentNumber}) {
        try {
            const evaluate = eval(currentNumber / 100)
            return {currentNumber: evaluate}
        } catch (e) {
            return {currentNumber: "Error"}
        }

    },
    delete: function ({memory}) {
         return {
            currentNumber: "0",
            memory:"0"
        }
    },
    read: function ({memory, currentNumber}) {
        return {currentNumber: memory}
    },
    minus: function ({currentNumber, memory, operator, prevNumber}) {
        if (operator !== null) {
            const expression = {prevNumber: prevNumber, currentNumber: currentNumber, operator: operator}
            const calculate = this.calculate(expression);
            const minus = this.calculate({prevNumber: memory, currentNumber: calculate.currentNumber, operator: "-"});
            return {currentNumber: "0", prevNumber: null, memory: minus.currentNumber, operator: null}
        }
        const expression = {prevNumber: memory, currentNumber: currentNumber, operator: "-"}
        const calculate = this.calculate(expression)
        return {currentNumber: "0", prevNumber: null, memory: calculate.currentNumber};
    },
    plus: function ({currentNumber, memory, operator, prevNumber}) {
        try {
            if (operator !== null) {
                const expression = {prevNumber: prevNumber, currentNumber: currentNumber, operator: operator}
                const calculate = this.calculate(expression);
                const minus = this.calculate({
                    prevNumber: memory,
                    currentNumber: calculate.currentNumber,
                    operator: "-"
                });
                return {currentNumber: "0", prevNumber: null, memory: minus.currentNumber, operator: null}
            }
            const expression = {prevNumber: memory, currentNumber: currentNumber, operator: "+"}
            const calculate = this.calculate(expression)
            return {currentNumber: "0", prevNumber: null, memory: calculate.currentNumber};
        } catch (e) {
            return {currentNumber: "Error"}
        }
    },
    symbol: function (string) {
        if (string.indexOf(",") !== -1) {
            return string;
        } else {
            return {currentNumber: string + ","}
        }
    },
    calculate: function (expression) {
        let string;
        if (expression.prevNumber === null) {
            string = expression.currentNumber;
            try {
                let result = eval(string.replace(/,/, "."));
                return {operator: null};
            } catch (e) {
                return {operator: null}
            }
        } else {
            string = expression.prevNumber + expression.operator + expression.currentNumber
            try {
                let result = Math.round(eval(string.split(",").join(".")) * 10000000) / 10000000;
                return {
                    currentNumber: result.toString().split(".").join(","),
                    operator: null,
                    prevNumber: null,
                };
            } catch (e) {
                return {
                    currentNumber: "Error"
                };
            }
        }
    },
    addNumber: function (currentValue, btnValue) {
        if (currentValue === "0") {
            return btnValue
        }
        return currentValue + btnValue;


    },
    operator: function (data) {
        if (data.operator !== null) {
            const calculate = this.calculate(data);
            return {
                ...calculate, ...{
                    operator: data.btnOperator,
                    currentNumber: "0",
                    prevNumber: calculate.currentNumber
                }
            };

        } else {
            return {currentNumber: "0", operator: data.btnOperator, prevNumber: data.currentNumber}
        }
    }
}
export {btns, functions}
