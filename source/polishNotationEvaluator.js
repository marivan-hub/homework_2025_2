'use strict'

/**
 * Функция вычисляющая выражение в польской нотации
 * @param {string} polishExpression - представление выражения в польской нотации в виде строки
 * 
 * @example
 * // returns 3
 * polishNotation("+ 1 2");
 * 
 * @returns {Number}
 */
function polishNotationEvaluator(polishExpression) {
    if (polishExpression == '') {
        console.warn("На вход пришла пустая строка!");
        return NaN;
    }

    if ((typeof(polishExpression) != 'string') || !polishExpression) {
        throw new Error("Неверный аргумент функции - необходимо передать строку");
    }
    
    let stack = [];

    polishExpression.trim().split(' ').filter(el => el !== '').reverse().forEach(elem => {               
        let number = Number(elem);
        let result;

        if (isNaN(number)) {
            let a = stack.pop();
            let b = stack.pop();

            if (a === undefined || b === undefined) {
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
    });
    if (stack.length > 1) {
        throw new Error('Ошибка итогового значения');
    }
    return stack[0];
}
