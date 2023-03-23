import {applyOperation} from "./regulaOperations";

interface Variable {
    identifier: string;
    operation: string;
    operand: string | string[] | number | number[];
    expression: string;
}

interface Rule {
    variables: Variable[];
    condition: string;
    result?: any;
    extra?: any;
}

interface UserData {
    [key: string]: string | string[] | number | number[];
}

const isUndefined = (LHS, RHS) => {
    return LHS === undefined || RHS === undefined;
}

const prepareInput = (data: unknown) => {
    if (data === undefined) {
        return data;
    }

    if (Array.isArray(data)) {
        return data.map(it => {
            return prepareData(it);
        })
    } else {
        return prepareData(data);
    }
}

const prepareData = (data: unknown) => {
    if (typeof data === "string") {
        return data.toString().trim().toLowerCase();
    }

    if (typeof data === "number") {
        return data;
    }
}

const applyRules = (rules: Rule[], data: UserData) => {
    const results = [];
    if (rules.length === 0) {
        return
    }

    rules.forEach((rule) => {
        const result = applyRule(rule, data);
        if (result !== null) {
            results.push(result);
        }
    })

    return results;
}

const applyRule = (rule: Rule, data: UserData) => {
    const variables = {...rule.variables};
    let condition = rule.condition;

    variables.forEach((it: Variable) => {
        const LHS = prepareInput(data[it.identifier.trim()]); //User Input
        const RHS = prepareInput(it.operand); //Rule Input
        const result = (!isUndefined(LHS, RHS)) ? applyOperation(LHS, RHS, it.operation) : false;
        condition = condition.replace(it.expression, result);
    })

    // eslint-disable-next-line no-eval
    if (eval(condition)) {
        return (rule?.result) ? rule.result : true;
    } else {
        return false;
    }
}

export default applyRules;