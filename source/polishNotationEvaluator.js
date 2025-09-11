'use strict';

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
const polishNotationEvaluator = (polishExpression) => {
    polishExpression = String(polishExpression);
    if (!polishExpression) {
        console.warn("На вход пришла пустая строка!");
        return NaN;
    }

    if ((typeof(polishExpression) != 'string')) {
        throw new Error("Неверный аргумент функции - необходимо передать строку");
    }
    
    const stack = [];

    polishExpression.trim().split(' ').filter(el => el !== '').reverse().forEach(elem => {               
        const number = Number(elem);
        let result;

        if (isNaN(number)) {
            const a = stack.pop();
            const b = stack.pop();

            if (!a || !b) {
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
                    throw new RangeError("На ноль делить нельзя!");
                }
                result = a / b;
            } else {
                throw new SyntaxError(`Неизвестный элемент строки ${elem}`);
            }
            stack.push(result);
        }
        else {
            stack.push(number);
        }
    });
    if (stack.length > 1) {
        throw new SyntaxError('Ошибка итогового значения');
    }
    return stack[0];
}
