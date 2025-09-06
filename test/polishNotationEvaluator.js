'use strict';

QUnit.module("Тестируем функцию polishNotationEvaluator", function() {
    QUnit.test("Правильно вычисляет простое выражения", function(assert) {
        const input = "+ 3 4"; // 3 + 4
        const result = polishNotationEvaluator(input);

        assert.equal(result, 7);
    });

    QUnit.test("Правильно вычисляет выражение с несколькими операциями", function(assert) {
        const input = "* + 2 3 4"; // (2 + 3) * 4
        const result = polishNotationEvaluator(input);

        assert.equal(result, 20);
    });

    QUnit.test("Правильно вычисляет выражение с отрицательными числами", function(assert) {
        const input = "- 5 + 3 2"; // 5 - (3 + 2)
        const result = polishNotationEvaluator(input);

        assert.equal(result, 0);
    });

    QUnit.test("Правильно вычисляет пустое выражение", function(assert) {
        const input = "";
        const result = polishNotationEvaluator(input);

        assert.equal(isNaN(result), true);
    });

    QUnit.test("Правильно вычисляет выражение с отрицательным числом", function(assert) {
        const input = "- 1 + 2 3";
        const result = polishNotationEvaluator(input);

        assert.equal(result, -4);
    });

    QUnit.test("Правильно вычисляет выражение с дробным числом", function(assert) {
        const input = "+ 0.05 0.05";
        const result = polishNotationEvaluator(input);

        assert.equal(result, 0.1);
    });

    QUnit.test("Возвращение ошибки при некорректном вводе данных", function(assert) {
        const input = undefined;
        assert.throws(() => polishNotationEvaluator(input), Error);
    });

    QUnit.test("Возвращение ошибки при попытке деления на ноль", function(assert) {
        const input = "/ 100 0";
        assert.throws(() => polishNotationEvaluator(input), Error);
    });


    QUnit.test("Возвращение ошибки при некорректном элементе", function(assert) {
        const input = "+ 3 5 ab123cd";
        assert.throws(() => polishNotationEvaluator(input), Error);
    });

    QUnit.test("Возвращение ошибки при выражение без аргументов операции", function(assert) {
        const input = "+ /";
        assert.throws(() => polishNotationEvaluator(input), Error);
    });
});
