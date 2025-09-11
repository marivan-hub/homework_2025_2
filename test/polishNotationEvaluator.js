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

    QUnit.test("Правильно вычисляет сложное выражение", function(assert) {
        const input = "* / - 10 5 + 2 3 5"; 
        const result = polishNotationEvaluator(input);

        assert.equal(result, 5);
    });

    QUnit.test("Правильно вычисляет большое количество одинаковых операций", function(assert) {
        const input = "- - - - 10 1 1 1 1"; 
        const result = polishNotationEvaluator(input);

        assert.equal(result, 6);
    });

    QUnit.test("Возвращение ошибки при некорректном числе операндов", function(assert) {
        const input = "+ 2 3 4";
        assert.throws(() => polishNotationEvaluator(input), Error);
    });

    QUnit.test("Возвращение ошибки при некорректное числе операторов", function(assert) {
        const input = "+ + 2 3";
        assert.throws(() => polishNotationEvaluator(input), Error);
    });

    QUnit.test("Правильно вычисляет с пробелами в неожиданных местах", function(assert) {
        const input1 = "  + 2 3  ";
        const result1 = polishNotationEvaluator(input1);
        assert.equal(result1, 5);
    });

    QUnit.test("Правильно вычисляет выражение с new(String)", function(assert) {
        const input = new String("  + 2 3  ");
        const result = polishNotationEvaluator(input);
        assert.equal(result, 5);
    });
});
