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

2. Pass in the array of rule objects as the first parameter and the user input object as the second parameter.

```js
const result = applyRules(rules, userInput);
```

Alternatively, if you only have one rule object, you can wrap it up in an array and pass it to the function.

```js
const result = applyRules([rule], userInput);
```

3. ???

4. Profit

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

