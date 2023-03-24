# Regula.JS - A Simple Rule Parsing Engine written in JS

Regula.JS is a simple rule parsing engine that can be used to delegate one decision. The primary purpose of this library is to create a rule that can be stored remotely and be accessed wherever needed to make decisions based on user input.

Regula.JS is not a programming language thus it does not include any getters, setters or loops. One rule always corresponds to one decision. 

## Installation

```sh
npm install regula-js
```
or

```sh
yarn add regula-js
```

## Usage

1. Import applyRules from regula-js.

```js
import { applyRules } from "regula-js"
```

2. Regula.JS takes in an array of rule objects as the first parameter and the user input object as the second parameter.

```js
const result = applyRules(rules, userInput);
```

Alternatively, if you only have one rule object, you can wrap it up in an array and pass it to the function.

```js
const result = applyRules([rule], userInput);
```

3. ???

4. Profit

## Rule Object

A rule object typically looks like this

```js
const singleVarRule = {
    variables: [
        {
            identifier: "age",
            operation: ">",
            operand: 18,
            expression: "$1"
        }
    ],
    condition: "$1",
};
```
This is what a single variable rule looks like. You can see a rule object consists of two major keys; ```variables```, and ```condition```. <br/>

Here's a corresponding data or user input object for this rule

```js
const data = {
        age: 25,
    }
```

### variables

Going back to the rule object, ```variables``` is an array of objects that contains sub conditions that make up the full condition. In this case, the sub-condition and the full condition are the same. <br/>

Let us discuss the objects in ```variables``` in more detail.

- ```identifier``` key is how Regula.JS knows what input to take from the data or user input object. 
- ```operation``` corresponds to the operation (default or registered) to be used to evaluate the sub-condition.
- ```operand``` corresponds to what value will the user input be compared against.
- ```expression``` is an identifier used by Regula.JS to know sub-condition has been evaluated. Typically this can be anything unique such as uuid or an index.

### conditions

Let us now discussion the ```condition``` key. 
- All sub-conditions once evaluated are substituted in the condition value.
- All logical operations are defined in the condition value.
- The ```expression``` key is utilized to identify which part of the condition value has to be substituted.

For a more indepth idea, look at this multi variable rule below.

```js
const multiVarRule = {
    variables: [
        {
            identifier: "age",
            operation: ">",
            operand: 18,
            expression: "$1"
        },
        {
            identifier: "position",
            operation: "<",
            operand: 4,
            expression: "$2"
        },
        {
            identifier: "position",
            operation: ">",
            operand: 0,
            expression: "$3"
        }
    ],
    condition: "$1 && ($2 && $3)",
};
```
### Additional Keys

The rule object accepts two optional keys; ```result```, and ```extra```.

#### result

You can pass anything you want into the result key. If the rule is evaluated as true and the result key exists, Regula.JS will return the result key instead of ```true```.

#### extra

This key can be used to store any extra data such as some kind of metadata you want stored with the rule object. Regula.JS does not acknowledge the extra key and ignores whatever content is present in this key.

## Supported Operations

### Boolean Operations
- ```===```
- ```!==```
- ```>```
- ```<```
- ```>=```
- ```<=```

### Logic Operations
- ```!```
- ```!!```
- ```&&```
- ```||```

Regula.JS is written in JS therefore the default functions provided with Regula.JS follow the precedence and logic provided by JS. However, that's not the main hook of Regula.JS. Regula.JS provides two other functions called 

```js
registerOperations()
```
and

```js
overrideOperation()
```

## registerOperations()

```registerOperations``` function requires an object that contains the identifier for your function as well as the function to be called.

### For example

```js
import { registerOperations } from "regula-js"

registerOperations({
    "includes": (LHS, RHS) => {
        return LHS.includes(RHS);
    }
});
``` 
Here, we are registering a new operation called includes at runtime that can now be utilized by Regula.JS while parsing rules. The ```LHS``` corresponds to the value taken from user input while ```RHS``` corresponds to the value taken from the rule itself. You can register multiple operations at once by adding them to the object being passed to ```registerOperations``` function.

## overrideOperation()

```overrideOperation``` function requires the identifier for the operation to be replaced as well as the new operation replacement.

### For example

```js
import { overrideOperation } from "regula-js"

overrideOperation("===", (LHS, RHS) => {
    return LHS == RHS;
})
``` 
Here, we are overriding the strict equality operation with loose equality operation at runtime. Do take note that if the identifier provided to be overriden does not exist, a new operation will be registered instead of overriding any operation.

## Current Shortcomings

- The engine currently uses ```eval``` at the end to evaluate the whole condition. There are plans to replace eval with a custom function that evaluates the condition in the future but eval stays for now.
- A side-effect of using ```eval``` is, the condition being parsed follows the operation precedence provided by JS. There are plans to allow users to override the current evaluation algorithm with their own in some future version.
- Regula.JS currently only supports one condition in one rule object.

To further elaborate my point,

```js
if (age > 16 && position < 4) {
    ///do something
}
```
It does not currently support else and else if conditions.
For example,

```js
if (age > 16 && position < 4) {
    ///do something
} else if (age < 16 && position > 4) {
    ///do something else
} else {
    ///execute the else clause
}
```
The above snippet is currently not supported by Regula.JS. There are plans to include this functionality in the next version.

## How can you help?

- I have added some rudimentary unit tests via QUnit in the library but they are not at all sufficient to cover everything Regula.JS has to offer. You can help by adding more in-depth test cases that also covers the edge cases as well.
- You can also help by requesting features, reporting bugs or helping to develop Regula.JS further.
- If you feel like I missed discussing something in the readme, do be sure to tell me about that as well.

