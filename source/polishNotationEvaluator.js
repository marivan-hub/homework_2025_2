'use strict'
const wrong_arg_error = new Error("Неверный аргумент функции - необходимо передать строку (не пустую)")

/**
 * Функция вычисляющая выражение в польской нотации
 * @param {string} polishExpression - представление выражения в польской нотации в виде строки
 * 
 * @example
 * // returns 9
 * polishNotation("+ 1 2");
 * 
 * @returns {Number}
 */
function polishNotationEvaluator(polishExpression) {
    if (!polishExpression) {
        throw wrong_arg_error
    }
    if (typeof(polishExpression) != 'string'){
        throw wrong_arg_error
    }
    
    let elements = polishExpression.trim().split(' ');
    let symbols = [];
    let stack = [];

    for (let el of elements) {
        if (el !== '') {
            symbols.push(el);
        }
    }
    symbols = symbols.reverse();


        for (let elem of symbols) {
            let number = Number(elem);
            let result;
            
            if (isNaN(number)) {
                let a = stack.pop();
                let b = stack.pop();

                if (a == null || b == null) {
                    throw new Error("Недостаточное количество операндов (аргументов операции)");
                }
                
                if (elem === '+') {
                    result = a + b;
                } else if (elem === '-') {
                    result = a - b;
                } else if (elem === '*') {
                    result = a * b;
                } else if (elem === '/') {
                    if (b === 0) {
                        throw new Error("На ноль делить нельзя!");
                    }
                    result = a / b;
                } else {
                    throw new Error(`Неизвестный элемент строки ${elem}`);
                }
                stack.push(result);
            }
            else {
                stack.push(number);

            }
    }

    return stack[0]



}