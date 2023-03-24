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

interface Operation {
    [key: string]: (LHS: unknown, RHS: unknown) => boolean | undefined;
}

let operations: Operation = {
    "===": (LHS: unknown, RHS: unknown) => {
        return LHS === RHS;
    },
    "!==": (LHS: unknown, RHS: unknown) => {
        return LHS !== RHS;
    },
    ">": (LHS: unknown, RHS: unknown) => {
        if (typeof LHS === "string" && typeof RHS === "string") {
            return LHS > RHS;
        } else if (typeof LHS === "number" && typeof RHS === "number") {
            return LHS > RHS;
        } else {
            return undefined;
        }
    },
    "<": (LHS: unknown, RHS: unknown) => {
        if (typeof LHS === "string" && typeof RHS === "string") {
            return LHS < RHS;
        } else if (typeof LHS === "number" && typeof RHS === "number") {
            return LHS < RHS;
        } else {
            return undefined;
        }
    },
    ">=": (LHS: unknown, RHS: unknown) => {
        if (typeof LHS === "string" && typeof RHS === "string") {
            return LHS >= RHS;
        } else if (typeof LHS === "number" && typeof RHS === "number") {
            return LHS >= RHS;
        } else {
            return undefined;
        }
    },
    "<=": (LHS: unknown, RHS: unknown) => {
        if (typeof LHS === "string" && typeof RHS === "string") {
            return LHS <= RHS;
        } else if (typeof LHS === "number" && typeof RHS === "number") {
            return LHS <= RHS;
        } else {
            return undefined;
        }
    },
}

const isUndefined = (LHS: unknown, RHS: unknown) => {
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

const applyOperation = (LHS: unknown, RHS: unknown, operation: string) => {
    const getOperation = operations[operation];
    return getOperation(LHS, RHS);
};

const applyRule = (rule: Rule, data: UserData) => {
    const variables = [...rule.variables];
    let condition = rule.condition;

    variables.forEach((it: Variable) => {
        const LHS = prepareInput(data[it.identifier.trim()]); //User Input
        const RHS = prepareInput(it.operand); //Rule Input
        const result = (!isUndefined(LHS, RHS)) ? applyOperation(LHS, RHS, it.operation) : false;
        condition = (result) ? condition.replace(it.expression, result.toString()) : condition.replace(it.expression, "false");
    })

    // eslint-disable-next-line no-eval
    if (eval(condition)) {
        return (rule?.result) ? rule.result : true;
    } else {
        return false;
    }
}

export const applyRules = (rules: Rule[], data: UserData) => {
    const results: unknown[] = [];
    if (rules.length === 0) {
        return
    }

    rules.forEach((rule: Rule) => {
        const result = applyRule(rule, data);
        if (result !== null) {
            results.push(result);
        }
    })

    return results;
}

export const registerOperations = (operationObject: Operation) => {
    operations = {
        ...operations,
        ...operationObject
    }
}

export const overrideOperation = (key: string, operation: (LHS: unknown, RHS: unknown) => boolean | undefined) => {
    operations[key] = operation;
}
