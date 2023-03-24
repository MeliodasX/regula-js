const { applyRules } = require("../regula")

const singleVarRule = {
    variables: [
        {
            identifier: "age",
            operation: ">",
            operand: 18,
            expression: "age > 18"
        }
    ],
    condition: "age > 18",
};

const multiVarRule = {
    variables: [
        {
            identifier: "age",
            operation: ">",
            operand: 18,
            expression: "age > 18"
        },
        {
            identifier: "position",
            operation: "<",
            operand: 4,
            expression: "position < 4"
        },
        {
            identifier: "position",
            operation: ">",
            operand: 0,
            expression: "position > 0"
        }
    ],
    condition: "age > 18 && (position < 4 && position > 0)",
};

const data = {
    age: 17,
    position: 2,
};

QUnit.module('applyRules');

QUnit.test('single variable condition true', assert => {
    assert.deepEqual(applyRules([singleVarRule], {
        age: 25,
    }), [true]);
});

QUnit.test('single variable condition false', assert => {
    assert.deepEqual(applyRules([singleVarRule], {
        age: 17,
    }), [false]);
});

QUnit.test('multi variable condition true', assert => {
    assert.deepEqual(applyRules([multiVarRule], {
        age: 25,
        position: 2,
    }), [true]);
});

QUnit.test('multi variable condition false 1', assert => {
    assert.deepEqual(applyRules([multiVarRule], {
        age: 25,
        position: -1,
    }), [false]);
});

QUnit.test('multi variable condition false 2', assert => {
    assert.deepEqual(applyRules([multiVarRule], {
        age: 25,
        position: 5,
    }), [false]);
});

QUnit.test('multi variable condition false 3', assert => {
    assert.deepEqual(applyRules([multiVarRule], {
        age: 17,
        position: 5,
    }), [false]);
});

QUnit.test('multi variable condition false 4', assert => {
    assert.deepEqual(applyRules([multiVarRule], {
        age: 17,
        position: 2,
    }), [false]);
});

QUnit.test('multi variable condition false 5', assert => {
    assert.deepEqual(applyRules([multiVarRule], {
        age: 17,
        position: -1,
    }), [false]);
});
